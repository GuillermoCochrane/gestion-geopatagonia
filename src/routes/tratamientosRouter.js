const express = require("express");
const router = express.Router();
const tratamientosController = require('../controllers/tratamientosController');

//* Middlewares


//* Rutas 
router.get('/', tratamientosController.index);


module.exports = router;