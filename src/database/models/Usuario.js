module.exports = function(sequelize, DataTypes) {

  let alias = 'Usuario';

  let cols = {
    id: {
       // ID del usuario, clave primaria autoincremental
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    nombre: {
      // Nombre del usuario, máximo 100 caracteres
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'El nombre del usuario debe tener entre 1 y 100 caracteres.',
        },
        notEmpty: {
          msg: 'El campo "nombre" no puede estar vacío.',
        },
      },
    },

    email: {
      // Email del usuario, máximo 50 caracteres
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [1, 50],
          msg: 'El email del usuario debe tener entre 1 y 50 caracteres.',
        },
        notEmpty: {
          msg: 'El campo "email" no puede estar vacío.',
        },
        isEmail: {
          msg: 'El campo "email" no es un email válido.',
        },
      },
    },

    password: {
      // Contraseña del usuario, máximo 70 caracteres
      type: DataTypes.STRING(70),
      allowNull: false,
      validate: {
        len: {
          args: [8, 70], // deberia ser [60, 60] porque utilizamos bcrypt
          msg: 'La contraseña del usuario debe tener entre 8 y 70 caracteres.',
        },
        notEmpty: {
          msg: 'El campo "password" no puede estar vacío.',
        },
      },
    },

    rol_id: {
      // ID del rol del usuario, opcional
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
    },
  };

  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
    tableName: 'usuarios'
  };

  const Usuario = sequelize.define(alias, cols, config);

  Usuario.associate = function (models) {
    Usuario.belongsTo(  models.Rol, {
      // Una usuario puede tener un solo rol
      as: 'rol',
      foreignKey: 'rol_id',
      onDelete: 'RESTRICT',
      onUpdate: 'NO ACTION'
    });
  };

  return Usuario;
};