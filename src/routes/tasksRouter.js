const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

//* Middlewares

//? Multer
const upload = require("../middlewares/multer/originacionMulterMDW");

//? Validaciones
const originacionValidation = require("../middlewares/validations/task/OriginacionValidationMDW");

//* Rutas

router.get('/', tasksController.index);
router.get('/originacion', tasksController.originaciones);
router.post('/originacion', upload.single("adjunto"), originacionValidation, tasksController.nuevaOriginacion);
router.get('/originacion/:id', tasksController.originacion);

module.exports = router;