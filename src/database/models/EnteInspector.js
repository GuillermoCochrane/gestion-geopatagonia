module.exports = function(sequelize, DataTypes) {

  let alias = 'EnteInspector';

  let cols = {
    id: {
       // ID del ente inspector, clave primaria autoincremental
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    ente_inspector: {
      // Nombre del ente inspector, máximo 100 caracteres
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'El nombre del ente inspector debe tener entre 1 y 100 caracteres.',
        },
        notEmpty: {
          msg: 'El campo "ente_inspector" no puede estar vacío.',
        },
      },
    },
  };

  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
    tableName: 'entes_inspectores'
  };

  const EnteInspector = sequelize.define(alias, cols, config);

  return EnteInspector;
};