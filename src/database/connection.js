require('dotenv').config();
require('pg'); // Truco para obligar a Vercel a incluir el paquete PostgreSQL
const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.DATABASE_URL) {
    // Conexión externa (Vercel / Neon / Producción)
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
} else {
    // Conexión local usando variables separadas
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: process.env.DB_DIALECT || 'postgres',
            logging: false
        }
    );
}

module.exports = sequelize;
