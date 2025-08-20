const{body} = require("express-validator");
const userUtilties = require("../../../utilities/usuarioUtilities");
const emailValidationMDW = [
    body("oldEmail")
      .trim()
      .notEmpty().withMessage("El email actual es obligatorio").bail()
      .isEmail().withMessage("Debe ser un email válido").bail()
      .isLength({min: 6}).withMessage("El email no puede tener menos de 6 caracteres").bail()
      .isLength({max: 100}).withMessage("El email no puede tener más de 100 caracteres").bail()
      .custom(async(value, { req }) => {
        const idFromSession = req.session.user;
        if (!idFromSession) throw new Error("No se encuentra sesión");

        const user = await userUtilties.getUserFromEncryptedID(idFromSession);
        if (!user) throw new Error("No se encuentra usuario");

        if (user.email.toLowerCase() !== (value.toLowerCase())) {
          throw new Error("El email actual no coincide con el usuario logueado");
        }
        return true;
      }),
  body("email")
    .trim()
    .notEmpty().withMessage("El nuevo email es obligatorio").bail()
    .isEmail().withMessage("Debe ser un email válido").bail()
    .isLength({min: 6}).withMessage("El email no puede tener menos de 6 caracteres").bail()
    .isLength({max: 100}).withMessage("El email no puede tener más de 100 caracteres").bail()
    .custom((value, { req }) => {
      if (value === req.body.oldEmail) {
        throw new Error("El nuevo email no puede ser igual al actual");
      }
      return true;
    }),
  body("check")
    .trim()
    .notEmpty().withMessage("Debes confirmar el nuevo email").bail()
    .custom((value, {req}) => {
        if (value !== req.body.email) {
          throw new Error("Los emails no coinciden");
        }
        return true;
    })
];

module.exports = emailValidationMDW;