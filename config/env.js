const dotenv = require('dotenv');
const path = require('path');

// Charge les variables d'environnement depuis le fichier .env
const result = dotenv.config({
    path: path.resolve(process.cwd(), '.env')
});

if (result.error) {
  console.error('Erreur lors du chargement du fichier .env:', result.error);
  process.exit(1);
}

// Vérifie que les variables d'environnement requises sont définies
const requiredEnvVars = [
    'AGICAP_API_URL',
    'AGICAP_API_KEY',
    'PENNYLANE_API_URL',
    'PENNYLANE_API_KEY'
]

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.error('Variables d\'environnement manquantes:', missingEnvVars.join(', '));
    console.error('Veuillez les ajouter dans votre fichier .env');
    process.exit(1);
}

module.exports = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    agicap: {
        apiUrl: process.env.AGICAP_API_URL,
        apiKey: process.env.AGICAP_API_KEY,
        clientId: process.env.AGICAP_CLIENT_ID,
        clientSecret: process.env.AGICAP_CLIENT_SECRET
    },
    pennylane: {
        apiUrl: process.env.PENNYLANE_API_URL,
        apiKey: process.env.PENNYLANE_API_KEY
    }
};