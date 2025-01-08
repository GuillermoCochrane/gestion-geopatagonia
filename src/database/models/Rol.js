module.exports = function(sequelize, DataTypes) {
  let alias = 'Rol';

  let cols = {
    id: {
       // ID del rol, clave primaria autoincremental
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    rol: {
      // Nombre del rol, máximo 60 caracteres
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: {
          args: [1, 60],
          msg: 'El nombre del sector debe tener entre 1 y 60 caracteres.',
        },
        notEmpty: {
          msg: 'El campo rol no puede estar vacío.',
        },
      },
    },
  };

  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
    tableName: 'roles'
  };

  const Rol = sequelize.define(alias, cols, config);

  return Rol;
}