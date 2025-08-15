const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarioController');

//* Middlewares

//? Validaciones
const loginValidations = require("../middlewares/validations/usuario/loginValidationsMDW");
const recoveryValidations = require("../middlewares/validations/usuario/recoveryValidationsMDW");
const tokenValidations = require("../middlewares/validations/usuario/tokenValidations");
const passwordValidationMDW = require("../middlewares/validations/dashboard/passwordValidationMDW");
const emailValidationMDW = require("../middlewares/validations/usuario/emailValidationMDW");

//? Acceso
const tokenAccessMDW = require("../middlewares/access/usuario/tokenAccessMDW");
const validTokenAccessMDW = require("../middlewares/access/usuario/validTokenAccessMDW");
const loggedMDW = require("../middlewares/access/loggedMDW");
const guestMDW = require("../middlewares/access/guestMDW");


//* Rutas
router.get('/', loggedMDW, usuariosController.index);
router.get('/login', guestMDW, usuariosController.login);
router.post('/login', guestMDW, loginValidations, usuariosController.processLogin);
router.get('/logged', usuariosController.logged);
router.post('/logout', loggedMDW, usuariosController.logout);
router.get('/recovery', guestMDW, usuariosController.recovery);
router.post('/recovery', guestMDW, recoveryValidations, usuariosController.processRecovery);
router.get('/recovery/:token', guestMDW, tokenAccessMDW, usuariosController.tokenValidation);
router.get('/validate', guestMDW, tokenAccessMDW, usuariosController.validateToken);
router.post('/validate', guestMDW, tokenAccessMDW, tokenValidations, usuariosController.tokenValidation);
router.get('/newPassword', guestMDW, tokenAccessMDW, validTokenAccessMDW, usuariosController.newPassword);
router.post('/newPassword', guestMDW, tokenAccessMDW, validTokenAccessMDW, passwordValidationMDW, usuariosController.setNewPassword);
router.get('/password', loggedMDW, usuariosController.password);
router.post('/setPassword', loggedMDW, passwordValidationMDW, usuariosController.setPassword);
router.get('/email', loggedMDW, usuariosController.email);
router.post('/setEmail', loggedMDW, emailValidationMDW, usuariosController.processEmail);
router.get('/email/:token', loggedMDW, usuariosController.validateEmail);
router.get('/emailValidation', loggedMDW, usuariosController.validateEmail);
module.exports = router;