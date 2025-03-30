const axios = require('axios'); // Librería para hacer peticiones HTTP (a APIs externas como Pexels).
const dotenv = require('dotenv'); // Permite cargar variables de entorno desde un archivo .env

dotenv.config();

const PEXELS_API_KEY = process.env.PEXELS_API_KEY; // Almacena la clave API de Pexels en el archivo .env

const searchImage = async (query) => {
  try {
    const response = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    });
    return response.data.photos[0]?.src.medium; // Devuelve la URL de la primera imagen encontrada
  } catch (error) {
    console.error('Error al buscar imagen en Pexels:', error);
    return null;
  }

};

module.exports = { searchImage };