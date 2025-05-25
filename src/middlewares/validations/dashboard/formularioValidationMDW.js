const{body} = require("express-validator");
const formularioValidationMDW = [
    body("codigo")
      .notEmpty().withMessage("Debe completar el campo código").bail()
      .isLength({min: 2}).withMessage("El campo código no puede tener menos de 2 caracteres").bail()
      .isLength({max: 20}).withMessage("El campo código no puede tener más de 20 caracteres"),
    body("descripcion")
      .isLength({max: 100}).withMessage("El campo descripcion no puede tener más de 100 caracteres")
];

module.exports = formularioValidationMDW;