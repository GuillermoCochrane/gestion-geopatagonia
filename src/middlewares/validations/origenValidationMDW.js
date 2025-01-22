const{body} = require("express-validator");
const origenValidationMDW = [
    body("origen")
      .notEmpty().withMessage("Debe completar el campo origen").bail()
      .isLength({min: 2}).withMessage("El campo origen no puede tener menos de 2 caracteres").bail()
      .isLength({max: 100}).withMessage("El campo origen no puede tener más de 100 caracteres")
];

module.exports = origenValidationMDW;