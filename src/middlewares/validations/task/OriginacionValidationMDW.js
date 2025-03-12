const{body} = require("express-validator");
const originacionValidationMDW = [
    body("fecha_de_observacion")
      .notEmpty().withMessage("Debe completar la fecha").bail()
      .isDate().withMessage("La fecha debe ser válida").bail()
      .custom((value) => {
        const fechaIngresada = new Date(value);
        const fechaActual = new Date();
        // Comparar solo la fecha (ignorando la hora)
        fechaActual.setHours(0, 0, 0, 0);
        if (fechaIngresada < fechaActual) {
          throw new Error('La fecha no puede ser anterior a hoy');
        }
        return true;
      }),
    body("lugar")
      .notEmpty().withMessage("Debe completar el lugar").bail()
      .isLength({min: 2}).withMessage("El lugar debe ser de al menos de 2 caracteres").bail()
      .isLength({max: 60}).withMessage("El lugar no puede tener más de 60 caracteres"),
    body("origen_id")
      .notEmpty().withMessage("Debe seleccionar el origen").bail()
      .isInt({ min: 1 }).withMessage("Debe seleccionar un origen válido"),
    body("observador_id")
      .notEmpty().withMessage("Debe seleccionar el observador").bail()
      .isInt({ min: 1 }).withMessage("Debe seleccionar un observador válido"),
    body("ente_insperctor_id")
      .notEmpty().withMessage("Debe seleccionar el ente inspector").bail()
      .isInt({ min: 1 }).withMessage("Debe seleccionar un ente inspector válido"),
    body("sector_id")
      .notEmpty().withMessage("Debe seleccionar el sector").bail()
      .isInt({ min: 1 }).withMessage("Debe seleccionar un sector válido"),
    body("adjunto")
      .notEmpty().withMessage("Debe seleccionar el adjunto").bail(),
];

module.exports = originacionValidationMDW;