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
const confirmEmailValidationsMDW = require("../middlewares/validations/usuario/confirmEmailValidationsMDW");

//? Acceso
const tokenAccessMDW = require("../middlewares/access/usuario/tokenAccessMDW");
const validTokenAccessMDW = require("../middlewares/access/usuario/validTokenAccessMDW");
const loggedMDW = require("../middlewares/access/loggedMDW");
const guestMDW = require("../middlewares/access/guestMDW");


//* Rutas
router.get('/', loggedMDW, usuariosController.index);

// Login y logout
router.get('/login', guestMDW, usuariosController.login);
router.post('/login', guestMDW, loginValidations, usuariosController.processLogin);
router.get('/logged', usuariosController.logged);
router.post('/logout', loggedMDW, usuariosController.logout);

// Sitema de recuperacion de contraseña
router.get('/recovery', guestMDW, usuariosController.recovery);
router.post('/recovery', guestMDW, recoveryValidations, usuariosController.processRecovery);
router.get('/recovery/:token', guestMDW, tokenAccessMDW, usuariosController.tokenValidation);
router.get('/validate', guestMDW, tokenAccessMDW, usuariosController.validateToken);
router.post('/validate', guestMDW, tokenAccessMDW, tokenValidations, usuariosController.tokenValidation);
router.get('/newPassword', guestMDW, tokenAccessMDW, validTokenAccessMDW, usuariosController.newPassword);
router.post('/newPassword', guestMDW, tokenAccessMDW, validTokenAccessMDW, passwordValidationMDW, usuariosController.setNewPassword);

// Cambio de contraseña
router.get('/password', loggedMDW, usuariosController.password);
router.post('/setPassword', loggedMDW, passwordValidationMDW, usuariosController.setPassword);

//Sistema de cambio de email
router.get('/email', loggedMDW, usuariosController.email);
router.post('/setEmail', loggedMDW, emailValidationMDW, usuariosController.processEmail); // Procesa cambio de email, genera tokens y envía mail con token de validacion al original
router.get('/emailConfirmation', loggedMDW, usuariosController.emailConfirmation);
router.get('/emailConfirmation/:token', loggedMDW, usuariosController.confirmEmail); // recibe x query token y confirma
router.post('/emailConfirmation', loggedMDW, confirmEmailValidationsMDW, usuariosController.confirmEmail); // procesa el token de confirmación desde el formulario
router.get('/validateEmail/:token', loggedMDW, usuariosController.validateEmail); // recibe x query token y valida, cambia el email y cierra sesión
router.post('/validateEmail', loggedMDW,usuariosController.validateEmail); // procesa el token de validación desde el formulario, cambia el email y cierra sesión

module.exports = router;