const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const mesaRoutes = require('./mesas'); // Importamos las rutas de mesas

// Inyectamos las rutas
router.use('/auth', authRoutes);
router.use('/mesas', mesaRoutes); // Registramos el endpoint /mesas

router.get('/', (req, res) => {
  res.json({ success: true, message: 'API Restaurante funcionando' });
});

router.get('/health', (req, res) => {
  res.send('OK');
});

module.exports = router;