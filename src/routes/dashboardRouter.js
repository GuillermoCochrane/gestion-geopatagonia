const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

router.get("/", dashboardController.index);

//Estados
router.get("/estados", dashboardController.estados);
router.post("/estados/nuevo", dashboardController.nuevoEstado);

//Roles
router.get("/roles", dashboardController.roles);
router.post("/roles/nuevo", dashboardController.nuevoRol);

//Origines
router.get("/origenes", dashboardController.origenes);
router.post("/origenes/nuevo", dashboardController.nuevoOrigen);

//Sectores
router.get("/sectores", dashboardController.sectores);

//Entes Inspectores
router.get("/inspectores", dashboardController.inspectores);

//Usuarios
router.get("/usuarios", dashboardController.usuarios);

module.exports = router;