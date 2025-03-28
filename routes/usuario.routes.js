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
 *         correo:
 *           type: string
 *           format: email
 *         telefono:
 *           type: string
 *         contraseña:
 *           type: string
 *         dispensadores:
 *           type: array
 *           items:
 *             type: string
 *         mascotas:
 *           type: array
 *           items:
 *             type: string
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
 *     security:
 *       - bearerAuth: []  # Requiere autenticación
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
 * /api/usuarios/{id}:
 *   get:
 *     tags: [Usuarios]
 *     summary: Obtiene un usuario por su ID con sus dispensadores y mascotas
 *     security:
 *       - bearerAuth: []  # Requiere autenticación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', usuarioController.obtenerUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     tags: [Usuarios]
 *     summary: Actualiza un usuario existente
 *     security:
 *       - bearerAuth: []  # Requiere autenticación
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
 *     security:
 *       - bearerAuth: []  # Requiere autenticación
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
 *     security:
 *       - bearerAuth: []  # Requiere autenticación
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
 *     security:
 *       - bearerAuth: []  # Requiere autenticación
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
