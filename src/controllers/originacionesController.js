const { validationResult } = require('express-validator');
const utilities = require("../utilities/originacionUtilitites");

// refatorizar eliminando los modelos, que se hace en utilities
const originacionesController = {

    originaciones: async (req, res) => {
        try{
            let data = await utilities.originacionData();
            return res.render("originacion/originacion", data);
        } catch (error) {
            console.error(error);
            const data = utilities.errordata(error);
            return res.render("originacion/originacion", data);
        }
    },

    filtrar: async function(req, res){
        const errors = validationResult(req);
        try{
            if (errors.isEmpty()) {
                const data = await utilities.originacionData(req.body);
                return res.render("originacion/originacion", data);
            } else {
                let data = await utilities.originacionData();
                data.oldData = req.body;
                data.filterErrors = errors.mapped();
                return res.render("originacion/originacion", data);
            }
        } catch (error) {
            console.error(error);
            const data = utilities.errordata(error);
            return res.render("originacion/originacion", data);
        }
    },

    nuevaOriginacion: async (req, res) => {
        const errors = validationResult(req);
        try {
            if (errors.isEmpty()) {
                // Crear la originación y el adjunto (si lo hay)
                const data = await utilities.registerCreationHandler (req.body, req.file);
                return res.render("originacion/originacion", data);
            } else {
                let data = await utilities.originacionData();
                data.oldData = req.body;
                data.originacionErrors = errors.mapped();
                return res.render("originacion/originacion", data);
            } 
        } catch (error) {
            console.error(error);
            const data = utilities.errordata(error);
            return res.render("originacion/originacion", data);
        }
    },

    originacion: async (req, res) => {
        try{
            const data = await utilities.registerCreationHandler ({}, null, req.params.id);
            return res.render("originacion/originacion", data);
        } catch (error) {
            console.error(error);
            const data = utilities.errordata(error);
            return res.render("originacion/originacion", data);
        }
    },

    nuevaObservacionPAC: async (req, res) => {
        const errors = validationResult(req);
        try{
            if (errors.isEmpty()) {
                // Crear la observación y el adjunto (si lo hay)
                const data = await utilities.registerCreationHandler (req.body, req.file, req.body.originacion_id, true);
                return res.render("originacion/originacion", data);
            } else {
                let data = await utilities.registerCreationHandler ({}, null, req.body.originacion_id);
                data.oldData = req.body;
                data.PACErrors = errors.mapped();
                return res.render("originacion/originacion", data);
            }
        } catch (error) {
            console.error(error);
            const data = utilities.errordata(error);
            return res.render("originacion/originacion", data);
        }
    },

    observacionesPACs: async (req, res) => {
        // para testear
        try{
            const data = await utilities.allPACsData();
            return res.send(data);
        } catch (error) {
            console.error(error);
            const data = utilities.errordata(error);
            return res.render("originacion/originacion", data);
        }
    },

    observacionPAC: async (req, res) => {
        try{
            const data = await utilities.pacData(req.params.id, req.params.accion);
            return res.render("originacion/originacion", data);
        } catch (error) {
            console.error(error);
            const data = utilities.errordata(error);
            return res.render("originacion/originacion", data);
        }
    },

    modificarResponsablePAC: async (req, res) => {
        const errors = validationResult(req);
        try{
            if (errors.isEmpty()) {
            await utilities.modifyPAC(req.params.id, req.body);
            return res.redirect(`/originacion/observacionPAC/${req.params.id}`);
            } else {
                let data = await utilities.pacData(req.params.id, "modify");
                data.PACErrors = errors.mapped();
                return res.render("originacion/originacion", data);
            }
        } catch (error) {
            console.error(error);
            const data = utilities.errordata(error);
            return res.render("originacion/originacion", data);
        }
    },

    agregarAccion: async (req, res) => {
        const errors = validationResult(req);
        try{
            if (errors.isEmpty()) {
                await utilities.createAccion(req.params.id, req.body);
                return res.redirect(`/originacion/observacionPAC/${req.params.id}`);
            } else {
                let data = await utilities.pacData(req.params.id, "add");
                data.PACErrors = errors.mapped();
                return res.render("originacion/originacion", data);
            }
        } catch (error) {
            console.error(error);
            const data = utilities.errordata(error);
            return res.render("originacion/originacion", data);
        }
    },

    observacionPacPdf: async function(req, res){
        try{
            let data = await utilities.allPACsData(req.params.id);
            res.render("pdf/pacExport", data[0]);
        } catch (error) {
            console.error(error);
            const data = utilities.errordata(error);
            return res.render("originacion/originacion", data);
        }
    },

    exportar: async function(req, res){
        try{
            // Obtener datos de la solicitud 
            const host = req.get("host");
            const protocol = req.protocol;

            // Generamos el PDF
            const pdf = await utilities.exportPDF(req.params.id, host, protocol);
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename=pac-${req.params.id}.pdf`);
            
            // enviamos el PDF listo para descargar
            res.end(pdf);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

}

module.exports = originacionesController;