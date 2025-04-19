const { body } = require("express-validator");

const accionValidation = [
  body("ejecutor_id")
    .notEmpty().withMessage("Debe seleccionar el ejecutor").bail()
    .toInt()
    .isInt({ min: 1 }).withMessage("Debe seleccionar un ejecutor válido"),
  body("accion")
    .notEmpty().withMessage("Debe completar la acción").bail()
    .isLength({ min: 2 }).withMessage("La acción debe tener al menos 2 caracteres").bail()
    .isLength({ max: 300 }).withMessage("La acción no puede tener más de 300 caracteres"),
];

module.exports = accionValidation;