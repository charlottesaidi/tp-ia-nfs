const express = require('express');
const router = express.Router();
const { saveAnalysis } = require('../controllers/analyzeController');

router.post('/analyze', saveAnalysis);

module.exports = router;
