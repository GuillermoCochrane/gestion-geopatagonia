const express = require("express");
const router = express.Router();
const utilitiesAPIController = require("../../controllers/API/utilitiesAPIController");

//Rutas
router.get("/inUseEmail/:email", utilitiesAPIController.checkEmail);

module.exports = router;