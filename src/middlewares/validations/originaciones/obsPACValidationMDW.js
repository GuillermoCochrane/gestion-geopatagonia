//Middleware de validaciones el formulario de observaciónes / PACs
const { body } = require("express-validator");
const path = require("path");

const obsPACValidationMDW = [
  body("inciso_id")
    .notEmpty().withMessage("Debe seleccionar el inciso").bail()
    .toInt()
    .isInt({ min: 1 }).withMessage("Debe seleccionar un inciso válido"),
  body("fecha_requerida")
    .notEmpty().withMessage("Debe completar la fecha").bail()
    .isDate().withMessage("La fecha debe ser válida").bail()
    .custom((value) => {
      // Convertir la fecha ingresada de forma correcta en la zona horaria local
      const partesFecha = value.split("-"); // Divide "YYYY-MM-DD" en partes
      const fechaIngresada = new Date(
        parseInt(partesFecha[0]), // Año
        parseInt(partesFecha[1]) - 1, // Mes (JavaScript cuenta desde 0)
        parseInt(partesFecha[2]) // Día
      );
      const fechaActual = new Date();
      // Eliminar la hora en ambas fechas
      fechaIngresada.setHours(0, 0, 0, 0);
      fechaActual.setHours(0, 0, 0, 0);
      // Comparar fechas sin hora
      if (fechaIngresada < fechaActual) {
        throw new Error("La fecha no puede ser anterior a hoy");
      }
      return true;
    }),
  body("responsable_id")
    .notEmpty().withMessage("Debe seleccionar el responsable").bail()
    .toInt()
    .isInt({ min: 1 }).withMessage("Debe seleccionar un responsable válido"),
  body("referencia")
    .if((value, { req }) => req.body.requiere_analisis === "on") // Si `requiere_analisis` esta marcado, entonces `referencia` es obligatoria
    .notEmpty().withMessage("Debe completar la referencia")
    .bail()
    .isLength({ min: 2 }).withMessage("La referencia debe tener al menos 2 caracteres").bail()
    .optional({ nullable: true })// Si `requiere_analisis` es false, el campo es opcional
    .isLength({ max: 100 }).withMessage("La referencia no puede tener más de 100 caracteres"),
  body("descripcion")
    .notEmpty().withMessage("Debe completar la descripción").bail()
    .isLength({ min: 2 }).withMessage("La descripción debe tener al menos 2 caracteres").bail()
    .isLength({ max: 300 }).withMessage("La descripción no puede tener más de 300 caracteres"),
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

module.exports = obsPACValidationMDW;