const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./src/routes/routes.js');
const sequelize = require('./src/database/connection');

// Configuración de HBS
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));
hbs.registerPartials(path.join(__dirname, 'src/views/partials'));

//servir ruta bootstrap dinámica
app.use("/assets/vendors/bootstrap", express.static(path.join(__dirname, "node_modules", "bootstrap", "dist")))

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use(routes);

// Entry point of the application
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ KanbanPro DB Server - Conectado a la base de datos');
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    } catch (error) {
        console.error('❌ Error de conexión:', error);
        process.exit(1);
    }
});


