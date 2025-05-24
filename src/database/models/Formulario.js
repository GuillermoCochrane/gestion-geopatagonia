module.exports = function(sequelize, DataTypes) {
  let alias = 'Formulario';

  let cols = {
    id: {
       // ID del rol, clave primaria autoincremental
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    codigo: {
      // Código del formulario, máximo 20 caracteres
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: {
          args: [1, 20],
          msg: 'El código del formulario debe tener entre 1 y 20 caracteres.',
        },
        notEmpty: {
          msg: 'El codigo del formulario no puede estar vacío.',
        },
      },
    },

  descripcion: {
    // Descripción del formulario, máximo 100 caracteres
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: {
        args: [1, 100],
        msg: 'La descripción del formulario debe tener entre 1 y 100 caracteres.',
      },
    },
    defaultValue: "-",
  },
};

  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
    tableName: 'formularios'
  };

  const Formulario = sequelize.define(alias, cols, config);

  Formulario.associate = function (models) {
    Formulario.hasMany(models.Inciso, {
      // Una formulario puede tener muchos incisos
      as: 'incisos',
      foreignKey: 'formulario_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Formulario.hasMany(models.Originacion, {
      // Una formulario puede tener muchas originaciones
      as: 'originaciones',
      foreignKey: 'formulario_id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  };

  return Formulario;
}