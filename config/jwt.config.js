const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'clave_secreta'; // Usa la clave del .env o una por defecto

// Generar un token
const generarToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token válido por 1 hora
};

// Verificar un token
const verificarToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { generarToken, verificarToken };