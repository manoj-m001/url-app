const Link = require('../models/linkModel');

async function handleRedirect(req, res) {
  const { code } = req.params;
  if (code === 'api' || code === 'healthz' || code === 'favicon.ico') {
    return res.status(404).json({ error: 'Not found' });
  }
  try {
    const item = await Link.getLink(code);
    if (!item || item.deleted) {
      return res.status(404).send('Not found');
    }
    await Link.incrementClick(code);
    return res.redirect(302, item.target_url);
  } catch (err) {
    console.error('Error redirecting:', err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { handleRedirect };