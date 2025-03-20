const mongoose = require('mongoose');

const dispensadorSchema = new mongoose.Schema({
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
  configuracion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Configuracion', // Relación con Configuración
    default: null,
    require: false
  },
}, { timestamps: true });

const Dispensador = mongoose.model('Dispensador', dispensadorSchema);
module.exports = Dispensador;
