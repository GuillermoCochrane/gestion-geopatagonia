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

//Roles
router.get("/roles", dashboardController.roles);
router.post("/roles/nuevo", rolValidation, dashboardController.nuevoRol);
router.get("/roles/editar/:id", dashboardController.rol);

//Origines
router.get("/origenes", dashboardController.origenes);
router.post("/origenes/nuevo", origenValidation, dashboardController.nuevoOrigen);

//Sectores
router.get("/sectores", dashboardController.sectores);
router.post("/sectores/nuevo", sectorValidation, dashboardController.nuevoSector);

//Entes Inspectores
router.get("/entes_inspectores", dashboardController.inspectores);
router.post("/entes_inspectores/nuevo", enteValidation, dashboardController.nuevoInspector);

//Usuarios
router.get("/usuarios", dashboardController.usuarios);

module.exports = router;