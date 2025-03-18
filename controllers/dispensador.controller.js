// controllers/dispensador.controller.js
const mongoose = require('mongoose');
const Dispensador = require('../models/dispensador.model');
const Configuracion = require('../models/configuracion.model');

// Obtener todos los dispensadores
exports.obtenerDispensadores = async (req, res) => {
  try {
    const dispensadores = await Dispensador.find();
    if (dispensadores.length === 0) {
      return res.status(404).json({ message: 'No se encontraron dispensadores' });
    }
    res.json(dispensadores);
  } catch (error) {
    console.error('Error al obtener dispensadores:', error);
    res.status(500).json({ message: 'Error al obtener dispensadores' });
  }
};

// Crear un nuevo dispensador
exports.crearDispensador = async (req, res) => {
  try {
    const { id_dispensador, ubicacion, estado, usuarioId } = req.body;

    // Validar el usuarioId si está presente
    if (usuarioId && !mongoose.Types.ObjectId.isValid(usuarioId)) {
      return res.status(400).json({ mensaje: 'ID de usuario no válido' });
    }

    // Crear el dispensador
    const nuevoDispensador = new Dispensador({
      id_dispensador,
      ubicacion,
      estado,
      usuario: usuarioId || null, // Asigna null si no hay usuarioId
    });
    await nuevoDispensador.save();

    res.status(201).json({ mensaje: 'Dispensador creado', dispensador: nuevoDispensador });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear dispensador', error: error.message });
  }
};

// Actualizar un dispensador
exports.actualizarDispensador = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_dispensador, ubicacion, estado, usuario } = req.body;
    const dispensadorActualizado = await Dispensador.findByIdAndUpdate(
      id,
      { id_dispensador, ubicacion, estado, usuario },
      { new: true }
    );
    if (!dispensadorActualizado) {
      return res.status(404).json({ mensaje: 'Dispensador no encontrado' });
    }
    res.status(200).json({ mensaje: 'Dispensador actualizado', dispensadorActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar dispensador', error });
  }
};

// Eliminar un dispensador
exports.eliminarDispensador = async (req, res) => {
  try {
    const { id } = req.params;
    const dispensadorEliminado = await Dispensador.findByIdAndDelete(id);
    if (!dispensadorEliminado) {
      return res.status(404).json({ mensaje: 'Dispensador no encontrado' });
    }
    res.status(200).json({ mensaje: 'Dispensador eliminado', dispensadorEliminado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar dispensador', error });
  }
};

exports.asignarConfiguracionADispensador = async (req, res) => {
  try {
    const { dispensadorId, configuracionId } = req.params;

    // Validar si los IDs son válidos
    if (!mongoose.Types.ObjectId.isValid(dispensadorId) || !mongoose.Types.ObjectId.isValid(configuracionId)) {
      return res.status(400).json({ mensaje: 'ID de dispensador o configuracion no válido' });
    }

    // Verificar si el dispensador existe
    const dispensador = await Dispensador.findById(dispensadorId);
    if (!dispensador) return res.status(404).json({ mensaje: 'Dispensador no encontrado' });

    // Verificar si la configuracion existe
    const configuracion = await Configuracion.findById(configuracionId);
    if (!configuracion) return res.status(404).json({ mensaje: 'Configuracion no encontrada' });

    // Verificar si el dispensador ya tiene esta configuración
    if (dispensador.configuracion && dispensador.configuracion.toString() === configuracionId) {
      return res.status(400).json({ mensaje: 'El dispensador ya tiene esta configuracion' });
    }

    // Asignar la configuración al dispensador
    dispensador.configuracion = configuracionId;
    await dispensador.save();

    // Asignar el dispensador a la configuración
    configuracion.dispensador = dispensadorId;
    await configuracion.save();

    // Devolver la respuesta con ambos objetos actualizados
    res.status(200).json({ mensaje: 'Configuracion asignada a Dispensador', dispensador, configuracion });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al asignar configuracion', error: error.message });
  }
};
