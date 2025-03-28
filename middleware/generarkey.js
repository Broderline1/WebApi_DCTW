// Generar una clave secreta segura
const crypto = require('crypto');

// Genera una clave aleatoria de 256 bits y la codifica en Base64
const secretKey = crypto.randomBytes(32).toString('base64');

console.log('Clave secreta generada:', secretKey);