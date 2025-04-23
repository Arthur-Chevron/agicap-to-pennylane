const axios = require('axios');
const { agicap } = require('./env');

// Création d'une instance axios configurée pour AGICAP
const agicapClient = axios.create({
  baseURL: agicap.apiUrl,
  headers: {
    'Authorization': `Bearer ${agicap.apiKey}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Intercepteur pour gérer les erreurs de requête
agicapClient.interceptors.response.use(
  response => response,
  error => {
    console.error('Erreur lors de la requête AGICAP:', error.message);
    
    if (error.response) {
      console.error('Détails de l\'erreur:', {
        status: error.response.status,
        data: error.response.data
      });
    }
    
    return Promise.reject(error);
  }
);

// Fonction pour s'authentifier avec OAuth si nécessaire
const authenticateWithAgicap = async () => {
  if (!agicap.clientId || !agicap.clientSecret) {
    return;
  }
  
  try {
    const response = await axios.post(`${agicap.apiUrl}/oauth/token`, {
      client_id: agicap.clientId,
      client_secret: agicap.clientSecret,
      grant_type: 'client_credentials'
    });
    
    const { access_token } = response.data;
    
    // Met à jour le header d'autorisation avec le nouveau token
    agicapClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    
    console.log('Authentification AGICAP réussie');
  } catch (error) {
    console.error('Erreur lors de l\'authentification AGICAP:', error.message);
    throw error;
  }
};

module.exports = {
  agicapClient,
  authenticateWithAgicap
};