const mongoose = require('mongoose');

const configuracionSchema = new mongoose.Schema({
  horarios: {
    type: [String], // Array de strings
    required: true,
  },
  cantidad_porcion: {
    type: Number,
    required: true,
  },
  modo_manual: {
    type: Boolean,
    required: true,
  },
  dispensador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dispensador',
    required: false,  // No es obligatorio
    default: null
  },
}, { timestamps: true });

const Configuracion = mongoose.model('Configuracion', configuracionSchema);
module.exports = Configuracion;
