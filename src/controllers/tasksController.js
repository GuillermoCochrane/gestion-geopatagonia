const { Estado, EnteInspector, Origen, Sector, Rol, Usuario } = require("../database/models");
const { validationResult } = require('express-validator');
const utilities = require("../utilities/taskUtilitites");

const tasksController = {
    index: async (req, res) => {
        return res.redirect("/tasks/originacion");
    },

    originacion: async (req, res) => {
        let data = utilities.originacionData();
        return res.render("originacion/orginacion", data);
    },
}

module.exports = tasksController;