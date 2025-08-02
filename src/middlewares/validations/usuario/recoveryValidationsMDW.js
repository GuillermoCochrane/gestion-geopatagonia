const { body } = require("express-validator");
const { Usuario } = require("../../../database/models");

const recoveryValidationsMDW = [
  body("rol_id")
    .notEmpty().withMessage("Debe seleccionar un rol").bail()
    .toInt()
    .isInt({ min: 1 }).withMessage("Debe seleccionar un rol válido"),
  body("email")
    .notEmpty().withMessage("El email es obligatorio").bail()
    .isEmail().withMessage("Debe ser un email válido").bail()
    .custom(async (email, { req }) => {
      const user = await Usuario.findOne({ where: { email, rol_id: req.body.rol_id } });
      if (!user) throw new Error("Credenciales inválidas");
      return true;
    }),
];

module.exports = recoveryValidationsMDW;