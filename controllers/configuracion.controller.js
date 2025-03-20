const Configuracion = require('../models/configuracion.model');
const Dispensador = require('../models/dispensador.model');

// Crear una nueva configuración
exports.createConfiguracion = async (req, res) => {
  try {
    const nuevaConfiguracion = new Configuracion(req.body);
    console.log(nuevaConfiguracion);
    await nuevaConfiguracion.save();

    // Si se proporciona un id_dispensador, validar que sea un ObjectId válido
    if (req.body.id_dispensador && !mongoose.Types.ObjectId.isValid(req.body.id_dispensador)) {
      return res.status(400).send({ error: 'El id_dispensador no es un ObjectId válido' });
    }

    res.status(201).send({mensaje: 'Configuracion creado', configuracion: nuevaConfiguracion});
  } catch (error) {
    res.status(400).send(error);
  }
};

// Obtener todas las configuraciones
exports.getConfiguraciones = async (req, res) => {
  try {
    const configuraciones = await Configuracion.find().populate('id_dispensador');
    if (configuraciones.length === 0) {
      return res.status(404).json({ message: 'No se encontraron configuraciones' });
    }
    res.status(200).send(configuraciones);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Obtener una configuración por ID
exports.getConfiguracionById = async (req, res) => {
  try {
    const configuracion = await Configuracion.findById(req.params.id).populate('id_dispensador');
    if (!configuracion) {
      return res.status(404).send();
    }
    res.status(200).send(configuracion);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Actualizar una configuración por ID
exports.updateConfiguracion = async (req, res) => {
  try {
    // Validar que el id_dispensador sea un ObjectId válido
    if (req.body.id_dispensador && !mongoose.Types.ObjectId.isValid(req.body.id_dispensador)) {
      return res.status(400).send({ error: 'El id_dispensador no es un ObjectId válido' });
    }

    const configuracion = await Configuracion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('id_dispensador');
    if (!configuracion) {
      return res.status(404).send();
    }
    res.status(200).send(configuracion);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Eliminar una configuración por ID
exports.deleteConfiguracion = async (req, res) => {
  try {
    const configuracion = await Configuracion.findByIdAndDelete(req.params.id);
    if (!configuracion) {
      return res.status(404).send();
    }

    res.status(200).send(configuracion);
  } catch (error) {
    res.status(500).send(error);
  }
};
