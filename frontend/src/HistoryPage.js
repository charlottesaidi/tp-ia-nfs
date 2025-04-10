import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/history`);
      
      setHistory(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des données');
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet historique ?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/history/${id}`);
        toast('Historique supprimé avec succès')
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/history`);
        setHistory(response.data);
      } catch (err) {
        toast('Erreur lors de la suppression');
        console.error(err);
      }
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h2>📜 Historique des analyses</h2>
      <button onClick={() => navigate('/')}>Retour à l'accueil</button>
      <ul style={{ marginTop: '20px' }}>
        {history.length > 0 ? (
          history.map((item, index) => (
            <li key={index}>
              Classe : <strong>{item.analyse.className}</strong> — Confiance : <strong>{(item.analyse.confidence * 100).toFixed(2)}%</strong>
              <button onClick={() => handleDelete(item._id)} className="delete-btn">Supprimer</button>
            </li>
          ))
        ) : (
          <p>Aucune analyse enregistrée.</p>
        )}
      </ul>
    </div>
  );
}
