const { body } = require("express-validator");

const responsableValidation = [
  body("responsable_id")
    .notEmpty().withMessage("Debe seleccionar el responsable").bail()
    .toInt()
    .isInt({ min: 1 }).withMessage("Debe seleccionar un responsable válido"),
];

module.exports = responsableValidation;