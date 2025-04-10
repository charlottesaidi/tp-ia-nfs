import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HistoryPage from './components/HistoryPage';
import ImageAnalyzer from './components/ImageAnalyzer';

export default function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>📷 Analyse d'image IA</h1>
          <nav>
            <ul>
              <Link to="/" style={{ marginRight: '10px', color: '#fff' }}>Accueil</Link>
              <Link to="/history" style={{ color: '#fff' }}>Historique</Link>
            </ul>
          </nav>
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<ImageAnalyzer />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
