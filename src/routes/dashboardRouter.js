const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

router.get("/", dashboardController.index);

//Estados
router.get("/estados", dashboardController.estados);

module.exports = router;