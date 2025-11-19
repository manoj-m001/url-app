const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function initDb() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS links (
      code VARCHAR(8) PRIMARY KEY,
      target_url TEXT NOT NULL,
      short_url TEXT,
      total_clicks INTEGER NOT NULL DEFAULT 0,
      last_clicked TIMESTAMP NULL,
      deleted BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;
  await pool.query(createTableSQL);}

module.exports = { pool, initDb };