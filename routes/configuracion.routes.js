const express = require('express');
const router = express.Router();
const configuracionController = require('../controllers/configuracion.controller');

/**
 * @swagger
 * tags:
 *   name: Configuraciones
 *   description: Operaciones relacionadas con las configuraciones de los dispensadores
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Configuracion:
 *       type: object
 *       properties:
 *         horarios:
 *           type: array
 *           items:
 *             type: string
 *           description: Horarios de alimentación
 *         cantidad_porcion:
 *           type: number
 *           description: Cantidad de comida por porción
 *         modo_manual:
 *           type: boolean
 *           description: Indica si el modo manual está activado
 *         id_dispensador:
 *           type: string
 *           format: ObjectId
 *           description: ID del dispensador asociado (opcional)
 *       required:
 *         - horarios
 *         - cantidad_porcion
 *         - modo_manual
 */

/**
 * @swagger
 * /api/configuraciones:
 *   get:
 *     tags: [Configuraciones]
 *     summary: Obtiene todas las configuraciones
 *     responses:
 *       200:
 *         description: Lista de configuraciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Configuracion'
 */
router.get('/', configuracionController.getConfiguraciones);

/**
 * @swagger
 * /api/configuraciones:
 *   post:
 *     tags: [Configuraciones]
 *     summary: Crea una nueva configuración
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Configuracion'
 *     responses:
 *       201:
 *         description: Configuración creada exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/', configuracionController.createConfiguracion);

/**
 * @swagger
 * /api/configuraciones/{id}:
 *   put:
 *     tags: [Configuraciones]
 *     summary: Actualiza una configuración existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la configuración
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Configuracion'
 *     responses:
 *       200:
 *         description: Configuración actualizada exitosamente
 *       404:
 *         description: Configuración no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', configuracionController.updateConfiguracion);

/**
 * @swagger
 * /api/configuraciones/{id}:
 *   delete:
 *     tags: [Configuraciones]
 *     summary: Elimina una configuración
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la configuración
 *     responses:
 *       200:
 *         description: Configuración eliminada exitosamente
 *       404:
 *         description: Configuración no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', configuracionController.deleteConfiguracion);

module.exports = router;