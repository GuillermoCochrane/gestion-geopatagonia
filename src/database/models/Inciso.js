module.exports = function(sequelize, DataTypes) {
  let alias = 'Inciso';

  let cols = {
    id: {
       // ID del rol, clave primaria autoincremental
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    inciso: {
      // nombre del inciso, obligatorio
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El inciso no puede estar vacio.',
        },
        len: {
          args: [1, 20],
          msg: 'El inciso debe tener entre 1 y 20 caracteres.',
        },
      }
    },

    descripcion: {
      // Descripción del formulario, máximo 100 caracteres
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: {
          args: [1, 100],
          msg: 'La descripción del inciso debe tener entre 1 y 100 caracteres.',
        },
      },
      defaultValue: "-",
    },

      formulario_id: {
        // ID del formulario al que pertenece el inciso, obligatorio
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El inciso debe pertenecer a un formulario.',
          },
        },
      },
    };

  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
    tableName: 'incisos'
  };

  const Inciso = sequelize.define(alias, cols, config);

  Inciso.associate = function (models) {
    Inciso.belongsTo(models.Formulario, {
      // Un inciso puede pertenecer a un formulario
      as: 'formulario',
      foreignKey: 'formulario_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Inciso.hasMany(models.ObservacionPAC, {
      // Una inciso puede pertenecer a varias observaciones
      as: 'observaciones_pacs',
      foreignKey: 'inciso_id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  };

  return Inciso;
}