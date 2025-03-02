const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascota.controller');

/**
 * @swagger
 * tags:
 *   name: Mascotas
 *   description: Operaciones relacionadas con las mascotas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Mascota:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de la mascota
 *         tipo:
 *           type: string
 *           enum: ['Perro', 'Gato']
 *           description: Tipo de mascota
 *         propietario:
 *           type: string
 *           format: ObjectId
 *           description: ID del propietario de la mascota (opcional)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *           readOnly: true
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *           readOnly: true
 *       required:
 *         - nombre
 *         - tipo
 */

/**
 * @swagger
 * /api/Mascotas:
 *   get:
 *     tags: [Mascotas]
 *     summary: Obtiene todas las mascotas
 *     responses:
 *       200:
 *         description: Lista de mascotas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mascota'
 */
router.get('/', mascotaController.obtenerMascotas);

/**
 * @swagger
 * /api/Mascotas:
 *   post:
 *     tags: [Mascotas]
 *     summary: Crea una nueva mascota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mascota'
 *     responses:
 *       201:
 *         description: Mascota creada exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/', mascotaController.crearMascota);

/**
 * @swagger
 * /api/Mascotas/{id}:
 *   put:
 *     tags: [Mascotas]
 *     summary: Actualiza una mascota existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la mascota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mascota'
 *     responses:
 *       200:
 *         description: Mascota actualizada exitosamente
 *       404:
 *         description: Mascota no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', mascotaController.actualizarMascota);

/**
 * @swagger
 * /api/Mascotas/{id}:
 *   delete:
 *     tags: [Mascotas]
 *     summary: Elimina una mascota
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Mascota eliminada exitosamente
 *       404:
 *         description: Mascota no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', mascotaController.eliminarMascota);

module.exports = router;
