module.exports = function(sequelize, DataTypes) {

  let alias = 'ObservacionPAC';

  let cols = {
    id: {
       // ID de la observación, clave primaria autoincremental
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    inciso: {
      // Inciso al que pertenece la observación, obligatorio
      type: DataTypes.SMALLINT,
      allowNull: false,
    },

    descripcion: {
      // Descripción de la observación, máximo 300 caracteres, obligatorio
      type: DataTypes.STRING(300),
      allowNull: false,
      validate: {
        len: {
          args: [1, 300],
          msg: 'La descripción de la observación debe tener entre 1 y 300 caracteres.',
        },
        notEmpty: {
          msg: 'El campo "descripcion" no puede estar vacío.',
        },
      },
    },

    fecha_requerida: {
      // Fecha de la observación, obligatorio
      type: DataTypes.DATE,
      allowNull: false,
    },    

    referencia: {
      // Referencia de la observación, máximo 100 caracteres, obligatorio
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'La referencia de la observación debe tener entre 1 y 100 caracteres.',
        },
        notEmpty: {
          msg: 'El campo "referencia" no puede estar vacío.',
        },
      },
    },

    fecha_negociable: {
      // Fecha de negociable, opcional
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },

    requiere_analisis: {
      // Indica si la observación requiere de un análisis, opcional
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },

    responsable_id: {
      // ID del responsable de la observación, opcional
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    originacion_id: {
      // ID de la originación al que pertenece la observación, opcional
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    estado_id: {
      // ID del estado al que pertenece la observación, opcional
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  };

  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
    tableName: 'observaciones_pacs'
  };

  const ObservacionPAC = sequelize.define(alias, cols, config);

  ObservacionPAC.associate = function (models) {
    ObservacionPAC.belongsTo(models.Usuario, {
      // Una observación puede tener a un solo usuario (como responsable)
      as: 'responsable',
      foreignKey: 'responsable_id',
      onDelete: 'RESTRICT',
      onUpdate: 'NO ACTION'
    });
  };

  return ObservacionPAC;
};