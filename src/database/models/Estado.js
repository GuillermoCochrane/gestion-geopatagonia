module.exports = function(sequelize, DataTypes) {

  let alias = 'Estado';

  let cols = {
    id: {
       // ID del estado, clave primaria autoincremental
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    estado: {
      // Nombre del estado, máximo 60 caracteres
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: {
          args: [1, 60],
          msg: 'El nombre del estado debe tener entre 1 y 60 caracteres.',
        },
        notEmpty: {
          msg: 'El campo "nombre" no puede estar vacío.',
        },
      },
    },

    descripcion: {
      // Descripción del estado, máximo 300 caracteres, no obligatorio
      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: null,
      validate: {
        len: {
          args: [0, 300],
          msg: 'La descripción del estado debe tener entre 0 y 300 caracteres.',
        },
      },
    },
  };

  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
    tableName: 'estados'
  };

  const Estado = sequelize.define(alias, cols, config);

  Estado.associate = function (models) {
    Estado.hasMany(models.ObservacionPAC, {
      // Un estado puede tener muchas observaciones
      as: 'observaciones_pacs',
      foreignKey: 'estado_id',
      onDelete: 'RESTRICT',
      onUpdate: 'NO ACTION'
    });

    Estado.hasMany(models.Originacion, {
      // Un estado puede tener muchas originaciones
      as: 'originaciones',
      foreignKey: 'estado_id',
      onDelete: 'RESTRICT',
      onUpdate: 'NO ACTION'
    });
  };

  return Estado;
};