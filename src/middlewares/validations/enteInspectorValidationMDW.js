const{body} = require("express-validator");
const enteInspectorValidationMDW = [
    body("ente_inspector")
      .notEmpty().withMessage("Debe completar el campo Ente Inspector").bail()
      .isLength({min: 2}).withMessage("El campo Ente Inspector no puede tener menos de 2 caracteres").bail()
      .isLength({max: 100}).withMessage("El campo Ente Inspector no puede tener más de 100 caracteres")
];

module.exports = enteInspectorValidationMDW;