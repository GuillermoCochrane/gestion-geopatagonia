const { Estado, EnteInspector, Origen, Sector, Rol, Usuario } = require("../database/models");
const dashboardUtilities = require("../utilities/dashboardUtilitites");
const { validationResult } = require('express-validator');

const originacionController = {
    index: async (req, res) => {
        return res.send("Bienvenido a Originaciones")
    },
}

module.exports = originacionController;