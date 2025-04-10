import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HistoryPage from './components/HistoryPage';
import ImageAnalyzer from './components/ImageAnalyzer';

export default function App() {
  return (
    <Router>
      <div className="app">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>📷 Analyse d'image IA</h2>
            <div>
              <Link to="/" style={{ marginRight: '10px', color: '#fff' }}>Accueil</Link>
              <Link to="/history" style={{ color: '#fff' }}>Historique</Link>
            </div>
          </div>
          
          <Routes>
            <Route path="/" element={<ImageAnalyzer />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
