const express = require("express");
const router = express.Router();
const ejecucionesController = require('../controllers/ejecucionesController');

//* Middlewares


//* Rutas
router.get('/', ejecucionesController.index);


module.exports = router;