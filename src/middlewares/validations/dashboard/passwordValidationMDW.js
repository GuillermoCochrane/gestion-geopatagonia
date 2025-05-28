const{body} = require("express-validator");
const passwordValidationMDW = [
  body("password")
      .notEmpty().withMessage("Debe completar la contraseña").bail()
      .isLength({min: 8}).withMessage("La contraseña debe tener 8 caracteres como mínimo ").bail()
      .isStrongPassword().withMessage("La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial"),
  body("check")
      .custom((value, {req}) => {
          if (value !== req.body.password) {
              throw new Error("Las contraseñas no coinciden");
          }
          return true;
      })
];

module.exports = passwordValidationMDW;
