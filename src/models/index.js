const Usuario = require('./Usuario');
const Tablero = require('./Tablero');
const Lista = require('./Lista');
const Tarjeta = require('./Tarjeta');

// Relaciones
Usuario.hasMany(Tablero, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
Tablero.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Tablero.hasMany(Lista, { foreignKey: 'tableroId', onDelete: 'CASCADE' });
Lista.belongsTo(Tablero, { foreignKey: 'tableroId' });

Lista.hasMany(Tarjeta, { foreignKey: 'listaId', onDelete: 'CASCADE' });
Tarjeta.belongsTo(Lista, { foreignKey: 'listaId' });

module.exports = {
    Usuario,
    Tablero,
    Lista,
    Tarjeta
};
