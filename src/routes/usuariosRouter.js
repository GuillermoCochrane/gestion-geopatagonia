const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarioController');

//* Middlewares

//? Validaciones
const loginValidations = require("../middlewares/validations/usuario/loginValidationsMDW");
const recoveryValidations = require("../middlewares/validations/usuario/recoveryValidationsMDW");
const tokenValidations = require("../middlewares/validations/usuario/tokenValidations");


//* Rutas
router.get('/', usuariosController.index);
router.get('/login', usuariosController.login);
router.post('/login', loginValidations, usuariosController.processLogin);
router.get('/logged', usuariosController.logged);
router.post('/logout', usuariosController.logout);
router.get('/recovery', usuariosController.recovery);
router.post('/recovery', recoveryValidations, usuariosController.processRecovery);
router.get('/validate', usuariosController.validateToken);
router.post('/validate', tokenValidations, usuariosController.tokenValidtion);
module.exports = router;