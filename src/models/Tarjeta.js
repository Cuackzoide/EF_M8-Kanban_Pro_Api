const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Tarjeta = sequelize.define('Tarjeta', {
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
    },
    posicion: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'tarjetas',
    timestamps: true
});

module.exports = Tarjeta;
