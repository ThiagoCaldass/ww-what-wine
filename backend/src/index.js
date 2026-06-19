const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = parseInt(process.env.PORT || '8000');

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Wines search - mockup
app.get('/api/wines/search', (req, res) => {
  const wines = [
    { id: '1', name: 'Carmenere Premium', producer: 'Viña Santa Rita', country: 'Chile', wine_type: 'tinto', price: 89.9, rating: 4.5 },
    { id: '2', name: 'Malbec Reserva', producer: 'Catena Zapata', country: 'Argentina', wine_type: 'tinto', price: 120, rating: 4.7 },
    { id: '3', name: 'Cabernet Sauvignon', producer: 'Robert Mondavi', country: 'USA', wine_type: 'tinto', price: 150, rating: 4.6 },
    { id: '4', name: 'Pinot Grigio', producer: 'Ecco Domani', country: 'Itália', wine_type: 'branco', price: 45, rating: 4.2 },
    { id: '5', name: 'Prosecco', producer: 'Santa Margherita', country: 'Itália', wine_type: 'espumante', price: 65, rating: 4.4 },
  ];

  const wineType = req.query.wineType;
  const results = wineType ? wines.filter(w => w.wine_type === wineType) : wines;

  res.json({ results, total: results.length });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
