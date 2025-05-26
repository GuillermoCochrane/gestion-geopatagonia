const{body} = require("express-validator");
const incisoValidationMDW = [
    body("inciso")
      .notEmpty().withMessage("Debe completar el campo inciso").bail()
      .isLength({min: 1}).withMessage("El campo inciso no puede tener menos de 1 caracteres").bail()
      .isLength({max: 20}).withMessage("El campo inciso no puede tener más de 20 caracteres"),
    body("descripcion")
      .isLength({max: 100}).withMessage("El campo descripcion no puede tener más de 100 caracteres"),
    body("formulario_id")
      .notEmpty().withMessage("Debe seleccionar un formulario").bail()
];

module.exports = incisoValidationMDW;