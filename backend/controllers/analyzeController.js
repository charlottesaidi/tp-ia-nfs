const Analysis = require('../models/Analysis');

// controllers/analyzeController.js (version corrigée)

// Map des catégories générales et expressions associées
const categoryMapping = {
  "Animal": ["cat", "dog", "bird", "fish", "tiger", "lion", "wolf", "bear", "fox", "elephant", "penguin"],
  "Humain": ["person", "human", "man", "woman", "child", "baby", "face"],
  "Personnage fictif": ["cartoon", "anime", "character", "superhero", "fictional"],
  "Plante": ["plant", "tree", "flower", "vegetation", "leaf", "herb", "grass"],
  "Véhicule": ["car", "truck", "vehicle", "automobile", "motorcycle", "bike", "bicycle", "bus", "train"]
};

// Fonction pour déterminer la catégorie générale d'une classe spécifique
const determineGeneralCategory = (className) => {
  className = className.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categoryMapping)) {
    for (const keyword of keywords) {
      if (className.includes(keyword)) {
        return category;
      }
    }
  }
  
  return null; // Catégorie inconnue
};

exports.saveAnalysis = async (req, res) => {
  try {
    const { analyse, imageName, imageSize, filepath, createdAt, userGuess, confusionScore } = req.body;

    if (!analyse) {
      return res.status(400).json({ error: 'Champs manquants dans la requête' });
    }

    const newAnalysis = new Analysis({
      analyse,
      imageName,
      imageSize,
      filepath,
      createdAt,
      userGuess,
      confusionScore,
      isChallenge: true
    });

    const saved = await newAnalysis.save();
    res.status(201).json({ 
      message: 'Analyse enregistrée avec succès', 
      analysis: saved,
      confusionScore 
    });
  } catch (err) {
    console.error('Erreur saveAnalysis:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Nouvelle route pour obtenir le classement
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Analysis.find({ isChallenge: true })
      .sort({ confusionScore: -1 })
      .limit(10);
    
    res.status(200).json(leaderboard);
  } catch (err) {
    console.error('Erreur getLeaderboard:', err);
    res.status(500).json({ error: 'Erreur lors de la récupération du classement' });
  }
};

exports.getAllAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find().sort({ createdAt: -1 });
    res.status(200).json(analyses);
  } catch (err) {
    console.error('Erreur getAllAnalyses:', err);
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
};

exports.deleteAnalysis = async (req, res) => {
  try {
    const deleteAnalysis = await Analysis.findByIdAndDelete(req.params.id);
    if (!deleteAnalysis) return res.status(404).json({ message: 'Historique non trouvé' });
    res.json({ message: 'historique supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.saveFile = (req, res) => {
  try {
    // Le fichier est déjà sauvegardé par multer
    // req.file contient les informations sur le fichier uploadé
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier reçu' });
    }
    
    // Construire le chemin d'accès au fichier (utilisable depuis le frontend)
    const filePath = `/uploads/${req.file.filename}`;
    
    // Vous pouvez retourner les informations sur le fichier
    res.status(200).json({
      message: 'Fichier sauvegardé avec succès',
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        path: filePath,
        mimetype: req.file.mimetype
      }
    });
  } catch (err) {
    console.error('Erreur saveFile:', err);
    res.status(500).json({ message: err.message });
  }
}
