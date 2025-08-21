const express = require("express");
const router = express.Router();
const utilitiesAPIController = require("../../controllers/API/utilitiesAPIController");

// Permisos con middlewares de roles para mas adelante

//! Rutas
//? Endpoint para comprobar si el email ya esta en uso
router.get("/inUseEmail/:email/:id?", utilitiesAPIController.checkEmail);

//? Endpoint para eliminar organizaciones sin observaciones / PACs
router.delete("/deleteOrigination/:id", utilitiesAPIController.deleteOrigination);

//? Endpoint para consultar incisos de formularios
router.get("/incisos/:id", utilitiesAPIController.incisos);

//? Endpoint para comprobar si el email del usuario actual es el mismo que el que se envió en el formulario
router.get("/currentEmail/:email", utilitiesAPIController.currentEmail);

module.exports = router;