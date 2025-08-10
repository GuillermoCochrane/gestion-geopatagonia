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
const loggeMDW = require("../middlewares/access/loggedMDW");
const guestMDW = require("../middlewares/access/guestMDW");


//* Rutas
router.get('/', loggeMDW, usuariosController.index);
router.get('/login', guestMDW, usuariosController.login);
router.post('/login', guestMDW, loginValidations, usuariosController.processLogin);
router.get('/logged', usuariosController.logged);
router.post('/logout', loggeMDW, usuariosController.logout);
router.get('/recovery', guestMDW, usuariosController.recovery);
router.post('/recovery', guestMDW, recoveryValidations, usuariosController.processRecovery);
router.get('/recovery/:token', guestMDW, tokenAccessMDW, usuariosController.tokenValidation);
router.get('/validate', guestMDW, tokenAccessMDW, usuariosController.validateToken);
router.post('/validate', guestMDW, tokenAccessMDW, tokenValidations, usuariosController.tokenValidation);
router.get('/newPassword', guestMDW, tokenAccessMDW, validTokenAccessMDW, usuariosController.newPassword);
router.post('/newPassword', guestMDW, tokenAccessMDW, validTokenAccessMDW, passwordValidationMDW, usuariosController.setNewPassword);
module.exports = router;