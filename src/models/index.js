const Usuario = require('./Usuario');
const Tablero = require('./Tablero');
const Lista = require('./Lista');
const Tarjeta = require('./Tarjeta');

// Relaciones
Usuario.hasMany(Tablero, { foreignKey: 'userId', as: 'tableros', onDelete: 'CASCADE' });
Tablero.belongsTo(Usuario, { foreignKey: 'userId' });

Tablero.hasMany(Lista, { foreignKey: 'boardId', as: 'listas', onDelete: 'CASCADE' });
Lista.belongsTo(Tablero, { foreignKey: 'boardId' });

Lista.hasMany(Tarjeta, { foreignKey: 'listId', as: 'tarjetas', onDelete: 'CASCADE' });
Tarjeta.belongsTo(Lista, { foreignKey: 'listId' });

module.exports = {
    Usuario,
    Tablero,
    Lista,
    Tarjeta
};
