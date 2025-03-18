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
router.get('/originacion', tasksController.originacion);
router.post('/originacion/', upload.single("adjunto"), originacionValidation, tasksController.nuevaOriginacion);

module.exports = router;