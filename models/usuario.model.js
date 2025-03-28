const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  telefono: {
    type: String,
    required: false,
  },
  contraseña: {
    type: String,
    required: true,
  },
  dispensadores: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dispensador',
  }],
  mascotas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mascota',
  }]
});

// Hash password before saving
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('contraseña')) return next();
  console.log('Contraseña antes de encriptar:', this.contraseña); // Log para verificar la contraseña antes de encriptar
  this.contraseña = await bcrypt.hash(this.contraseña, 12);
  console.log('Contraseña después de encriptar:', this.contraseña); // Log para verificar la contraseña después de encriptar
  next();
});

module.exports = mongoose.model('Usuario', usuarioSchema);