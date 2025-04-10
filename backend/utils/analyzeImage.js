const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const AnalysisResult = require('../models/AnalysisResult');
const fs = require('fs');

async function analyzeImage(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const tensor = tf.node.decodeImage(imageBuffer);
    const model = await mobilenet.load();
    const predictions = await model.classify(tensor);

    console.log(predictions[0])
    return predictions[0]; // { className, probability }
  } catch (err) {
    console.error('Erreur pendant l’analyse de l’image :', err);
    throw err;
  }
}

module.exports = analyzeImage;
