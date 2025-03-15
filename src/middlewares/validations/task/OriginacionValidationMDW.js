const { body } = require("express-validator");
const path = require("path");

const originacionValidationMDW = [
    body("fecha_de_observacion")
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
    
        console.log("Fecha ingresada (original):", value);
        console.log("Fecha ingresada (reconstruida en local):", fechaIngresada.toISOString());
    
        // Eliminar la hora en ambas fechas
        fechaIngresada.setHours(0, 0, 0, 0);
        fechaActual.setHours(0, 0, 0, 0);
    
        console.log("Fecha ingresada (sin hora local):", fechaIngresada.toISOString());
        console.log("Fecha actual (sin hora local):", fechaActual.toISOString());
    
        // Comparar fechas sin hora
        if (fechaIngresada < fechaActual) {
            throw new Error("La fecha no puede ser anterior a hoy");
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