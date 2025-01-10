const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

router.get("/", dashboardController.index);

//Estados
router.get("/estados", dashboardController.estados);

//Origines
router.get("/origenes", dashboardController.origenes);

module.exports = router;