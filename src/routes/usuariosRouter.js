const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarioController');

//* Middlewares

//* Rutas

router.get('/', usuariosController.index);
router.get('/login', usuariosController.login);
router.post('/login', usuariosController.processLogin);

module.exports = router;