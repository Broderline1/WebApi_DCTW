const mongoose = require('mongoose');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

// Configuración del puerto serial
const port = new SerialPort({
  path: 'COM4', // Cambia esto al puerto correcto
  baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

port.on('open', () => {
  console.log('Conexión serial abierta');
});

// Controlar el servomotor
              
exports.controlarServo = async (req, res) => {
  try {
    const { accion } = req.body;
    console.log(`Acción recibida: ${accion}`); // Log para verificar la acción

    if (accion === 'abrir' || accion === 'cerrar') {
      port.write(`${accion}\n`, (err) => {
        if (err) {
          console.error('Error al enviar el comando al Arduino:', err); // Log de error
          return res.status(500).json({ error: 'Error al enviar el comando al Arduino' });
        }
        console.log(`Comando enviado: ${accion}`); // Log de éxito
        res.status(200).json({ mensaje: `Servomotor ${accion} correctamente` });
      });
    } else {
      console.error('Acción no válida:', accion); // Log de acción no válida
      res.status(400).json({ error: 'Acción no válida' });
    }
  } catch (error) {
    console.error('Error en el servidor:', error); // Log de error general
    res.status(500).json({ error: 'Error en el servidor' });
  }
};