module.exports = function(sequelize, DataTypes) {

  let alias = 'Origen';

  let cols = {
    id: {
       // ID del origen, clave primaria autoincremental
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    origen: {
      // Nombre del origen, máximo 100 caracteres
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'El nombre del origen debe tener entre 1 y 100 caracteres.',
        },
        notEmpty: {
          msg: 'El campo "origen" no puede estar vacío.',
        },
      },
    },
  };

  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
    tableName: 'origenes'
  };

  const Origen = sequelize.define(alias, cols, config);

  Origen.associate = function (models) {

    Origen.hasMany(models.ObservacionPAC, {
      // Un origen puede tener muchas observaciones
      as: 'originaciones',
      foreignKey: 'origen_id',
      onDelete: 'RESTRICT',
      onUpdate: 'NO ACTION'
    });

  };

  return Origen;
};