const { Estado, EnteInspector, Origen, Sector, Rol, Usuario } = require("../database/models");
const { validationResult } = require('express-validator');
const utilities = require("../utilities/taskUtilitites");

const tasksController = {
    index: async (req, res) => {
        return res.redirect("/tasks/originacion");
    },

    originacion: async (req, res) => {
        let data = await utilities.originacionData(Origen, Usuario, EnteInspector, Sector);
        return res.render("originacion/orginacion", data);
    },

    nuevaOriginacion: async (req, res) => {
        console.log(req.body);
        return res.send(req.body);
    }
}

module.exports = tasksController;