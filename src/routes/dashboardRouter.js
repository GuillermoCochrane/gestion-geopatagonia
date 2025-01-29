const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

//Middlewares
const estadosValidation = require("../middlewares/validations/estadoValidationMDW");
const rolValidation = require("../middlewares/validations/rolValidationMDW");
const origenValidation = require("../middlewares/validations/origenValidationMDW");
const sectorValidation = require("../middlewares/validations/sectorValidationMDW");
const enteValidation = require("../middlewares/validations/enteInspectorValidationMDW");

//Rutas
router.get("/", dashboardController.index);

//Estados
router.get("/estados", dashboardController.estados);
router.post("/estados/nuevo", estadosValidation, dashboardController.nuevoEstado);
router.get("/estados/editar/:id", dashboardController.estado);
router.put("/estados/editar/:id", estadosValidation, dashboardController.editarEstado);
router.get("/estados/eliminar/:id", dashboardController.eliminarEstado);

//Roles
router.get("/roles", dashboardController.roles);
router.post("/roles/nuevo", rolValidation, dashboardController.nuevoRol);
router.get("/roles/editar/:id", dashboardController.rol);
router.put("/roles/editar/:id", rolValidation, dashboardController.editarRol);
router.get("/roles/eliminar/:id", dashboardController.eliminarRol);

//Origines
router.get("/origenes", dashboardController.origenes);
router.post("/origenes/nuevo", origenValidation, dashboardController.nuevoOrigen);
router.get("/origenes/editar/:id", dashboardController.origen);
router.put("/origenes/editar/:id", origenValidation, dashboardController.editarOrigen);
router.get("/origenes/eliminar/:id", dashboardController.eliminarOrigen);

//Sectores
router.get("/sectores", dashboardController.sectores);
router.post("/sectores/nuevo", sectorValidation, dashboardController.nuevoSector);
router.get("/sectores/editar/:id", dashboardController.sector);
router.put("/sectores/editar/:id", sectorValidation, dashboardController.editarSector);
router.get("/sectores/eliminar/:id", dashboardController.eliminarSector);

//Entes Inspectores
router.get("/entes_inspectores", dashboardController.inspectores);
router.post("/entes_inspectores/nuevo", enteValidation, dashboardController.nuevoInspector);
router.get("/entes_inspectores/editar/:id", dashboardController.inspector);
router.put("/entes_inspectores/editar/:id", enteValidation, dashboardController.editarEnteInspector);
router.get("/entes_inspectores/eliminar/:id", dashboardController.eliminarEnteInspector);

//Usuarios
router.get("/usuarios", dashboardController.usuarios);

module.exports = router;