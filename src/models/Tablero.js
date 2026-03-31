const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Tablero = sequelize.define('Tablero', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'tableros',
    timestamps: false
});

module.exports = Tablero;
