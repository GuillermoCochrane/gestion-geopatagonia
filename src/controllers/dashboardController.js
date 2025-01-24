const db = require("../database/models");
const dashboardUtilities = require("../utilities/dashboardUtilitites");
const { Estado, EnteInspector, Origen, Sector, Rol, Usuario } = db;
const { validationResult } = require('express-validator');

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
        let errors = validationResult(req);
        if (errors.isEmpty()){
            try{
                let estado = await dashboardUtilities.createEntity(Estado, req.body);
                if(estado.error) return res.render("dashboard/dashboard", estado);
                return res.redirect("/dashboard/estados");
            } catch (error) {
                console.log(error);
                let data = dashboardUtilities.errorHandler(error);
                return res.render("dashboard/dashboard", data);
            }
        } else {
            try{
                let data = await dashboardUtilities.formErrorsHandler(Estado, "estado", "estados", req.body, errors.mapped());
                if(data.error) return res.render("dashboard/dashboard", data);
                return res.render("dashboard/dashboard", data);
            } catch (error) {
                console.log(error);
                let data = dashboardUtilities.errorHandler(error);
                return res.render("dashboard/dashboard", data);
            }
        }

    },

    nuevoRol: async(req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            try{
                let rol = await dashboardUtilities.createEntity(Rol, req.body);
                if(rol.error) return res.render("dashboard/dashboard", rol);
                return res.redirect("/dashboard/roles");
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        } else {
            try{
                let data = await dashboardUtilities.formErrorsHandler(Rol, "rol", "roles", req.body, errors.mapped());
                if (data.error) return res.render("dashboard/dashboard", data);
                return res.render("dashboard/dashboard", data);
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        }
    },

    nuevoOrigen: async(req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            try{
                let origen = await dashboardUtilities.createEntity(Origen, req.body);
                if(origen.error) return res.render("dashboard/dashboard", origen);
                return res.redirect("/dashboard/origenes");
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        } else {
            try{
                let data = await dashboardUtilities.formErrorsHandler(Origen, "origen", "origenes", req.body, errors.mapped());
                if (data.error) return res.render("dashboard/dashboard", data);
                return res.render("dashboard/dashboard", data);
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        }
    },

    nuevoSector: async(req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            try{
                let sector = await dashboardUtilities.createEntity(Sector, req.body);
                if(sector.error) return res.render("dashboard/dashboard", sector);
                return res.redirect("/dashboard/sectores");
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        } else {
            try{
                let data = await dashboardUtilities.formErrorsHandler(Sector, "sector", "sectores", req.body, errors.mapped());
                if (data.error) return res.render("dashboard/dashboard", data);
                return res.render("dashboard/dashboard", data);
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        }
    },

    nuevoInspector: async(req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            try{
                let inspector = await dashboardUtilities.createEntity(EnteInspector, req.body);
                if(inspector.error) return res.render("dashboard/dashboard", inspector);
                return res.redirect("/dashboard/entes_inspectores");
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        } else {
            try{
                let data = await dashboardUtilities.formErrorsHandler(EnteInspector, "ente_inspector", "entes_inspectores", req.body, errors.mapped());
                if (data.error) return res.render("dashboard/dashboard", data);
                return res.render("dashboard/dashboard", data);
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        }
    }
};

module.exports = dashboardController;