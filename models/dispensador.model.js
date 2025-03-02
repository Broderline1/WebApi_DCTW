const mongoose = require('mongoose');

const dispensadorSchema = new mongoose.Schema({
  id_dispensador: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  ubicacion: {
    type: String,
    required: true,
    trim: true,
  },
  estado: {
    type: String,
    required: true,
    enum: ['Activo', 'Inactivo', 'Mantenimiento'], // Solo valores válidos
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Relación con Usuario
    default: null,
  },
}, { timestamps: true });

const Dispensador = mongoose.model('Dispensador', dispensadorSchema);
module.exports = Dispensador;
