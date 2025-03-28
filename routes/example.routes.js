const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // Middleware para proteger la ruta

/**
 * @swagger
 * /api/example/protected:
 *   get:
 *     tags: [Ejemplo]
 *     summary: Ruta protegida de ejemplo
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso permitido
 *       401:
 *         description: No autorizado
 */
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ mensaje: 'Acceso permitido a la ruta protegida', usuario: req.usuario });
});

module.exports = router;