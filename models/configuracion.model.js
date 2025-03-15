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
    type: mongoose.Schema.Types.ObjectId, // Solo ObjectId
    ref: 'Dispensador', // Relación con Dispensador
    default: null, // Valor predeterminado
  },
}, { timestamps: true });

const Configuracion = mongoose.model('Configuracion', configuracionSchema);
module.exports = Configuracion;
