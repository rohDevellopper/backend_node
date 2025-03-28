require('dotenv').config({ path: './src/.env' });
const path = require('path');
const express = require('express');
const app = express();
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const { PORT } = require('./config/env');

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Para API JSON

// Rutas
app.use('/', webRoutes);
app.use('/api', apiRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
