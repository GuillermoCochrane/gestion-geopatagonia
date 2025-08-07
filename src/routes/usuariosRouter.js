const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarioController');

//* Middlewares

//? Validaciones
const loginValidations = require("../middlewares/validations/usuario/loginValidationsMDW");
const recoveryValidations = require("../middlewares/validations/usuario/recoveryValidationsMDW");
const tokenValidations = require("../middlewares/validations/usuario/tokenValidations");
const passwordValidationMDW = require("../middlewares/validations/dashboard/passwordValidationMDW");

//? Acceso
const tokenAccessMDW = require("../middlewares/access/usuario/tokenAccessMDW");
const validTokenAccessMDW = require("../middlewares/access/usuario/validTokenAccessMDW");


//* Rutas
router.get('/', usuariosController.index);
router.get('/login', usuariosController.login);
router.post('/login', loginValidations, usuariosController.processLogin);
router.get('/logged', usuariosController.logged);
router.post('/logout', usuariosController.logout);
router.get('/recovery', usuariosController.recovery);
router.post('/recovery', recoveryValidations, usuariosController.processRecovery);
router.get('/recovery/:token', tokenAccessMDW, usuariosController.tokenValidation);
router.get('/validate', tokenAccessMDW, usuariosController.validateToken);
router.post('/validate', tokenAccessMDW, tokenValidations, usuariosController.tokenValidation);
router.get('/newPassword', tokenAccessMDW, usuariosController.newPassword);
router.post('/newPassword', tokenAccessMDW, passwordValidationMDW, usuariosController.setNewPassword);
module.exports = router;