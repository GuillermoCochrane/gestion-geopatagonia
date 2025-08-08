const express = require("express");
const router = express.Router();
const observacionesController = require('../controllers/observacionesController');

//* Middlewares


//* Rutas
router.get('/', observacionesController.index);


module.exports = router;