const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'API Restaurante funcionando' });
});

router.get('/health', (req, res) => {
  res.send('OK');
});

module.exports = router;