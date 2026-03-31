const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Tablero = sequelize.define('Tablero', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'tableros',
    timestamps: false
});

module.exports = Tablero;
