const express = require("express");
const router = express.Router();
const utilitiesAPIController = require("../../controllers/API/utilitiesAPIController");

// Permisos con middlewares de roles para mas adelante

//! Rutas
//? Endpoint para comprobar si el email ya esta en uso
router.get("/inUseEmail/:email/:id?", utilitiesAPIController.checkEmail);

//? Endpoint para eliminar organizaciones sin observaciones / PACs
router.delete("/deleteOrigination/:id", utilitiesAPIController.deleteOrigination);

module.exports = router;