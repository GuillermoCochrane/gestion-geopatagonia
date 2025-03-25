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
// validaciones de formularios de originaciones
const originacionValidation = require("../middlewares/validations/originaciones/OriginacionValidationMDW");
// validaciones de formularios de observaciones o PACs
const obsPACValidation = require("../middlewares/validations/originaciones/obsPACValidationMDW");

//* Rutas

router.get('/', originacionesController.originaciones);
router.post('/', upload.single("adjunto"), originacionValidation, originacionesController.nuevaOriginacion);
router.post('/observacionPAC', uploading.single("adjunto"), obsPACValidation, originacionesController.nuevaObservacionPAC);
router.get('/:id', originacionesController.originacion); //Proximo paso, agregar validaciones

module.exports = router;