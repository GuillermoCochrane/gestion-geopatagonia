const { body } = require("express-validator");
const bcrypt = require("bcryptjs");
const { Usuario } = require("../../../database/models");

const loginValidations = [
  body("email")
    .notEmpty().withMessage("El email es obligatorio").bail()
    .isEmail().withMessage("Debe ser un email válido").bail()
    .custom(async (email, { req }) => {
      const user = await Usuario.findOne({ where: { email } });
      if (!user) throw new Error("Usuario no registrado");
      req.userFromDB = user; // Guardamos el usuario en el request para reutilizarlo
      return true;
    }),

  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria").bail()
    .custom(async (password, { req }) => {
      if (!req.userFromDB) return true; // Si no hay usuario, no comprobamos la contraseña

      const isValid = await bcrypt.compare(password, req.userFromDB.password);
      if (!isValid) throw new Error("Contraseña incorrecta");

      return true;
    }),
];

module.exports = loginValidations;