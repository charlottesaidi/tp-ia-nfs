const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  imageName: String,
  imageSize: Number,
  analyse: {
    confidence: Number,
    className: String
  },
  filepath: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Analysis', analysisSchema);
