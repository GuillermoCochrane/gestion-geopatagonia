const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

//Middlewares

// Multer
const upload = require("../middlewares/multer/originacionMulterMDW");

router.get('/', tasksController.index);
router.get('/originacion', tasksController.originacion);
router.post('/originacion/nueva', upload.single("adjunto"), tasksController.nuevaOriginacion);

module.exports = router;