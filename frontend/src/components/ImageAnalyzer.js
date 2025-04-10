import React, { useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ImageAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setResult(null);
      setConfidence(null);
    }
  };

  const handleAnalyse = async () => {
    const img = document.getElementById('uploadedImage');
    const model = await mobilenet.load();
    const predictions = await model.classify(img);

    if (predictions.length > 0) {
      setResult(predictions[0].className);
      setConfidence((predictions[0].probability * 100).toFixed(2));
      const src = img.getAttribute('src').split('/');
      const imageName = src[src.length -1];

      const data = {
        analyse: {
          confidence: predictions[0].probability,
          className: predictions[0].className
        },
        imageName: imageName,
        imageSize: 0,
        createdAt: Date.now,
      }

      await axios.post(`${process.env.REACT_APP_API_URL}/api/analyze`, data);
    }
  };

  return (
    <div>
      <label><strong>Choisir une image :</strong></label>
      <input type="file" onChange={handleImageChange} />

      {image && (
        <>
          <p><strong>Aperçu :</strong></p>
          <img id="uploadedImage" src={image} alt="Aperçu" />
          <br />
          <button onClick={handleAnalyse}>Analyser l'image</button>
        </>
      )}

      {result && (
        <div style={{ marginTop: '20px', backgroundColor: '#1e293b', padding: '15px', borderRadius: '10px' }}>
          <h3>🎯 Résultat :</h3>
          <p><strong>Classe détectée :</strong> {result}</p>
          <p><strong>Confiance :</strong> {confidence}%</p>
        </div>
      )}
    </div>
  );
}
export default ImageAnalyzer;
