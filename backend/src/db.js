const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

async function getWines(filters = {}) {
  let sql = 'SELECT * FROM wines WHERE 1=1';
  const params = [];
  let paramIndex = 1;

  if (filters.wineType) {
    sql += ` AND wine_type = $${paramIndex++}`;
    params.push(filters.wineType);
  }

  if (filters.priceMin) {
    sql += ` AND price >= $${paramIndex++}`;
    params.push(filters.priceMin);
  }

  if (filters.priceMax) {
    sql += ` AND price <= $${paramIndex++}`;
    params.push(filters.priceMax);
  }

  if (filters.country) {
    sql += ` AND country = $${paramIndex++}`;
    params.push(filters.country);
  }

  sql += ' ORDER BY rating DESC LIMIT 50';

  const result = await query(sql, params);
  return result.rows;
}

module.exports = { pool, query, getWines };
