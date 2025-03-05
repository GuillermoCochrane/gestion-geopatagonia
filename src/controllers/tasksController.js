const { Estado, EnteInspector, Origen, Sector, Rol, Usuario } = require("../database/models");
const { validationResult } = require('express-validator');

const tasksController = {
    index: async (req, res) => {
        return res.redirect("/tasks/originacion");
    },

    originacion: async (req, res) => {
        return res.render("originacion/orginacion",
            {
                title: "Originaciones", 
                styles: ["task"],
                pageScript: ["dashboard/dashboard", "task/modalManager", "sectionhandler"],
            });
    },
}

module.exports = tasksController;