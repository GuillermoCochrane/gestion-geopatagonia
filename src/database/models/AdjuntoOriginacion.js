module.exports = function(sequelize, DataTypes) {

  let alias = 'AdjuntoOriginacion';

  let cols = {
    id: {
       // ID del adjunto, clave primaria autoincremental
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    nombre: {
      // Nombre del adjunto, máximo 100 caracteres
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'El nombre del adjunto debe tener entre 1 y 100 caracteres.',
        },
        notEmpty: {
          msg: 'El campo "nombre" no puede estar vacío.',
        },
      },
    },    

    archivo: {
      // Ubicación del archivo adjunto, máximo 200 caracteres
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: {
          args: [1, 200],
          msg: 'La ubicación del archivo adjunto debe tener entre 1 y 200 caracteres.',
        },
        notEmpty: {
          msg: 'El campo "archivo" no puede estar vacío.',
        },
      },
    },

    descripcion: {
      // Descripción del adjunto, máximo 300 caracteres, no obligatorio
      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: "-",
      validate: {
        len: {
          args: [0, 300],
          msg: 'La descripción del adjunto debe tener entre 0 y 300 caracteres.',
        },
      },
    },

    originacion_id: {
      // ID de la originación al que pertenece el adjunto, obligatorio
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  };

  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
    tableName: 'adjuntos_originaciones'
  };

  const AdjuntoOriginacion = sequelize.define(alias, cols, config);

  return AdjuntoOriginacion;
};  