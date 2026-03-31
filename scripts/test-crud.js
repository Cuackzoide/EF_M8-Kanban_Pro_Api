const sequelize = require('../src/database/connection');
const { Usuario, Tablero, Lista, Tarjeta } = require('../src/models');

async function testCRUD() {
    try {
        await sequelize.authenticate();
        console.log('Conectando a la base de datos...');

        // Sincronizar modelos (sin force para mantener data persistente)
        await sequelize.sync();

        // CREATE
        console.log('Creando registros de prueba...');

        const usuario = await Usuario.create({
            nombre: 'usuario test',
            email: 'usuario@test.com',
            contraseña: 'testpass'
        });
        console.log('Usuario 🚹 creado:', usuario.nombre);

        const tablero = await Tablero.create({
            titulo: 'tablero test',
            descripcion: 'Tablero para pruebas',
            usuarioId: usuario.id
        });
        console.log('Tablero 🗓️ creado:', tablero.titulo);

        const lista = await Lista.create({
            titulo: 'lista test',
            tableroId: tablero.id
        });
        console.log('Lista 🗒️ creada:', lista.titulo);

        const tarjeta1 = await Tarjeta.create({
            titulo: 'tarjeta test 1',
            descripcion: 'Descripción de la tarjeta test 1',
            listaId: lista.id
        });
        console.log('Tarjeta 1 📝 creada:', tarjeta1.titulo);

        const tarjeta2 = await Tarjeta.create({
            titulo: 'tarjeta test 2',
            descripcion: 'Descripción de la tarjeta test 2',
            listaId: lista.id
        });
        console.log('Tarjeta 2 📝 creada:', tarjeta2.titulo);

        // READ 
        console.log('Leyendo datos...');

        const resultado = await Usuario.findByPk(usuario.id, {
            model: Usuario,
            attributes: ['nombre', 'email'],
            include:
            {
                model: Tablero,
                attributes: ['titulo'],
                include: {
                    model: Lista,
                    attributes: ['titulo'],
                    include: {
                        model: Tarjeta,
                        attributes: ['titulo']
                    }
                }
            }
        });

        console.log(resultado.toJSON());

        // UPDATE
        console.log('Actualizando tarjeta...');

        await tarjeta1.update({ titulo: 'tarjeta actualizada' });
        console.log('Datos actualizados:', tarjeta1.titulo);

        // DELETE 
        console.log('Eliminando tarjeta...');

        await tarjeta2.destroy();
        console.log('✅ Tarjeta test 2 eliminada');

        // Verificar todos los cambios
        console.log('Verificando cambios...');

        const modificado = await Usuario.findByPk(usuario.id, {
            model: Usuario,
            include:
            {
                model: Tablero,
                attributes: ['titulo'],
                include: {
                    model: Lista,
                    attributes: ['titulo'],
                    include: {
                        model: Tarjeta,
                        attributes: ['titulo']
                    }
                }
            }
        });

        console.log(modificado.toJSON());
        console.log(lista.toJSON());
        console.log(tarjeta1.toJSON());

        console.log('Pruebas CRUD completadas exitosamente ✅ ');

        await sequelize.close();
    } catch (error) {
        console.error('❌ Error en los test:', error.message);
        process.exit(1);
    }
}

testCRUD();