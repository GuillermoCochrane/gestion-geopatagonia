const { body } = require("express-validator");

const confirmEmailValidationsMDW = [
  body("token")
    .notEmpty().withMessage("Debe ingresar su token de confirmación").bail()
    .trim()
    .custom(async (token, { req }) => {
      const cookie = req.cookies.oldEncrypted ? req.cookies.oldEncrypted.trim() : null;
      if (cookie != token) throw new Error("Token de confirmación inválido");
      return true;
    }),
];

module.exports = confirmEmailValidationsMDW;