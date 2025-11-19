const { isValidUrl, isValidCode } = require('../utils/validation');
const Link = require('../models/linkModel');

function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const len = 6 + Math.floor(Math.random() * 3); // 6,7,8
  let out = '';
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

async function create(req, res) {
  const { url, code: customCode } = req.body || {};
  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid or missing URL' });
  }
  let code = customCode && String(customCode).trim();
  if (code) {
    if (!isValidCode(code)) {
      return res.status(400).json({ error: 'Code must be 6-8 alphanumeric characters' });
    }
    if (await Link.codeExists(code)) {
      return res.status(409).json({ error: 'Code already exists' });
    }
  } else {
    let attempts = 0;
    do {
      code = generateCode();
      const exists = await Link.codeExists(code);
      if (!exists) break;
      attempts++;
    } while (attempts < 10);
    if (!code) {
      return res.status(500).json({ error: 'Failed to generate unique code' });
    }
  }
  try {
    const base = process.env.PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 4000}`;
    const shortUrl = `${base}/${code}`;
    await Link.createLink(code, url, shortUrl);
    res.status(201).json({ code, url, shortUrl });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Code already exists' });
    }
    console.error('Error creating link:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function list(req, res) {
  try {
    const items = await Link.listLinks();
    res.json(items);
  } catch (err) {
    console.error('Error listing links:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function stats(req, res) {
  const { code } = req.params;
  try {
    const item = await Link.getLink(code);
    if (!item || item.deleted) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(item);
  } catch (err) {
    console.error('Error getting stats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function remove(req, res) {
  const { code } = req.params;
  try {
    const ok = await Link.markDeleted(code);
    if (!ok) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error deleting link:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { create, list, stats, remove };