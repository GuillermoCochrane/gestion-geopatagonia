const express = require('express');
const router = express.Router();
const originacionesController = require('../controllers/originacionesController');

//* Middlewares

//? Multer
// multer de adjuntos de originaciones
const upload = require("../middlewares/multer/originacionMulterMDW");
// multer de adjuntos de observaciones o PACs
const uploading = require("../middlewares/multer/obsPACMulterMDW");

//? Validaciones
const originacionValidation = require("../middlewares/validations/task/OriginacionValidationMDW");

//* Rutas

router.get('/', originacionesController.originaciones);
router.post('/', upload.single("adjunto"), originacionValidation, originacionesController.nuevaOriginacion);
router.post('/observacionPAC', uploading.single("adjunto"), originacionValidation, originacionesController.nuevaObservacionPAC);
router.get('/:id', originacionesController.originacion);

module.exports = router;