const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validación de correo
  },
  telefono: {
    type: String,
    required: true,
  },
  contraseña: {
    type: String,
    required: true,
    minlength: 6, // Exige una contraseña de al menos 6 caracteres
  },
}, { timestamps: true });

// Middleware para encriptar contraseña antes de guardar
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
