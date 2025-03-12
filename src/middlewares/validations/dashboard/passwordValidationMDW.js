const{body} = require("express-validator");
const passwordValidationMDW = [
  body("password")
      .notEmpty().withMessage("Debe completar la contraseña").bail()
      .isLength({min: 8}).withMessage("La contraseña debe tener 8 caracteres como mínimo ").bail()
      .isStrongPassword().withMessage("La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial"),
];

module.exports = passwordValidationMDW;