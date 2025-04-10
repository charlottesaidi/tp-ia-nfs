const express = require('express');
const router = express.Router();
const { getAllAnalyses } = require('../controllers/analyzeController');
const { deleteAnalysis } = require('../controllers/analyzeController');

router.get('/history', getAllAnalyses);
router.delete('/history/:id', deleteAnalysis);

module.exports = router;
