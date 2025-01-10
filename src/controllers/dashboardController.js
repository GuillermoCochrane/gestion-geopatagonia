const db = require("../database/models");
const { Estado, EnteInspector, Origen, Sector, Rol, Usuario } = db;

const dashboardController = {
    index: (req, res) => {
        res.send("Dashboard");
    },

    estados: async(req, res) => {
        const data = await Estado.findAll();
        return res.json({data});
    },

    inspectores: async(req, res) => {
        const data = await EnteInspector.findAll();
        return res.json({data});
    },
    
    origenes: async(req, res) => {
        const data = await Origen.findAll();
        return res.json({data});
    },

    sectores: async(req, res) => {
        const data = await Sector.findAll();
        return res.json({data});
    }
};

module.exports = dashboardController;