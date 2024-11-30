import axios from 'axios';

// Création d'une instance axios avec une configuration par défaut
const axiosInstance = axios.create({
  timeout: 10000, // 10 secondes timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour gérer les erreurs globalement
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log l'erreur pour le debugging
    console.error('API Error:', error);

    // Si l'erreur est due à un timeout
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('La requête a pris trop de temps'));
    }

    // Si l'API renvoie une erreur
    if (error.response) {
      // L'API a répondu avec un status code en dehors de 2xx
      const message = error.response.data?.message || 'Une erreur est survenue';
      return Promise.reject(new Error(message));
    }

    // Si la requête n'a pas pu être envoyée
    if (error.request) {
      return Promise.reject(new Error('Impossible de contacter le serveur'));
    }

    // Autres erreurs
    return Promise.reject(error);
  }
);

export default axiosInstance;
