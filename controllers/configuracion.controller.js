const mongoose = require('mongoose');
const Configuracion = require('../models/configuracion.model');
const Dispensador = require('../models/dispensador.model'); // Asegúrate de importar el modelo de Dispensador

exports.getConfiguraciones = async (req, res) => {
  try {
    const configuraciones = await Configuracion.find().populate('dispensador');
    if (configuraciones.length === 0) {
      return res.status(404).json({ message: 'No se encontraron configuraciones' });
    }
    res.status(200).send(configuraciones);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createConfiguracion = async (req, res) => {
  try {
    const { horarios, cantidad_porcion, modo_manual, dispensador } = req.body;

    // Validar si dispensador es un ObjectId válido
    const isValidObjectId = mongoose.Types.ObjectId.isValid(dispensador);
    const dispensadorId = isValidObjectId ? dispensador : null;

    // Validar si el dispensador ya tiene una configuración asignada
    if (dispensadorId) {
      const configuracionExistente = await Configuracion.findOne({ dispensador: dispensadorId });
      if (configuracionExistente) {
        return res.status(400).json({ mensaje: 'Este dispensador ya tiene una configuración asignada.' });
      }
    }

    const nuevaConfiguracion = new Configuracion({
      horarios,
      cantidad_porcion,
      modo_manual,
      dispensador: dispensadorId,
    });

    await nuevaConfiguracion.save();

    // Actualizar el dispensador con la nueva configuración
    if (dispensadorId) {
      await Dispensador.findByIdAndUpdate(dispensadorId, { configuracion: nuevaConfiguracion._id });
    }

    res.status(201).send({ mensaje: 'Configuración creada', configuracion: nuevaConfiguracion });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateConfiguracion = async (req, res) => {
  try {
    const { horarios, cantidad_porcion, modo_manual, dispensador } = req.body;

    // Validar si dispensador es un ObjectId válido
    const isValidObjectId = mongoose.Types.ObjectId.isValid(dispensador);
    const dispensadorId = isValidObjectId ? dispensador : null;

    // Validar si el dispensador ya tiene una configuración asignada
    if (dispensadorId) {
      const configuracionExistente = await Configuracion.findOne({ dispensador: dispensadorId, _id: { $ne: req.params.id } });
      if (configuracionExistente) {
        return res.status(400).json({ mensaje: 'Este dispensador ya tiene una configuración asignada.' });
      }
    }

    const configuracion = await Configuracion.findByIdAndUpdate(
      req.params.id,
      { horarios, cantidad_porcion, modo_manual, dispensador: dispensadorId },
      { new: true, runValidators: true }
    ).populate('dispensador');

    if (!configuracion) {
      return res.status(404).send();
    }

    // Actualizar el dispensador con la nueva configuración
    if (dispensadorId) {
      await Dispensador.findByIdAndUpdate(dispensadorId, { configuracion: configuracion._id });
    }

    res.status(200).send(configuracion);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteConfiguracion = async (req, res) => {
  try {
    const configuracion = await Configuracion.findByIdAndDelete(req.params.id);
    if (!configuracion) {
      return res.status(404).send();
    }

    // Eliminar la referencia de la configuración en el dispensador
    if (configuracion.dispensador) {
      await Dispensador.findByIdAndUpdate(configuracion.dispensador, { configuracion: null });
    }

    res.status(200).send(configuracion);
  } catch (error) {
    res.status(500).send(error);
  }
};
