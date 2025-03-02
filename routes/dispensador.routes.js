const express = require('express');
const router = express.Router();
const dispensadorController = require('../controllers/dispensador.controller');

/**
 * @swagger
 * tags:
 *   name: Dispensadores
 *   description: Operaciones relacionadas con los dispensadores
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Dispensador:
 *       type: object
 *       properties:
 *         id_dispensador:
 *           type: string
 *           description: ID único del dispensador
 *         ubicacion:
 *           type: string
 *           description: Ubicación del dispensador
 *         estado:
 *           type: string
 *           enum: ['Activo', 'Inactivo', 'Mantenimiento']
 *           description: Estado del dispensador
 *         usuario:
 *           type: string
 *           format: ObjectId
 *           description: ID del usuario asignado (opcional)
 *       required:
 *         - id_dispensador
 *         - ubicacion
 *         - estado
 */

/**
 * @swagger
 * /api/dispensadores:
 *   get:
 *     tags: [Dispensadores]
 *     summary: Obtiene todos los dispensadores
 *     responses:
 *       200:
 *         description: Lista de dispensadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dispensador'
 */
router.get('/', dispensadorController.obtenerDispensadores);

/**
 * @swagger
 * /api/dispensadores:
 *   post:
 *     tags: [Dispensadores]
 *     summary: Crea un nuevo dispensador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dispensador'
 *     responses:
 *       201:
 *         description: Dispensador creado exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/', dispensadorController.crearDispensador);

/**
 * @swagger
 * /api/dispensadores/{id}:
 *   put:
 *     tags: [Dispensadores]
 *     summary: Actualiza un dispensador existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del dispensador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dispensador'
 *     responses:
 *       200:
 *         description: Dispensador actualizado exitosamente
 *       404:
 *         description: Dispensador no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', dispensadorController.actualizarDispensador);

/**
 * @swagger
 * /api/dispensadores/{id}:
 *   delete:
 *     tags: [Dispensadores]
 *     summary: Elimina un dispensador
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del dispensador
 *     responses:
 *       200:
 *         description: Dispensador eliminado exitosamente
 *       404:
 *         description: Dispensador no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', dispensadorController.eliminarDispensador);

module.exports = router;
