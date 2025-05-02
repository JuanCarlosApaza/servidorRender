const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/games', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      req.body.query,
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
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error en la API de IGDB' });
  }
});
app.post('/genres', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.igdb.com/v4/genres',
      req.body.query,
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


const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);

});
