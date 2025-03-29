require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db.config');
const swaggerDocs = require('./config/swagger.config');
const swaggerUi = require('swagger-ui-express');
const authMiddleware = require('./middleware/auth');

// Importa rutas
const usuarioRoutes = require('./routes/usuario.routes');
const mascotaRoutes = require('./routes/mascota.routes');
const dispensadorRoutes = require('./routes/dispensador.routes');
const configuracionRouter = require('./routes/configuracion.routes');
const authRoutes = require('./routes/auth.routes');
//const servoRoutes = require('./routes/servo.routes'); // Agrega esta línea

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB con Mongoose
conectarDB();

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// **Aplicar el middleware de autenticación globalmente**
app.use((req, res, next) => {
  if (req.path.startsWith('/api/auth')) {
    // Excluir las rutas de auth
    return next();
  }
  // Aplicar el middleware de autenticación a todas las demás rutas
  authMiddleware(req, res, next);
});

// Usa las rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/mascotas', mascotaRoutes);
app.use('/api/dispensadores', dispensadorRoutes);
app.use('/api/configuraciones', configuracionRouter);
app.use('/api/auth', authRoutes);
//app.use('/api/servo', servoRoutes); // Agrega esta línea
// Documentación con Swagger
swaggerDocs(app);

// Inicia el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
