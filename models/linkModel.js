const { pool } = require('../config/db');

async function createLink(code, url, shortUrl) {
  await pool.query('INSERT INTO links (code, target_url, short_url) VALUES ($1, $2, $3)', [code, url, shortUrl]);
}

async function listLinks() {
  const result = await pool.query(
    'SELECT code, target_url, short_url, total_clicks, last_clicked, created_at FROM links WHERE deleted = false ORDER BY created_at DESC'
  );
  return result.rows;
}

async function getLink(code) {
  const result = await pool.query(
    'SELECT code, target_url, short_url, total_clicks, last_clicked, created_at, deleted FROM links WHERE code = $1',
    [code]
  );
  return result.rows[0] || null;
}

async function markDeleted(code) {
  const result = await pool.query('UPDATE links SET deleted = true WHERE code = $1 AND deleted = false RETURNING code', [code]);
  return result.rowCount > 0;
}

async function incrementClick(code) {
  await pool.query('UPDATE links SET total_clicks = total_clicks + 1, last_clicked = NOW() WHERE code = $1', [code]);
}

async function codeExists(code) {
  const result = await pool.query('SELECT code FROM links WHERE code=$1', [code]);
  return result.rows.length > 0;
}

module.exports = {
  createLink,
  listLinks,
  getLink,
  markDeleted,
  incrementClick,
  codeExists,
};