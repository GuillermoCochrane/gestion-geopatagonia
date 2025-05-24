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
      type: DataTypes.STRING(5),
      allowNull: true,
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
      allowNull: true,
      validate: {
        len: {
          args: [0, 100],
          msg: 'La referencia de la observación no puede exceder los 100 caracteres.',
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
      // ID del responsable de la observación
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    originacion_id: {
      // ID de la originación al que pertenece la observación
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    estado_id: {
      // ID del estado al que pertenece la observación
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    inciso_id: {
      // ID del inciso al que pertenece la observación, opcional
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true, 
    }
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

    ObservacionPAC.belongsTo(models.Estado, {
      // Una observación puede tener a un solo estado
      as: 'estado',
      foreignKey: 'estado_id',
      onDelete: 'RESTRICT',
      onUpdate: 'NO ACTION'
    });

    ObservacionPAC.belongsTo(models.Originacion, {
      // Una observación puede tener a un solo origen
      as: 'originacion',
      foreignKey: 'originacion_id',
      onDelete: 'RESTRICT',
      onUpdate: 'NO ACTION'
    });

    ObservacionPAC.belongsTo(models.Inciso, {
      // Una observación puede tener a un solo inciso de formulario
      as: 'inciso_formulario',
      foreignKey: 'inciso_id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    ObservacionPAC.hasMany(models.AdjuntoObservacionPAC, {
      // Una observación puede tener muchos adjuntos
      as: 'adjuntos',
      foreignKey: 'observacion_pac_id',
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION'
    });
    
    ObservacionPAC.hasMany(models.Accion, {
      // Una observación puede tener muchas acciones
      as: 'acciones',
      foreignKey: 'observacion_pac_id',
      onDelete: 'RESTRICT',
      onUpdate: 'NO ACTION'
    });
  };

  return ObservacionPAC;
};