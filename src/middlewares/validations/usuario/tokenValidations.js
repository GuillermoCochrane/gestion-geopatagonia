const { body } = require("express-validator");

const recoveryValidationsMDW = [
  body("token")
    .notEmpty().withMessage("Debe ingresar su token de recuperación").bail()
    .trim()
    .custom(async (token, { req }) => {
      const cookie = req.cookies.token ? req.cookies.token.trim() : null;
      if (cookie != token) throw new Error("Token de recuperación inválido");
      return true;
    }),
];

module.exports = recoveryValidationsMDW;