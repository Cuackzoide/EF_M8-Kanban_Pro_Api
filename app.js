const express = require('express');
const hbs = require('hbs');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
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

//servir ruta bootstrap-icons dinámica
app.use("/assets/vendors/bootstrap-icons", express.static(path.join(__dirname, "node_modules", "bootstrap-icons", "font")))

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));

// Rutas
app.use(routes);

// Entry point of the application
app.listen(PORT, async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('✅ KanbanPro DB Server - Conectado a la base de datos');
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    } catch (error) {
        console.error('❌ Error de conexión:', error);
        process.exit(1);
    }
});


