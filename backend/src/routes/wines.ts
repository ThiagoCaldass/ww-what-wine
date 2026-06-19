import { Router, Request, Response } from 'express';

const router = Router();

// Dados mockados para MVP (depois vem do banco)
const MOCK_WINES = [
  {
    id: '1',
    name: 'Carmenere Premium',
    producer: 'Viña Santa Rita',
    country: 'Chile',
    wine_type: 'tinto',
    price: 89.90,
    rating: 4.5,
    tasting_notes: 'Frutas vermelhas escuras, tanino estruturado'
  },
  {
    id: '2',
    name: 'Malbec Reserva',
    producer: 'Catena Zapata',
    country: 'Argentina',
    wine_type: 'tinto',
    price: 120.00,
    rating: 4.7,
    tasting_notes: 'Violeta, ameixa, especiarias'
  },
  {
    id: '3',
    name: 'Cabernet Sauvignon',
    producer: 'Robert Mondavi',
    country: 'USA',
    wine_type: 'tinto',
    price: 150.00,
    rating: 4.6,
    tasting_notes: 'Cassis, cedro, tanino suave'
  },
  {
    id: '4',
    name: 'Pinot Grigio',
    producer: 'Ecco Domani',
    country: 'Itália',
    wine_type: 'branco',
    price: 45.00,
    rating: 4.2,
    tasting_notes: 'Frutas brancas, mineral, fresco'
  },
  {
    id: '5',
    name: 'Prosecco',
    producer: 'Santa Margherita',
    country: 'Itália',
    wine_type: 'espumante',
    price: 65.00,
    rating: 4.4,
    tasting_notes: 'Pera, maçã, efervescência suave'
  },
];

// GET /api/wines/search
router.get('/search', (req: Request, res: Response) => {
  const { wineType, sweetness, priceMin, priceMax } = req.query;

  let results = MOCK_WINES;

  // Filtrar por tipo de vinho
  if (wineType) {
    results = results.filter(w => w.wine_type === wineType);
  }

  // Filtrar por preço
  if (priceMin) {
    results = results.filter(w => w.price >= Number(priceMin));
  }
  if (priceMax) {
    results = results.filter(w => w.price <= Number(priceMax));
  }

  res.json({
    results,
    total: results.length,
    filters_applied: {
      wineType,
      priceRange: `${priceMin}-${priceMax}`,
      sweetness
    }
  });
});

// GET /api/wines/:id
router.get('/:id', (req: Request, res: Response) => {
  const wine = MOCK_WINES.find(w => w.id === req.params.id);

  if (!wine) {
    return res.status(404).json({ error: 'Wine not found' });
  }

  res.json(wine);
});

export default router;
