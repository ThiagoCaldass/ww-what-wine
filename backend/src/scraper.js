const { query } = require('./db');

// Dados de exemplo para popular o banco
const sampleWines = [
  { name: 'Carmenere Premium', producer: 'Viña Santa Rita', vintage: 2020, country: 'Chile', region: 'Maipo Valley', wine_type: 'tinto', price: 89.90, color: 'rubi profundo', sweetness_level: 1, tannin_level: 4, acidity_level: 3, alcohol_percentage: 14.5, tasting_notes: 'Frutas vermelhas escuras, tanino estruturado', rating: 4.5, grapes: ['Carmenere'] },
  { name: 'Malbec Reserva', producer: 'Catena Zapata', vintage: 2019, country: 'Argentina', region: 'Mendoza', wine_type: 'tinto', price: 120.00, color: 'púrpura profundo', sweetness_level: 0, tannin_level: 4, acidity_level: 3, alcohol_percentage: 14.8, tasting_notes: 'Violeta, ameixa, especiarias', rating: 4.7, grapes: ['Malbec'] },
  { name: 'Cabernet Sauvignon', producer: 'Robert Mondavi', vintage: 2020, country: 'USA', region: 'Napa Valley', wine_type: 'tinto', price: 150.00, color: 'rubi intenso', sweetness_level: 0, tannin_level: 4, acidity_level: 2, alcohol_percentage: 14.0, tasting_notes: 'Cassis, cedro, tanino suave', rating: 4.6, grapes: ['Cabernet Sauvignon'] },
  { name: 'Pinot Grigio', producer: 'Ecco Domani', vintage: 2021, country: 'Itália', region: 'Veneto', wine_type: 'branco', price: 45.00, color: 'amarelo pálido', sweetness_level: 1, tannin_level: 0, acidity_level: 3, alcohol_percentage: 12.5, tasting_notes: 'Frutas brancas, mineral, fresco', rating: 4.2, grapes: ['Pinot Grigio'] },
  { name: 'Prosecco', producer: 'Santa Margherita', vintage: 2021, country: 'Itália', region: 'Veneto', wine_type: 'espumante', price: 65.00, color: 'amarelo-ouro', sweetness_level: 2, tannin_level: 0, acidity_level: 3, alcohol_percentage: 11.5, tasting_notes: 'Pera, maçã, efervescência suave', rating: 4.4, grapes: ['Glera'] },
  { name: 'Sauvignon Blanc', producer: 'Cloudy Bay', vintage: 2021, country: 'Nova Zelândia', region: 'Marlborough', wine_type: 'branco', price: 55.00, color: 'amarelo brilhante', sweetness_level: 0, tannin_level: 0, acidity_level: 4, alcohol_percentage: 13.0, tasting_notes: 'Goiaba, maracujá, herbáceo', rating: 4.5, grapes: ['Sauvignon Blanc'] },
  { name: 'Shiraz', producer: 'Penfolds', vintage: 2019, country: 'Austrália', region: 'Barossa Valley', wine_type: 'tinto', price: 75.00, color: 'rubi escuro', sweetness_level: 0, tannin_level: 4, acidity_level: 3, alcohol_percentage: 14.5, tasting_notes: 'Mirtilo, especiarias, chocolate', rating: 4.6, grapes: ['Shiraz'] },
  { name: 'Riesling', producer: 'Gunderloch', vintage: 2020, country: 'Alemanha', region: 'Rheinhessen', wine_type: 'branco', price: 40.00, color: 'amarelo claro', sweetness_level: 2, tannin_level: 0, acidity_level: 4, alcohol_percentage: 11.5, tasting_notes: 'Maçã, mel, floral', rating: 4.3, grapes: ['Riesling'] },
  { name: 'Tempranillo Reserva', producer: 'Marqués de Riscal', vintage: 2017, country: 'Espanha', region: 'Rioja', wine_type: 'tinto', price: 85.00, color: 'rubi envelhecido', sweetness_level: 0, tannin_level: 3, acidity_level: 3, alcohol_percentage: 13.5, tasting_notes: 'Cereja, couro, tabaco', rating: 4.5, grapes: ['Tempranillo'] },
  { name: 'Chardonnay', producer: 'E. Guigal', vintage: 2020, country: 'França', region: 'Côtes du Rhône', wine_type: 'branco', price: 95.00, color: 'amarelo ouro', sweetness_level: 0, tannin_level: 0, acidity_level: 3, alcohol_percentage: 13.5, tasting_notes: 'Manteiga, abacaxi, carvalho', rating: 4.6, grapes: ['Chardonnay'] },
];

async function populateWines() {
  console.log('Starting wine population...');

  try {
    // Limpar vinhos antigos (opcional)
    // await query('DELETE FROM wines');

    for (const wine of sampleWines) {
      await query(
        `INSERT INTO wines (name, producer, vintage, country, region, wine_type, price, color, sweetness_level, tannin_level, acidity_level, alcohol_percentage, tasting_notes, rating)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
         ON CONFLICT (name) DO NOTHING`,
        [
          wine.name,
          wine.producer,
          wine.vintage,
          wine.country,
          wine.region,
          wine.wine_type,
          wine.price,
          wine.color,
          wine.sweetness_level,
          wine.tannin_level,
          wine.acidity_level,
          wine.alcohol_percentage,
          wine.tasting_notes,
          wine.rating,
        ]
      );
    }

    console.log(`✅ Populated ${sampleWines.length} wines`);
  } catch (error) {
    console.error('Error populating wines:', error);
  }
}

module.exports = { populateWines };
