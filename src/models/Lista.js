const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Lista = sequelize.define('Lista', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'listas',
    timestamps: false
});

module.exports = Lista;
