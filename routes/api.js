const express = require('express');
const router = express.Router();
const links = require('../controllers/linkController');

router.post('/links', links.create);
router.get('/links', links.list);
router.get('/links/:code', links.stats);
router.delete('/links/:code', links.remove);

module.exports = router;