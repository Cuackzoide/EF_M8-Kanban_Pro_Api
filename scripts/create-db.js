const pg = require('pg');
require('dotenv').config();

async function createDB(name) {
    // Conectarse a PostgreSQL y crear la base de datos
    const client = new pg.Client({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'postgres' // Conectarse a la base de datos por defecto para crear la nueva
    });
    await client.connect();
    await client.query(`CREATE DATABASE ${name}`);
    console.log(`✅ Base de datos "${name}" creada exitosamente`);
    await client.end();
}
// Llamar a la función para crear la base de datos
createDB(process.env.DB_NAME);