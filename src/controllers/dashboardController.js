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
            let data = await dashboardUtilities.dataHandler(Estado, "estado", "estados");

            if(data.error) return res.render("dashboard/dashboard", data); 

            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    roles: async(req, res) => {
        try{
            let data = await dashboardUtilities.dataHandler(Rol, "rol", "roles");

            if (data.error) return res.render("dashboard/dashboard", data);

            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    origenes: async(req, res) => {
        try{
            let data = await dashboardUtilities.dataHandler(Origen, "origen", "origenes");

            if (data.error) return res.render("dashboard/dashboard", data);

            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    sectores: async(req, res) => {
        try{
            let data = await dashboardUtilities.dataHandler(Sector, "sector", "sectores");

            if (data.error) return res.render("dashboard/dashboard", data);

            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    inspectores: async(req, res) => {
        try{
            let data = await dashboardUtilities.dataHandler(EnteInspector, "ente_inspector", "entes_inspectores");

            if (data.error) return res.render("dashboard/dashboard", data);

            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
        /* const data = await EnteInspector.findAll();
        return res.json({data}); */
    },

    usuarios: async(req, res) => {
        const data = await Usuario.findAll();
        if(data.length === 0){
            let message = [{alerta: "No hay usuarios registrados."}];
            return res.json(message);
        }
        return res.json({data});
    },

    nuevoEstado: async(req, res) => {
        return res.json(req.body);
    },

    nuevoRol: async(req, res) => {
        return res.json(req.body);
    },

    nuevoOrigen: async(req, res) => {
        return res.json(req.body);
    },

    nuevoSector: async(req, res) => {
        return res.json(req.body);
    },
};

module.exports = dashboardController;