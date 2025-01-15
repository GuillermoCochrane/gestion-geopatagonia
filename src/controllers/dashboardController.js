const db = require("../database/models");
const dashboardUtilities = require("../utilities/dashboardUtilitites");
const { Estado, EnteInspector, Origen, Sector, Rol, Usuario } = db;

const dashboardController = {

    index: (req, res) => {
        let data = dashboardUtilities.indexData();
        return res.render("dashboard/dashboard", data);
    },

    estados: async(req, res) => {
        try{
            let data = await dashboardUtilities.estadosData();
            if(data.error){
                return res.render("dashboard/dashboard", data);
            } 
            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    roles: async(req, res) => {
        const data = await Rol.findAll();
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
    },

    usuarios: async(req, res) => {
        const data = await Usuario.findAll();
        if(data.length === 0){
            let message = [{alerta: "No hay usuarios registrados."}];
            return res.json(message);
        }
        return res.json({data});
    }
};

module.exports = dashboardController;