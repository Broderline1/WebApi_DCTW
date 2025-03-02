const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Operaciones relacionadas con los usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *         correo:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *         telefono:
 *           type: string
 *           description: Número de teléfono del usuario
 *         contraseña:
 *           type: string
 *           description: Contraseña del usuario (mínimo 6 caracteres)
 *       required:
 *         - nombre
 *         - correo
 *         - telefono
 *         - contraseña
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     tags: [Usuarios]
 *     summary: Obtiene todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get('/', usuarioController.obtenerUsuarios);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     tags: [Usuarios]
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/', usuarioController.crearUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     tags: [Usuarios]
 *     summary: Actualiza un usuario existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', usuarioController.actualizarUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     tags: [Usuarios]
 *     summary: Elimina un usuario
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', usuarioController.eliminarUsuario);

/**
 * @swagger
 * /api/usuarios/{usuarioId}/asignar-mascota/{mascotaId}:
 *   post:
 *     tags: [Usuarios]
 *     summary: Asigna una mascota a un usuario
 *     parameters:
 *       - name: usuarioId
 *         in: path
 *         required: true
 *         description: ID del usuario
 *       - name: mascotaId
 *         in: path
 *         required: true
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Mascota asignada correctamente
 *       404:
 *         description: Usuario o mascota no encontrados
 *       500:
 *         description: Error en el servidor
 */
router.post('/:usuarioId/asignar-mascota/:mascotaId', usuarioController.asignarMascotaAUsuario);

/**
 * @swagger
 * /api/usuarios/{usuarioId}/asignar-dispensador/{dispensadorId}:
 *   post:
 *     tags: [Usuarios]
 *     summary: Asigna un dispensador a un usuario
 *     parameters:
 *       - name: usuarioId
 *         in: path
 *         required: true
 *         description: ID del usuario
 *       - name: dispensadorId
 *         in: path
 *         required: true
 *         description: ID del dispensador
 *     responses:
 *       200:
 *         description: Dispensador asignado correctamente
 *       404:
 *         description: Usuario o dispensador no encontrados
 *       500:
 *         description: Error en el servidor
 */
router.post('/:usuarioId/asignar-dispensador/:dispensadorId', usuarioController.asignarDispensadorAUsuario);

module.exports = router;
