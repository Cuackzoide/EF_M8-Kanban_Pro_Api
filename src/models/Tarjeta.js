const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Tarjeta = sequelize.define('Tarjeta', {
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
    position: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    listId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'tarjetas',
    timestamps: true
});

module.exports = Tarjeta;
