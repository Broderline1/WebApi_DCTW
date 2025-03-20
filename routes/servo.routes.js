const express = require('express');
const router = express.Router();
const servoController = require('../controllers/servo.controller');

/**
 * @swagger
 * tags:
 *   name: Servomotor
 *   description: Operaciones para controlar el servomotor
 */

/**
 * @swagger
 * /api/servo:
 *   post:
 *     tags: [Servomotor]
 *     summary: Controla el servomotor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accion:
 *                 type: string
 *                 enum: [abrir, cerrar]
 *                 description: Acción a realizar con el servomotor
 *     responses:
 *       200:
 *         description: Servomotor controlado correctamente
 *       400:
 *         description: Acción no válida
 *       500:
 *         description: Error en el servidor
 */
router.post('/', servoController.controlarServo);

module.exports = router;
