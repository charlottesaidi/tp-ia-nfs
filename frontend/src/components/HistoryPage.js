import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const HistoryPage = () => {
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
    <div>
      <ToastContainer />
      <h2>📜 Historique des analyses</h2>
      <table className="table-auto">
        <tbody>
          {history.length > 0 ? (
            history.map((item, index) => (
              <tr key={index}>
                <td className="px-2">{item.filepath ? (<img src={`${process.env.REACT_APP_API_URL}/${item.filepath}`} width="50"/>) : null}</td>
                <td className="px-2">Classe : <strong>{item.analyse.className}</strong> — Confiance : <strong>{(item.analyse.confidence * 100).toFixed(2)}%</strong></td>
                <td className="px-2"><button onClick={() => handleDelete(item._id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Supprimer</button></td>
              </tr>
            ))
          ) : (
            <p>Aucune analyse enregistrée.</p>
          )}
        </tbody>
      </table>
      
      <div className="flex flex-row justify-end">
        <button onClick={() => navigate('/')}>Retour à l'accueil</button>
      </div>
    </div>
  );
}
export default HistoryPage;