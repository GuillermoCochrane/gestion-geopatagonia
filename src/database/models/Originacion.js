module.exports = function(sequelize, DataTypes) {

  let alias = 'Originacion';

  let cols = {
    id: {
       // ID de la originación, clave primaria autoincremental
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    fecha_de_observacion: {
      // Fecha de la observación, obligatorio
      type: DataTypes.DATE,
      allowNull: false,
    },
    
    lugar: {
      // Lugar de la observación, máximo 60 caracteres, obligatorio
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: {
          args: [1, 60],
          msg: 'El lugar de la observación debe tener entre 1 y 60 caracteres.',
        },
        notEmpty: {
          msg: 'El campo "lugar" no puede estar vacío.',
        },
      },
    },

    ente_inspector_id: {
      // ID del ente inspector al que pertenece la observación, obligatorio
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    origen_id: {
      // ID del origen al que pertenece la observación, obligatorio
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    observador_id: {
      // ID del observador al que pertenece la observación, obligatorio
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    sector_id: {
      // ID del sector al que pertenece la observación, obligatorio
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    estado_id: {
      // ID del estado al que pertenece la observación, obligatorio
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  };

  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
    tableName: 'originaciones'
  };

  const Originacion = sequelize.define(alias, cols, config);

  Originacion.associate = function (models) {

    Originacion.belongsTo(models.Usuario, {
      // Una originación puede tener a un solo usuario (como observador)
      as: 'observador',
      foreignKey: 'observador_id',
      onDelete: 'RESTRICT',
      onUpdate: 'NO ACTION'
    });

    Originacion.belongsTo(models.Estado, {
      // Una originación puede tener a un solo estado
      as: 'estado',
      foreignKey: 'estado_id',
      onDelete: 'RESTRICT',
      onUpdate: 'NO ACTION'
    });

    Originacion.belongsTo(models.EnteInspector, {
      // Una originación puede tener a un solo ente inspector
      as: 'ente_inspector',
      foreignKey: 'ente_inspector_id',
      onDelete: 'RESTRICT',
      onUpdate: 'NO ACTION'
    });

    Originacion.belongsTo(models.Origen, {
      // Una originación puede tener a un solo origen
      as: 'origen',
      foreignKey: 'origen_id',
      onDelete: 'RESTRICT',
      onUpdate: 'NO ACTION'
    });

    Originacion.hasMany(models.ObservacionPAC, {
      // Una observación puede tener muchas observaciones
      as: 'observaciones_pacs',
      foreignKey: 'originacion_id',
      onDelete: 'RESTRICT',
      onUpdate: 'NO ACTION'
    });

  };

  return Originacion;
};