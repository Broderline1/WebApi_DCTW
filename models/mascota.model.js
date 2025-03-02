const mongoose = require('mongoose');

const mascotaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  tipo: {
    type: String,
    required: true,
    enum: ['Perro', 'Gato' ],
  },
  propietario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Relación con Usuario
    default: null, // Ya no es obligatorio
  },
}, { timestamps: true });

const Mascota = mongoose.model('Mascota', mascotaSchema);
module.exports = Mascota;
