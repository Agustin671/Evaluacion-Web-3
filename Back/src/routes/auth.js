const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyAccessToken } = require('../middlewares/auth');

// Rutas Públicas (No requieren token) - GEN-04 y GEN-05
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);

// Middleware de Autenticación - GEN-06 (Todo lo que esté debajo requerirá token)
router.use(verifyAccessToken);

// Rutas Protegidas
router.post('/logout', authController.logout);
router.get('/me', authController.me);
router.patch('/me', authController.updateMe);
router.get('/sesiones', authController.listSesiones);
router.delete('/sesiones', authController.revokeAllSesiones);
router.delete('/sesiones/:id', authController.revokeSesion);

module.exports = router;