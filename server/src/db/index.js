import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test connection on startup
pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
  process.exit(1);
});

export const query = (text, params) => pool.query(text, params);

export default pool;
