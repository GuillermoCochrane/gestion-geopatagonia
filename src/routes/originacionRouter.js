const express = require('express');
const router = express.Router();
const orginacionController = require('../controllers/orginiacionController');

router.get('/', orginacionController.index);

module.exports = router;
