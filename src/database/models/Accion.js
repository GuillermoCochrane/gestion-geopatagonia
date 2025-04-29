module.exports = function(sequelize, DataTypes) {

  let alias = 'Accion';

  let cols = {
    id: {
       // ID de la acción, clave primaria autoincremental
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    accion: {
      type: DataTypes.STRING(300),
      allowNull: false,
      validate: {
        len: {
          args: [1, 300],
          msg: 'La acción no puede exceder los 300 caracteres.',
        },
        notEmpty: {
          msg: 'El campo "accion" no puede estar vacío.',
        },
      },
    },

    fecha_realizacion: {
      // Fecha de realización de la acción, obligatorio
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    ejecutor_id: {
      // ID del ejecutor de la acción, obligatorio
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    observacion_pac_id: {
      // ID de la observación al que pertenece la acción, obligatorio
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  }

  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
    tableName: 'acciones'
  };

  const Accion = sequelize.define(alias, cols, config);

  Accion.associate = function (models) {

    Accion.hasMany(models.AdjuntoAccion, {
      // Una acción puede tener muchos adjuntos
      as: 'adjuntos',
      foreignKey: 'accion_id',
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION'
    });

    Accion.belongsTo(models.ObservacionPAC, {
      // Una acción puede pertenecer a una observación
      as: 'observacion_pac',
      foreignKey: 'observacion_pac_id',
      onDelete: 'RESTRICT',
      onUpdate: 'NO ACTION'
    });

    Accion.belongsTo(models.Usuario, {
      // Una acción puede pertenecer a un ejecutor
      as: 'ejecutor',
      foreignKey: 'ejecutor_id',
      onDelete: 'RESTRICT',
      onUpdate: 'NO ACTION'
    });
  };

  return Accion;
};