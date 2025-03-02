const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // Ya no necesitas usar useNewUrlParser ni useUnifiedTopology
    });
    console.log('Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('Error de conexión:', error);
    process.exit(1); // Detiene la aplicación si hay error
  }
};

module.exports = conectarDB;
