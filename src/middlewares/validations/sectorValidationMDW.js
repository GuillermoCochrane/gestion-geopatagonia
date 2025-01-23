const{body} = require("express-validator");
const sectorValidationMDW = [
    body("sector")
      .notEmpty().withMessage("Debe completar el campo sector").bail()
      .isLength({min: 2}).withMessage("El campo sector no puede tener menos de 2 caracteres").bail()
      .isLength({max: 100}).withMessage("El campo sector no puede tener más de 100 caracteres")
];

module.exports = sectorValidationMDW;