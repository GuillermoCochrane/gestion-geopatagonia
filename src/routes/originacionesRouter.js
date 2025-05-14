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
// validaciones de formularios  cambio de responsables
const responsableValidation = require("../middlewares/validations/originaciones/responsableValidation");
// validaciones de formularios de acciones
const accionValidation = require("../middlewares/validations/originaciones/accionValidation");
//validaciones de fechas de carga
const dateValidations = require("../middlewares/validations/originaciones/dateValidations");

//* Rutas

router.get('/', originacionesController.originaciones);
router.post('/', upload.single("adjunto"), originacionValidation, originacionesController.nuevaOriginacion);
router.put('/edit/:id', uploading.single("adjunto"), originacionValidation, originacionesController.editarOriginacion);
router.post('/filtrar', dateValidations, originacionesController.filtrar);
router.get('/observacionPAC', originacionesController.observacionesPACs); // Ruta de prueba
router.post('/observacionPAC', uploading.single("adjunto"), obsPACValidation, originacionesController.nuevaObservacionPAC);
router.put('/observacionPAC/edit/:id', uploading.single("adjunto"), obsPACValidation, originacionesController.editarPAC);
router.get('/observacionPAC/pdf/:id', originacionesController.observacionPacPdf);
router.post('/observacionPAC/addAction/:id', accionValidation, originacionesController.agregarAccion);
router.post('/observacionPAC/export/:id',  originacionesController.exportar);
router.put('/observacionPAC/modify/:id', responsableValidation, originacionesController.modificarResponsablePAC);
router.put('/observacionPAC/reopen/:id', responsableValidation, originacionesController.reabrirPac);
router.get('/observacionPAC/:id/:accion?', originacionesController.observacionPAC);
router.get('/:id', originacionesController.originacion);

module.exports = router;