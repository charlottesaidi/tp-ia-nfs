// models/Analysis.js
const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
  analyse: {
    confidence: Number,
    className: String,
    // Stockage des prédictions multiples pour évaluer la confusion
    allPredictions: [{ 
      className: String, 
      probability: Number 
    }]
  },
  imageName: String,
  imageSize: Number,
  filepath: String,
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  // Nouveaux champs pour la gamification
  confusionScore: { 
    type: Number, 
    default: 0 
  },
  userGuess: String,  // Ce que l'utilisateur pensait que l'image représentait
  isChallenge: { 
    type: Boolean, 
    default: false 
  }
});

module.exports = mongoose.model('Analysis', AnalysisSchema);