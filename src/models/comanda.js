'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comanda = sequelize.define(
    'Comanda',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      mesaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mesero: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: 'comandas',
    }
  );

  Comanda.associate = (models) => {
    Comanda.belongsTo(models.Mesa, {
      foreignKey: 'mesaId',
      as: 'mesa',
    });
  };

  return Comanda;
};