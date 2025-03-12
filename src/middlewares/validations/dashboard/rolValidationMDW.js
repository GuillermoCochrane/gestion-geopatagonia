const{body} = require("express-validator");
const rolValidationMDW = [
    body("rol")
      .notEmpty().withMessage("Debe completar el campo rol").bail()
      .isLength({min: 2}).withMessage("El campo rol no puede tener menos de 2 caracteres").bail()
      .isLength({max: 60}).withMessage("El campo rol no puede tener más de 60 caracteres")
];

module.exports = rolValidationMDW;