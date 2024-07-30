import express from 'express';
import db from './database.js';

const app = express();
const port = 3000;

// Middleware para analizar cuerpos de solicitud JSON
app.use(express.json());

// Ruta POST para recibir datos del sensor
app.post('/data', (req, res) => {
  const data = req.body;
  // Verificar que el campo "luminosidad" exista y sea un número
  if (data && typeof data.luminosidad === 'number') {
    const valor_luminosidad = data.luminosidad;
    // Preparar y ejecutar la declaración para insertar los datos en la base de datos
    const stmt = db.prepare("INSERT INTO sensor_data (valor_luminosidad) VALUES (?)");
    stmt.run(valor_luminosidad, (err) => {
      if (err) {
        console.error("Error al guardar en la base de datos:", err.message);
        res.status(500).json({ status: 'error', message: 'Error al guardar los datos en la base de datos' });
      } else {
        res.status(200).json({ status: 'success' });
      }
    });
    stmt.finalize();
  } else {
    res.status(400).json({ status: 'error', message: 'No se recibieron datos válidos o faltan campos requeridos' });
  }
});

// Ruta GET para recuperar datos del sensor
app.get('/data', (req, res) => {
  db.all("SELECT * FROM sensor_data", [], (err, rows) => {
    if (err) {
      res.status(500).json({ status: 'error', message: err.message });
      return;
    }
    res.status(200).json({ status: 'success', data: rows });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
