const mongoose = require('mongoose');
const Usuario = require('../models/usuario.model');
const Mascota = require('../models/mascota.model');
const Dispensador = require('../models/dispensador.model');

// Obtener todos los usuarios
exports.obtenerUsuarios = [ async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
  }
}];

exports.obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id)
      .populate('dispensadores')
      .populate('mascotas');
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuario', error });
  }
};

// Actualizar un usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, telefono } = req.body;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { nombre, correo, telefono },
      { new: true }
    );
    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json({ mensaje: 'Usuario actualizado', usuarioActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error });
  }
};

// Eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json({ mensaje: 'Usuario eliminado', usuarioEliminado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error });
  }
};

// Asignar mascota a un usuario
exports.asignarMascotaAUsuario = async (req, res) => {
  try {
    const { usuarioId, mascotaId } = req.params;

    // Validar si los IDs son válidos
    if (!mongoose.Types.ObjectId.isValid(usuarioId) || !mongoose.Types.ObjectId.isValid(mascotaId)) {
      return res.status(400).json({ mensaje: 'ID de usuario o mascota no válido' });
    }

    // Verificar si el usuario existe
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    // Verificar si la mascota existe
    const mascota = await Mascota.findById(mascotaId);
    if (!mascota) return res.status(404).json({ mensaje: 'Mascota no encontrada' });

    // Verificar si el usuario ya es el propietario
    if (mascota.propietario && mascota.propietario.toString() === usuarioId) {
      return res.status(400).json({ mensaje: 'El usuario ya es el propietario de esta mascota' });
    }

    // Asignar el propietario a la mascota
    mascota.propietario = usuarioId;
    await mascota.save();

    // Agregar la mascota al campo `mascotas` del usuario si no está ya incluida
    if (!usuario.mascotas.includes(mascotaId)) {
      usuario.mascotas.push(mascotaId);
      await usuario.save();
    }

    // Devolver la respuesta con el usuario actualizado
    res.status(200).json({ mensaje: 'Mascota asignada al usuario', usuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al asignar mascota al usuario', error: error.message });
  }
};

// Asignar dispensador a un usuario
exports.asignarDispensadorAUsuario = async (req, res) => {
  try {
    const { usuarioId, dispensadorId } = req.params;

    // Validar si los IDs son válidos
    if (!mongoose.Types.ObjectId.isValid(usuarioId) || !mongoose.Types.ObjectId.isValid(dispensadorId)) {
      return res.status(400).json({ mensaje: 'ID de usuario o dispensador no válido' });
    }

    // Verificar si el usuario existe
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    // Verificar si el dispensador existe
    const dispensador = await Dispensador.findById(dispensadorId);
    if (!dispensador) return res.status(404).json({ mensaje: 'Dispensador no encontrado' });

    // Verificar si el usuario ya está asignado al dispensador
    if (dispensador.usuario && dispensador.usuario.toString() === usuarioId) {
      return res.status(400).json({ mensaje: 'El usuario ya está asignado a este dispensador' });
    }

    // Asignar el usuario al dispensador
    dispensador.usuario = usuarioId;
    await dispensador.save();

    // Agregar el dispensador al campo `dispensadores` del usuario si no está ya incluido
    if (!usuario.dispensadores.includes(dispensadorId)) {
      usuario.dispensadores.push(dispensadorId);
      await usuario.save();
    }

    // Devolver la respuesta con el usuario actualizado
    res.status(200).json({ mensaje: 'Dispensador asignado al usuario', usuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al asignar dispensador al usuario', error: error.message });
  }
};

// Exportar funciones
module.exports = exports;
