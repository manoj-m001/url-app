const express = require('express');
const router = express.Router();

router.get('/healthz', (req, res) => {
  res.status(200).json({ ok: true, version: '1.0' });
});

module.exports = router;