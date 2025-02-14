const { Estado, EnteInspector, Origen, Sector, Rol, Usuario } = require("../database/models");
const { validationResult } = require('express-validator');

const originacionController = {
    index: async (req, res) => {
        return res.render("originacion/orginacion",
            {
                title: "Originaciones", 
                styles: ["dashboard"],
                pageScript: ["dashboard/dashboard"],
            });
    },
}

module.exports = originacionController;