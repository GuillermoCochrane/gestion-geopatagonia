module.exports = function(sequelize, DataTypes) {
  let alias = 'Rol';

  let cols = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    rol: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: [1, 60],
        notEmpty: true,
      },
    },
  };

  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
  };

  const Rol = sequelize.define(alias, cols, config);

  return Rol;
}