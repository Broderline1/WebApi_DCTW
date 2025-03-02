const Mascota = require('../models/mascota.model');

// Obtener todas las mascotas
exports.obtenerMascotas = async (req, res) => {
  try {
    const mascotas = await Mascota.find();
    res.status(200).json(mascotas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener mascotas', error });
  }
};

// Crear una nueva mascota
exports.crearMascota = async (req, res) => {
  try {
    const { nombre, tipo } = req.body;
    const nuevaMascota = new Mascota({ nombre, tipo });
    await nuevaMascota.save();
    res.status(201).json({ mensaje: 'Mascota creada exitosamente', nuevaMascota });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear mascota', error });
  }
};

// Actualizar una mascota
exports.actualizarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, tipo, raza, peso, edad } = req.body;
    const mascotaActualizada = await Mascota.findByIdAndUpdate(
      id,
      { nombre, tipo, raza, peso, edad },
      { new: true }
    );
    if (!mascotaActualizada) {
      return res.status(404).json({ mensaje: 'Mascota no encontrada' });
    }
    res.status(200).json({ mensaje: 'Mascota actualizada', mascotaActualizada });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar mascota', error });
  }
};

// Eliminar una mascota
exports.eliminarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const mascotaEliminada = await Mascota.findByIdAndDelete(id);
    if (!mascotaEliminada) {
      return res.status(404).json({ mensaje: 'Mascota no encontrada' });
    }
    res.status(200).json({ mensaje: 'Mascota eliminada', mascotaEliminada });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar mascota', error });
  }
};

