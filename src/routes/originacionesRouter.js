const express = require('express');
const router = express.Router();
const originacionesController = require('../controllers/originacionesController');

//* Middlewares

//? Multer
const upload = require("../middlewares/multer/originacionMulterMDW");

//? Validaciones
const originacionValidation = require("../middlewares/validations/task/OriginacionValidationMDW");

//* Rutas

router.get('/', originacionesController.originaciones);
router.post('/', upload.single("adjunto"), originacionValidation, originacionesController.nuevaOriginacion);
router.get('/:id', originacionesController.originacion);

module.exports = router;