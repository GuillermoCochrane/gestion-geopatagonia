const db = require("../database/models");
const dashboardUtilities = require("../utilities/dashboardUtilitites");
const { Estado, EnteInspector, Origen, Sector, Rol, Usuario, Formulario, Inciso } = db;
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
    },

    formularios: async(req, res) => {
        try{
            let data = await dashboardUtilities.dataHandler(Formulario, "formulario", "formularios");
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    incisos: async(req, res) => {
        try{
            let data = await dashboardUtilities.itemData(Inciso, Formulario);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    usuarios: async(req, res) => {
        try{
            let data = await dashboardUtilities.userData(Usuario, Rol);
            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    nuevoEstado: async(req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            try{
                let estado = await dashboardUtilities.createEntity(Estado, req.body);
                if(estado.error) return res.render("dashboard/dashboard", estado);
                return res.redirect("/dashboard/estados");
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error);
                return res.render("dashboard/dashboard", data);
            }
        } else {
            try{
                let data = await dashboardUtilities.formErrorsHandler(Estado, "estado", "estados", req.body, errors.mapped());
                if(data.error) return res.render("dashboard/dashboard", data);
                return res.render("dashboard/dashboard", data);
            } catch (error) {
                console.error(error);
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
    },

    nuevoFormulario: async(req, res) => {
        let errors = validationResult(req);
        try{
            if (errors.isEmpty()){
                let fomrulario = await dashboardUtilities.createEntity(Formulario, req.body);
                if(fomrulario.error) return res.render("dashboard/dashboard", fomrulario);
                return res.redirect("/dashboard/formularios");
            } else {
                let data = await dashboardUtilities.formErrorsHandler(Formulario, "formulario", "formularios", req.body, errors.mapped());
                if(data.error) return res.render("dashboard/dashboard", data);
                return res.render("dashboard/dashboard", data);
            }
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    nuevoInciso: async(req, res) => {
        let errors = validationResult(req);
        try{
            if (errors.isEmpty()){
                const inciso = await dashboardUtilities.createEntity(Inciso, req.body);
                if(inciso.error) return res.render("dashboard/dashboard", inciso);
                return res.redirect("/dashboard/incisos");
            } else {
                let data = await dashboardUtilities.itemErrorHandler(Inciso, Formulario, req.body, errors.mapped());
                if(data.error) return res.render("dashboard/dashboard", data);
                return res.render("dashboard/dashboard", data);
            }
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    nuevoUsuario: async(req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            try{
                let usuario = await dashboardUtilities.createEntity(Usuario, req.body, true);
                if(usuario.error) return res.render("dashboard/dashboard", usuario);
                return res.redirect("/dashboard/usuarios");
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        } else {
            try{
                let data = await dashboardUtilities.userErrorhandler(Usuario, Rol, req.body, errors.mapped());
                if (data.error) return res.render("dashboard/dashboard", data);
                return res.render("dashboard/dashboard", data);
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        }

    },

    estado: async(req, res) => {
        try{
            let data = await dashboardUtilities.dataHandler(Estado, "estado", "estados", req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    editarEstado: async(req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()){
            try{
                let estado = await dashboardUtilities.updateEntity(Estado, req.body, req.params.id);
                if(estado.error) return res.render("dashboard/dashboard", estado);
                return res.redirect("/dashboard/estados");
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        } else {
            try{
                let data = await dashboardUtilities.formErrorsHandler(Estado, "estado", "estados", req.body, errors.mapped(), req.params.id);
                if (data.error) return res.render("dashboard/dashboard", data);
                return res.render("dashboard/dashboard", data);
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        }
    },

    rol: async(req, res) => {
        try{
            let data = await dashboardUtilities.dataHandler(Rol, "rol", "roles", req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    editarRol: async(req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()){
            try{
                let rol = await dashboardUtilities.updateEntity(Rol, req.body, req.params.id);
                if(rol.error) return res.render("dashboard/dashboard", rol);
                return res.redirect("/dashboard/roles");
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        } else {
            try{
                let data = await dashboardUtilities.formErrorsHandler(Rol, "rol", "roles", req.body, errors.mapped(), req.params.id);
                if (data.error) return res.render("dashboard/dashboard", data);
                return res.render("dashboard/dashboard", data);
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        }
    },

    origen: async(req, res) => {
        try{
            let data = await dashboardUtilities.dataHandler(Origen, "origen", "origenes", req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    editarOrigen: async(req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()){
            try{
                let origen = await dashboardUtilities.updateEntity(Origen, req.body, req.params.id);
                if(origen.error) return res.render("dashboard/dashboard", origen);
                return res.redirect("/dashboard/origenes");
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        } else {
            try{
                let data = await dashboardUtilities.formErrorsHandler(Origen, "origen", "origenes", req.body, errors.mapped(), req.params.id);
                if (data.error) return res.render("dashboard/dashboard", data);
                return res.render("dashboard/dashboard", data);
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        }
    },

    sector: async(req, res) => {
        try{
            let data = await dashboardUtilities.dataHandler(Sector, "sector", "sectores", req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    editarSector: async(req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()){
            try{
                let sector = await dashboardUtilities.updateEntity(Sector, req.body, req.params.id);
                if(sector.error) return res.render("dashboard/dashboard", sector);
                return res.redirect("/dashboard/sectores");
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        } else {
            try{
                let data = await dashboardUtilities.formErrorsHandler(Sector, "sector", "sectores", req.body, errors.mapped(), req.params.id);
                if (data.error) return res.render("dashboard/dashboard", data);
                return res.render("dashboard/dashboard", data);
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        }
    },

    inspector: async(req, res) => {
        try{
            let data = await dashboardUtilities.dataHandler(EnteInspector, "ente_inspector", "entes_inspectores", req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    editarEnteInspector: async(req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()){
            try{
                let ente_inspector = await dashboardUtilities.updateEntity(EnteInspector, req.body, req.params.id);
                if(ente_inspector.error) return res.render("dashboard/dashboard", ente_inspector);
                return res.redirect("/dashboard/entes_inspectores");
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        } else {
            try{
                let data = await dashboardUtilities.formErrorsHandler(EnteInspector, "ente_inspector", "entes_inspectores", req.body, errors.mapped(), req.params.id);
                if (data.error) return res.render("dashboard/dashboard", data);
                return res.render("dashboard/dashboard", data);
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        }
    },

    formulario: async(req, res) => {
        try{
            let data = await dashboardUtilities.dataHandler(Formulario, "formulario", "formularios", req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    editarFormulario: async(req, res) => {
        const errors = validationResult(req)
        try{
            if (errors.isEmpty()){
                let fomrulario = await dashboardUtilities.updateEntity(Formulario, req.body, req.params.id);
                if(fomrulario.error) return res.render("dashboard/dashboard", fomrulario);
                return res.redirect("/dashboard/formularios");
            } else {
                let data = await dashboardUtilities.formErrorsHandler(Formulario, "formulario", "formularios", req.body, errors.mapped(), req.params.id);
                if(data.error) return res.render("dashboard/dashboard", data);
                return res.render("dashboard/dashboard", data);
            }
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    inciso: async(req, res) => {
        try{
            let data = await dashboardUtilities.itemData(Inciso, Formulario, req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    usuario: async(req, res) => {
        try{
            let data = await dashboardUtilities.userData(Usuario, Rol, req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    editarInciso: async(req, res) => {
        const inciso = await dashboardUtilities.updateEntity(Inciso, req.body, req.params.id);
        if(inciso.error) return res.render("dashboard/dashboard", inciso);
        return res.redirect("/dashboard/incisos");
    },

    editarUsuario: async(req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()){
            try{
                let usuario = await dashboardUtilities.updateEntity(Usuario, req.body, req.params.id);
                if(usuario.error) return res.render("dashboard/dashboard", usuario);
                return res.redirect("/dashboard/usuarios");
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        } else {
            try{
                let data = await dashboardUtilities.userErrorhandler(Usuario, Rol, req.body, errors.mapped(), req.params.id);
                if (data.error) return res.render("dashboard/dashboard", data);
                return res.render("dashboard/dashboard", data);
            } catch (error) {
                console.error(error);
                let data = dashboardUtilities.errorHandler(error); 
                return res.render("dashboard/dashboard", data);
            }
        }

    },

    eliminarEstado: async(req, res) => {
        try{
            const data = await dashboardUtilities.deleteData(Estado, "estado", "estados",  req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    estadoEliminado: async(req, res) => {
        try{
            const data = await dashboardUtilities.deleteEntity(Estado,  req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.redirect("/dashboard/estados");
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    eliminarRol: async(req, res) => {
        try{
            const data = await dashboardUtilities.deleteData(Rol, "rol", "roles",  req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    rolEliminado: async(req, res) => {
        try{
            const data = await dashboardUtilities.deleteEntity(Rol,  req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.redirect("/dashboard/roles");
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    eliminarOrigen: async(req, res) => {
        try{
            const data = await dashboardUtilities.deleteData(Origen, "origen", "origenes",  req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    origenEliminado: async(req, res) => {
        try{
            const data = await dashboardUtilities.deleteEntity(Origen,  req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.redirect("/dashboard/origenes");
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    eliminarSector: async(req, res) => {
        try{
            const data = await dashboardUtilities.deleteData(Sector, "sector", "sectores",  req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    sectorEliminado: async(req, res) => {
        try{
            const data = await dashboardUtilities.deleteEntity(Sector, req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.redirect("/dashboard/sectores");
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    eliminarEnteInspector: async(req, res) => {
        try{
            const data = await dashboardUtilities.deleteData(EnteInspector, "ente_inspector", "entes_inspectores",  req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    enteInspectorEliminado: async(req, res) => {
        try{
            const data = await dashboardUtilities.deleteEntity(EnteInspector, req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.redirect("/dashboard/entes_inspectores");
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    eliminarFormulario: async(req, res) => {
        try{
            const data = await dashboardUtilities.deleteData(Formulario, "formulario", "formularios",  req.params.id, true);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    formularioEliminado: async(req, res) => {
        try{
            const data = await dashboardUtilities.deleteEntity(Formulario, req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.redirect("/dashboard/formularios");
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    eliminarUsuario: async(req, res) => {
        try{
            const data = await dashboardUtilities.deleteData(Usuario, "usuario", "usuarios",  req.params.id, true);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.render("dashboard/dashboard", data);
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

    usuarioEliminado: async(req, res) => {
        try{
            const data = await dashboardUtilities.deleteEntity(Usuario, req.params.id);
            if(data.error) return res.render("dashboard/dashboard", data);
            return res.redirect("/dashboard/usuarios");
        } catch (error) {
            console.error(error);
            let data = dashboardUtilities.errorHandler(error); 
            return res.render("dashboard/dashboard", data);
        }
    },

};

module.exports = dashboardController;