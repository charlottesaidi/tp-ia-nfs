const Analysis = require('../models/Analysis');

exports.saveAnalysis = async (req, res) => {
  try {
    const { analyse, imageName, imageSize, createdAt } = req.body;

    if (!analyse) {
      return res.status(400).json({ error: 'Champs manquants dans la requête' });
    }

    const newAnalysis = new Analysis({
      analyse, 
      imageName, 
      imageSize, 
      createdAt
    });

    const saved = await newAnalysis.save();
    res.status(201).json({ message: 'Analyse enregistrée avec succès', analysis: saved });
  } catch (err) {
    console.error('Erreur saveAnalysis:', err);
    res.status(500).json({ error: 'Erreur serveur' });
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
