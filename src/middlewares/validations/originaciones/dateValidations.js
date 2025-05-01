const { body } = require("express-validator");

const dateValidations = [
  body("inicio_carga")
    .optional({ checkFalsy: true, nullable: true })
    .isDate({ format: 'YYYY-MM-DD', strictMode: true }).withMessage("La fecha de inicio debe tener un formato válido").bail()
    .custom((value, { req }) => {
      const { fin_carga } = req.body;
      const inicio = new Date(value);
      const fin = new Date(fin_carga);

      if (fin_carga && inicio > fin) {
        throw new Error("La fecha de inicio no puede ser mayor que la de fin");
      }
      return true;
    }),

  body("fin_carga")
    .optional({ checkFalsy: true, nullable: true })
    .isDate({ format: 'YYYY-MM-DD', strictMode: true }).withMessage("La fecha de fin debe tener un formato válido")
];

module.exports = dateValidations;
