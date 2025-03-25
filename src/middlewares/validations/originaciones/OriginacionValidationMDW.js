const { body } = require("express-validator");
const path = require("path");

const originacionValidationMDW = [
    body("fecha_de_observacion")
      .notEmpty().withMessage("Debe completar la fecha").bail()
      .isDate().withMessage("La fecha debe ser válida"),
    body("lugar")
      .notEmpty().withMessage("Debe completar el lugar").bail()
      .isLength({min: 2}).withMessage("El lugar debe ser de al menos de 2 caracteres").bail()
      .isLength({max: 60}).withMessage("El lugar no puede tener más de 60 caracteres"),
    body("origen_id")
      .notEmpty().withMessage("Debe seleccionar el origen").bail()
      .toInt()
      .isInt({ min: 1 }).withMessage("Debe seleccionar un origen válido"),
    body("observador_id")
      .notEmpty().withMessage("Debe seleccionar el observador").bail()
      .toInt()
      .isInt({ min: 1 }).withMessage("Debe seleccionar un observador válido"),
    body("ente_inspector_id")
      .notEmpty().withMessage("Debe seleccionar el ente inspector").bail()
      .toInt()
      .isInt({ min: 1 }).withMessage("Debe seleccionar un ente inspector válido"),
    body("sector_id")
      .notEmpty().withMessage("Debe seleccionar el sector").bail()
      .toInt()
      .isInt({ min: 1 }).withMessage("Debe seleccionar un sector válido"),
    body("adjunto")
      .custom((value, { req }) => {
        if (req.file) {
          const allowed = [".png", ".jpg", ".pdf"];
          const extension = path.extname(req.file.originalname).toLowerCase();
          const msg = allowed
              .map((ext) => `"${ext}"`) // Agregar comillas a cada extensión
              .join(", ") // Unir con comas
              .replace(/, ([^,]*)$/, " y $1"); // Agrega "y" antes de la última extensión
          if (!allowed.includes(extension)) {
            throw new Error(`Solo se permiten archivos ${msg}`);
          }
        }
        return true;
      }),
];

module.exports = originacionValidationMDW;