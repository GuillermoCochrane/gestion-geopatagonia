const { body } = require("express-validator");
// middleware para validar que las fechas de inicio sea anterior a la de fin
const dateValidations = [
  body("InicioCarga")
    .optional({ checkFalsy: true })
    .isDate().withMessage("La fecha de inicio debe tener un formato válido").bail()
    .custom((value, { req }) => {
      const { InicioCarga, FinCarga } = req.body;
      if (InicioCarga && FinCarga && new Date(InicioCarga) > new Date(FinCarga)) {
        throw new Error("La fecha de inicio no puede ser mayor que la fecha de fin");
      }
    }),

  body("FinCarga")
    .optional({ checkFalsy: true })
    .isDate().withMessage("La fecha de fin debe tener un formato válido")
];

module.exports = dateValidations;