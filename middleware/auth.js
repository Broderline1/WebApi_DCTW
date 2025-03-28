const { verificarToken } = require('../config/jwt.config');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Verificar si el encabezado Authorization está presente
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ mensaje: 'Token no proporcionado o formato inválido. Usa "Bearer <token>"' });
    }

    // Extraer el token del encabezado
    const token = authHeader.split(' ')[1];

    // Verificar el token
    const decoded = verificarToken(token);

    // Agregar los datos del usuario al objeto `req` para usarlos en las rutas protegidas
    req.usuario = decoded;
    next(); // Continuar con la siguiente función
  } catch (error) {
    console.error('Error al verificar el token:', error);

    // Manejar errores específicos de JWT
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ mensaje: 'El token ha expirado. Por favor, inicia sesión nuevamente.' });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ mensaje: 'Token inválido. Por favor, proporciona un token válido.' });
    }

    // Manejar cualquier otro error
    return res.status(401).json({ mensaje: 'Error de autenticación. Token inválido o no proporcionado.' });
  }
};