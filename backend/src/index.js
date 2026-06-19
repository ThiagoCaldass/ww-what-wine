const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { getWines } = require('./db');

const app = express();
const PORT = parseInt(process.env.PORT || '8000');

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', database: process.env.DATABASE_URL ? 'configured' : 'not configured' });
});

// Wines search - from PostgreSQL
app.get('/api/wines/search', async (req, res) => {
  try {
    const filters = {
      wineType: req.query.wineType,
      priceMin: req.query.priceMin ? parseInt(req.query.priceMin) : null,
      priceMax: req.query.priceMax ? parseInt(req.query.priceMax) : null,
      country: req.query.country,
    };

    const results = await getWines(filters);

    res.json({
      results,
      total: results.length,
      source: 'PostgreSQL'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`);
});
