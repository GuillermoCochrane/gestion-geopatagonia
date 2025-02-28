const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

router.get('/', tasksController.index);
router.get('/originacion', tasksController.originacion);

module.exports = router;
