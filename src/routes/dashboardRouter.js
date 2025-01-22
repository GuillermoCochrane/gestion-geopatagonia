const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

//Middlewares

const rolValidation = require("../middlewares/validations/rolValidationMDW");
const origenValidation = require("../middlewares/validations/origenValidationMDW");


//Rutas
router.get("/", dashboardController.index);

//Estados
router.get("/estados", dashboardController.estados);
router.post("/estados/nuevo", dashboardController.nuevoEstado);

//Roles
router.get("/roles", dashboardController.roles);
router.post("/roles/nuevo", rolValidation, dashboardController.nuevoRol);

//Origines
router.get("/origenes", dashboardController.origenes);
router.post("/origenes/nuevo", origenValidation, dashboardController.nuevoOrigen);

//Sectores
router.get("/sectores", dashboardController.sectores);
router.post("/sectores/nuevo", dashboardController.nuevoSector);

//Entes Inspectores
router.get("/entes_inspectores", dashboardController.inspectores);
router.post("/entes_inspectores/nuevo", dashboardController.nuevoInspector);

//Usuarios
router.get("/usuarios", dashboardController.usuarios);

module.exports = router;