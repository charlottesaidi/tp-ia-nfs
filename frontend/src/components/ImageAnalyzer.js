import React, { useState, useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';
import axios from 'axios';
import DropZoneInput from './Form/DropZoneInput';
import Loader from './UI/Loader';
import ErrorAlerte from './UI/ErrorAlerte';

const ImageAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('normal'); // 'normal' ou 'challenge'
  const [userGuess, setUserGuess] = useState('');
  const [confusionScore, setConfusionScore] = useState(null);
  const [actualConfusion, setActualConfusion] = useState(null); // Confusion réelle entre catégories
  const [leaderboard, setLeaderboard] = useState([]);
  const [allPredictions, setAllPredictions] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Catégories pour le défi
  const categories = ["Humain", "Personnage fictif", "Plante", "Véhicule", "Animal"];

  // Map des catégories générales et expressions associées
  const categoryMapping = {
    "Animal": ["cat", "dog", "bird", "fish", "tiger", "lion", "wolf", "bear", "fox", "elephant", "penguin", "zebra", "animal"],
    "Humain": ["person", "human", "man", "woman", "child", "baby", "face", "people"],
    "Personnage fictif": ["cartoon", "anime", "character", "superhero", "fictional", "toy"],
    "Plante": ["plant", "tree", "flower", "vegetation", "leaf", "herb", "grass", "forest"],
    "Véhicule": ["car", "truck", "vehicle", "automobile", "motorcycle", "bike", "bicycle", "bus", "train", "boat"]
  };

  // Fonction pour déterminer la catégorie générale d'une classe spécifique
  const determineGeneralCategory = (className) => {
    if (!className) return "Autre";
    className = className.toLowerCase();
    
    for (const [category, keywords] of Object.entries(categoryMapping)) {
      for (const keyword of keywords) {
        if (className.includes(keyword)) {
          return category;
        }
      }
    }
    
    return "Autre"; // Catégorie inconnue
  };

  // Charger le leaderboard au chargement du composant
  useEffect(() => {
    if (showLeaderboard) {
      fetchLeaderboard();
    }
  }, [showLeaderboard]);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/leaderboard`);
      setLeaderboard(response.data);
    } catch (err) {
      console.error("Erreur lors du chargement du leaderboard:", err);
    }
  };

  const handleImageChange = async (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile) {
      setImage(URL.createObjectURL(uploadedFile));
      setResult(null);
      setConfidence(null);
      setFile(uploadedFile);
      setConfusionScore(null);
      setActualConfusion(null);
      setAllPredictions([]);
    }
  };

  const handleAnalyse = async () => {
    setLoading(true);
    const img = document.getElementById('uploadedImage');

    try {
      const model = await mobilenet.load();
      const predictions = await model.classify(img, 5); // Obtenir les 5 meilleures prédictions

      if (predictions.length > 0) {
        setResult(predictions[0].className);
        setConfidence((predictions[0].probability * 100).toFixed(2));
        setAllPredictions(predictions);
        
        const src = img.getAttribute('src').split('/');
        const imageName = src[src.length -1];
  
        const formData = new FormData();
        formData.append('image', file);
  
        // Envoi du fichier vers l'API du serveur
        const uploadResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, formData);

        // Déterminer les catégories des deux premières prédictions
        const firstCategory = determineGeneralCategory(predictions[0].className);
        const secondCategory = predictions.length > 1 ? determineGeneralCategory(predictions[1].className) : null;
        
        // Calculer le score de confusion ici au lieu du backend
        let calculatedScore = 0;
        let isCategoriesConfused = false;
        
        if (predictions.length > 1) {
          // Différence entre les deux principales prédictions
          const delta = predictions[0].probability - predictions[1].probability;
          
          // Score de base pour l'ambiguïté (max 75)
          const ambiguityScore = Math.round((1 - delta) * 75);
          calculatedScore += ambiguityScore;
          
          // Vérifier si la catégorie détectée est différente de la supposition de l'utilisateur
          if (mode === 'challenge' && firstCategory !== userGuess) {
            calculatedScore += 25;
          }
          
          // Vérifier si les deux premières prédictions sont de catégories différentes
          if (firstCategory !== secondCategory && secondCategory) {
            calculatedScore += 25;
            isCategoriesConfused = true;
          }
        }
        
        // En mode défi, inclure toutes les prédictions et la supposition de l'utilisateur
        const data = {
          analyse: {
            confidence: predictions[0].probability,
            className: predictions[0].className,
            allPredictions: predictions,
            detectedCategory: firstCategory
          },
          imageName: imageName,
          imageSize: file.size,
          filepath: uploadResponse.data.file.path,
          createdAt: new Date(),
          userGuess: mode === 'challenge' ? userGuess : null,
          confusionScore: calculatedScore
        };
  
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/analyze`, data);
        
        // Si en mode défi, afficher le score de confusion
        if (mode === 'challenge') {
          setConfusionScore(calculatedScore);
          setActualConfusion(isCategoriesConfused);
          fetchLeaderboard(); // Mettre à jour le classement
        }
        
        setLoading(false);
      }
    } catch (err) {
      setError("Erreur lors de l'analyse de l'image");
      setLoading(false);
      console.error(err);
    }
  };

  // Calculer un message basé sur le score de confusion et la confusion réelle
  const getConfusionMessage = (score, isConfused, detectedCategory, userCategory) => {
    // Si l'IA a identifié la même catégorie que l'utilisateur
    if (detectedCategory === userCategory) {
      if (score >= 75) return "Image ambiguë, mais l'IA a correctement identifié la catégorie générale.";
      if (score >= 50) return "L'IA a hésité mais a correctement identifié la catégorie générale.";
      return "L'IA a facilement identifié la catégorie générale, essayez une image plus ambiguë!";
    }
    
    // Si l'IA s'est trompée de catégorie
    if (isConfused) {
      if (score >= 90) return "Incroyable! Cette image confond complètement l'IA entre plusieurs catégories! 🤯";
      if (score >= 70) return "Excellent! L'IA est très confuse entre différentes catégories! 🎉";
      return "Bien joué! L'IA s'est trompée de catégorie. 👍";
    }
    
    // Si l'utilisateur s'est trompé (l'IA a raison mais l'utilisateur a mal deviné)
    return "Intéressant! Vous avez identifié une catégorie différente de ce que l'IA perçoit.";
  };

  return (
    <div>
      <div className="mode-selector" style={{ marginBottom: '20px' }}>
        <h2 className="mb-4">Mode:</h2>
        <div className="mode-buttons">
          <button 
            onClick={() => {setMode('normal'); setShowLeaderboard(false);}} 
            style={{
              backgroundColor: mode === 'normal' ? '#4338ca' : '#1e293b',
              marginRight: '10px',
              padding: '10px 15px',
              borderRadius: '5px'
            }}
          >
            Mode Normal
          </button>
          <button 
            onClick={() => {setMode('challenge'); setShowLeaderboard(false);}}
            style={{
              backgroundColor: mode === 'challenge' ? '#4338ca' : '#1e293b',
              padding: '10px 15px',
              borderRadius: '5px'
            }}
          >
            Mode Défi
          </button>
          <button 
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            style={{
              backgroundColor: showLeaderboard ? '#4338ca' : '#1e293b',
              marginLeft: '10px',
              padding: '10px 15px',
              borderRadius: '5px'
            }}
          >
            {showLeaderboard ? 'Cacher le Classement' : 'Afficher le Classement'}
          </button>
        </div>
      </div>

      {showLeaderboard ? (
        <div className="leaderboard" style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px' }}>
          <h2>🏆 Top 10 des Images Ambiguës</h2>
          {leaderboard.length > 0 ? (
            <table style={{ width: '100%', marginTop: '15px' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Rang</th>
                  <th style={{ textAlign: 'left' }}>Image</th>
                  <th style={{ textAlign: 'left' }}>Prédiction IA</th>
                  <th style={{ textAlign: 'left' }}>Catégorie détectée</th>
                  <th style={{ textAlign: 'left' }}>Hypothèse Utilisateur</th>
                  <th style={{ textAlign: 'left' }}>Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={`${process.env.REACT_APP_API_URL}/${entry.filepath}`} alt="Challenge" style={{ height: '50px', width: 'auto' }} />
                    </td>
                    <td>{entry.analyse.className}</td>
                    <td>{entry.analyse.detectedCategory || determineGeneralCategory(entry.analyse.className)}</td>
                    <td>{entry.userGuess}</td>
                    <td>{entry.confusionScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucun défi enregistré pour le moment.</p>
          )}
        </div>
      ) : (
        <>
          {mode === 'challenge' && (
            <div className="challenge-explanation" style={{ backgroundColor: '#1e293b', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
              <h3>🎮 Mode Défi "Images Ambiguës"</h3>
              <p>Trouvez des images qui peuvent confondre l'IA! Votre score sera basé sur:</p>
              <ul>
                <li>L'ambiguïté entre les différentes prédictions (75 points max)</li>
                <li>Confusion entre catégories différentes (+25 points)</li>
                <li>Si l'IA se trompe sur la catégorie générale (+25 points)</li>
              </ul>
              <p><strong>Défi idéal:</strong> Une image qui est à la frontière entre deux de nos catégories principales!</p>
              <p><em>Exemple: Une plante qui ressemble à un animal, un figurine qui pourrait être un personnage fictif ou un jouet...</em></p>
            </div>
          )}
          
          <p className="pb-2">
            <label className="pb-2"><strong>Choisir une image :</strong></label>  
          </p>
          <DropZoneInput onChange={handleImageChange} />

          {image && mode === 'challenge' && (
            <div style={{ marginTop: '15px' }}>
              <p className="mb-2"><strong>Que pensez-vous que cette image représente principalement?</strong></p>
              <select 
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                style={{ backgroundColor: '#1e293b', padding: '8px', borderRadius: '5px', marginBottom: '15px' }}
              >
                <option value="">-- Sélectionnez une catégorie --</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}

          {image && (
            <>
              <p className="mt-3"><strong>Aperçu :</strong></p>
              <img id="uploadedImage" src={image} alt="Aperçu" style={{ maxWidth: '300px', margin: '10px 0' }} />
              <br />
              <button 
                onClick={handleAnalyse}
                disabled={mode === 'challenge' && !userGuess}
                style={{
                  padding: '10px 20px',
                  backgroundColor: (mode === 'challenge' && !userGuess) ? '#64748b' : '#4338ca',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: (mode === 'challenge' && !userGuess) ? 'not-allowed' : 'pointer'
                }}
              >
                {mode === 'normal' ? 'Analyser l\'image' : 'Soumettre au défi'}
              </button>
            </>
          )}

          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorAlerte message={error} />
          ) : result && (
            <div style={{ marginTop: '20px', backgroundColor: '#1e293b', padding: '15px', borderRadius: '10px' }}>
              <h3>🎯 Résultat :</h3>
              <p><strong>Classe détectée :</strong> {result}</p>
              <p><strong>Catégorie générale :</strong> {determineGeneralCategory(result)}</p>
              <p><strong>Confiance :</strong> {confidence}%</p>
              
              {mode === 'challenge' && (
                <>
                  <h4 style={{ marginTop: '15px' }}>Top 3 des prédictions:</h4>
                  <ul>
                    {allPredictions.slice(0, 3).map((pred, index) => (
                      <li key={index}>
                        {pred.className} <strong>({determineGeneralCategory(pred.className)})</strong>: {(pred.probability * 100).toFixed(2)}%
                      </li>
                    ))}
                  </ul>
                  
                  {confusionScore !== null && (
                    <div style={{ 
                      marginTop: '15px', 
                      backgroundColor: '#374151', 
                      padding: '15px', 
                      borderRadius: '8px',
                      border: userGuess === determineGeneralCategory(result) ? '1px solid #10b981' : '1px solid #f59e0b'
                    }}>
                      <h3>🏆 Score de confusion: {confusionScore}</h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div>
                          <p><strong>Catégorie détectée par l'IA:</strong> {determineGeneralCategory(result)}</p>
                        </div>
                        <div>
                          <p><strong>Votre hypothèse:</strong> {userGuess}</p>
                        </div>
                      </div>
                      <p style={{ 
                        padding: '8px', 
                        backgroundColor: userGuess === determineGeneralCategory(result) ? '#064e3b' : '#78350f',
                        borderRadius: '4px'
                      }}>
                        {getConfusionMessage(
                          confusionScore, 
                          actualConfusion, 
                          determineGeneralCategory(result), 
                          userGuess)}
                      </p>
                      
                      <div style={{ marginTop: '10px' }}>
                        <h4>Détail du score:</h4>
                        <ul>
                          <li>Ambiguïté entre prédictions: {Math.min(75, confusionScore - (actualConfusion ? 25 : 0) - (userGuess !== determineGeneralCategory(result) ? 25 : 0))} / 75</li>
                          {actualConfusion && <li>Bonus confusion entre catégories: +25</li>}
                          {userGuess !== determineGeneralCategory(result) && <li>Bonus prédiction différente de votre hypothèse: +25</li>}
                        </ul>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ImageAnalyzer;