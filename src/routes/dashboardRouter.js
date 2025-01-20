const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

router.get("/", dashboardController.index);

//Estados
router.get("/estados", dashboardController.estados);
router.post("/estados/nuevo", dashboardController.nuevoEstado);

//Entes Inspectores
router.get("/inspectores", dashboardController.inspectores);

//Origines
router.get("/origenes", dashboardController.origenes);

//Sectores
router.get("/sectores", dashboardController.sectores);

//Roles
router.get("/roles", dashboardController.roles);

//Usuarios
router.get("/usuarios", dashboardController.usuarios);

module.exports = router;