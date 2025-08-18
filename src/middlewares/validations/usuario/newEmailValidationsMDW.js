const { body } = require("express-validator");

const newEmailValidationsMDW = [
  body("token")
    .notEmpty().withMessage("Debe ingresar su token de validación").bail()
    .trim()
    .custom(async (token, { req }) => {
      const cookie = req.cookies.newEncrypted ? req.cookies.newEncrypted.trim() : null;
      if (cookie != token) throw new Error("Token de validación inválido");
      return true;
    }),
];

module.exports = newEmailValidationsMDW;