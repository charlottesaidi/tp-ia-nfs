import React, { useState } from 'react';

export default function ImageAnalyzer() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      // Simule une analyse ici :
      setTimeout(() => {
        setResult({ className: "Egyptian cat", confidence: 0.78 });
      }, 1000);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded shadow-md">
      <label className="block mb-4 text-lg font-semibold">Choisir une image :</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4 w-full p-2 bg-gray-700 rounded border border-gray-600"
      />

      {image && (
        <>
          <p className="mb-2 font-semibold">Aperçu :</p>
          <img src={image} alt="Prévisualisation" className="max-w-full max-h-96 object-contain rounded mb-4" />
        </>
      )}

      {result && (
        <div className="mt-6 bg-gray-700 p-4 rounded">
          <h2 className="text-pink-400 text-xl font-bold mb-2">🎯 Résultat :</h2>
          <p><strong>Classe détectée :</strong> {result.className}</p>
          <p><strong>Confiance :</strong> {(result.confidence * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}
