const sequelize = require('../src/database/connection');
const { Usuario, Tablero, Lista, Tarjeta } = require('../src/models');

async function seed() {
    try {
        await sequelize.sync({ force: true });
        console.log('Base de datos sincronizada 💫');

        // Crear usuarios
        const usuario1 = await Usuario.create({
            nombre: 'Juan Pérez',
            email: 'juanp@example.com',
            contraseña: 'password123'
        });
        console.log('Usuario 1 🚹 creado:', usuario1.nombre);

        const usuario2 = await Usuario.create({
            nombre: 'María García',
            email: 'mariag@example.com',
            contraseña: 'password456'
        });
        console.log('Usuario 2 🚹 creado:', usuario2.nombre);

        // Crear tableros
        const tablero1 = await Tablero.create({
            titulo: 'Proyecto Web',
            descripcion: 'Desarrollo del sitio web',
            usuarioId: usuario1.id
        });
        console.log('Tablero 1 🗓️ creado:', tablero1.titulo);

        const tablero2 = await Tablero.create({
            titulo: 'App Móvil',
            descripcion: 'Desarrollo de aplicación móvil',
            usuarioId: usuario1.id
        });
        console.log('Tablero 2 🗓️ creado:', tablero2.titulo);

        const tablero3 = await Tablero.create({
            titulo: 'Backend API',
            descripcion: 'Desarrollo de servicios',
            usuarioId: usuario2.id
        });
        console.log('Tablero 3 🗓️ creado:', tablero3.titulo);

        // Crear listas para el primer tablero
        const lista1 = await Lista.create({
            titulo: 'Por Hacer',
            tableroId: tablero1.id
        });
        console.log('Lista 1 🗒️ creada:', lista1.titulo);

        const lista2 = await Lista.create({
            titulo: 'En Progreso',
            tableroId: tablero1.id
        });
        console.log('Lista 2 🗒️ creada:', lista2.titulo);

        const lista3 = await Lista.create({
            titulo: 'Completado',
            tableroId: tablero1.id
        });
        console.log('Lista 3 🗒️ creada:', lista3.titulo);

        // Crear tarjetas
        await Tarjeta.create({
            titulo: 'Diseñar interfaz',
            descripcion: 'Crear mockups de la interfaz',
            listaId: lista1.id,
            posicion: 1
        });

        await Tarjeta.create({
            titulo: 'Configurar base de datos',
            descripcion: 'Establecer conexión con PostgreSQL',
            listaId: lista2.id,
            posicion: 1
        });

        await Tarjeta.create({
            titulo: 'Implementar autenticación',
            descripcion: 'Crear sistema de login',
            listaId: lista2.id,
            posicion: 2
        });

        await Tarjeta.create({
            titulo: 'Pruebas unitarias',
            descripcion: 'Escribir tests',
            listaId: lista3.id,
            posicion: 1
        });

        console.log('Tarjetas 📝 creadas exitosamente');
        console.log('Base de datos poblada correctamente ✨');
    } catch (error) {
        console.error('Error en seeder:', error);
        throw error;
    }
}

module.exports = seed;

// Si se ejecuta directamente como script
if (require.main === module) {
    seed().then(() => {
        sequelize.close();
    });
}
