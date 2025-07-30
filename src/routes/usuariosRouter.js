const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarioController');

//* Middlewares

//? Validaciones
const loginValidations = require("../middlewares/validations/usuario/loginValidationsMDW");


//* Rutas
router.get('/', usuariosController.index);
router.get('/login', usuariosController.login);
router.post('/login', loginValidations, usuariosController.processLogin);
router.get('/logged', usuariosController.logged);
module.exports = router;