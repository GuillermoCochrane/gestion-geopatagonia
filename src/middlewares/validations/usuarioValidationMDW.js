const { body } = require("express-validator");
const utilities = require("../../utilities/utilities")
const nombreValidationMDW = [
    body("nombre")
      .notEmpty().withMessage("Debe completar el campo nombre").bail()
      .isLength({min: 2}).withMessage("El campo nombre no puede tener menos de 2 caracteres").bail()
      .isLength({max: 100}).withMessage("El campo nombre no puede tener más de 100 caracteres"),
      body("password")
      .notEmpty().withMessage("Debe completar la contraseña").bail()
      .isLength({min: 8}).withMessage("La contraseña debe tener 8 caracteres como mínimo ").bail()
      .isStrongPassword().withMessage("La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial"),
    body("email")
      .notEmpty().withMessage("Debe completar el campo email").bail()
      .isLength({min: 7}).withMessage("El campo email no puede tener menos de 7 caracteres").bail()
      .isLength({max: 50}).withMessage("El campo email no puede tener más de 50 caracteres").bail()
      .isEmail().withMessage("El campo email no es un email válido")
      .custom((value, {req}) =>{
        let user = utilities.checkEmail(value);
        if (user){
            throw new Error(`E-mail no válido`);
        }
        return true
    })
    ];
    
module.exports = nombreValidationMDW;