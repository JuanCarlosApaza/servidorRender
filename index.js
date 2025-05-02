const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Habilita JSON en req.body

// Rutas
app.post('/games', async (req, res) => {
  try {
    const query = req.body.query;

    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      query,
      {
        headers: {
          'Client-ID': process.env.CLIENT_ID,
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
          'Accept': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error en /games:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error en la API de IGDB (/games)' });
  }
});

app.post('/genres', async (req, res) => {
  try {
    const query = req.body.query;

    const response = await axios.post(
      'https://api.igdb.com/v4/genres',
      query,
      {
        headers: {
          'Client-ID': process.env.CLIENT_ID,
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
          'Accept': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error en /genres:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al obtener géneros desde IGDB' });
  }
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
