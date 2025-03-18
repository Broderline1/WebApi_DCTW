const mongoose = require('mongoose');

const configuracionSchema = new mongoose.Schema({
  horarios: {
    type: [String],
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
  id_dispensador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dispensador',
    default: null,  // Valor por defecto
    required: false,  // No es obligatorio
  },
}, { timestamps: true });

const Configuracion = mongoose.model('Configuracion', configuracionSchema);
module.exports = Configuracion;
