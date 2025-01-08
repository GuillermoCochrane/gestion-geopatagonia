module.exports = function(sequelize, DataTypes) {

  let alias = 'Sector';

  let cols = {
    id: {
       // ID del sector, clave primaria autoincremental
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    sector: {
      // Nombre del sector, máximo 100 caracteres
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'El nombre del sector debe tener entre 1 y 100 caracteres.',
        },
        notEmpty: {
          msg: 'El campo sector no puede estar vacío.',
        },
      },
    },
  };

  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
    tableName: 'sectores'
  };

  const Sector = sequelize.define(alias, cols, config);

  return Sector;
};