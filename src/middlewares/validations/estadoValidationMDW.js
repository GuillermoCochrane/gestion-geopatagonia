const{body} = require("express-validator");
const estadoValidationMDW = [
    body("nombre")
      .notEmpty().withMessage("Debe completar el campo nombre").bail()
      .isLength({min: 2}).withMessage("El campo nombre no puede tener menos de 2 caracteres").bail()
      .isLength({max: 60}).withMessage("El campo nombre no puede tener más de 60 caracteres"),
    body("descripcion")
      .isLength({max: 300}).withMessage("El campo descripcion no puede tener más de 300 caracteres")
];

module.exports = estadoValidationMDW;