const { validationResult } = require('express-validator');
const utilities = require("../utilities/originacionUtilitites");

// refatorizar eliminando los modelos, que se hace en utilities
const originacionesController = {

    originaciones: async (req, res) => {
        let data = await utilities.originacionData();
        return res.render("originacion/originacion", data);
    },

    nuevaOriginacion: async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                // Crear la originación y el adjunto (si lo hay)
                const data = await utilities.originacionPACData(req.body, req.file);
                return res.render("originacion/originacion", data);
            } catch (error) {
                console.error(error);
                return res.send({error: error.message,});
            }
        } else {
            let data = await utilities.originacionData();
            data.oldData = req.body;
            data.originacionErrors = errors.mapped();
            return res.render("originacion/originacion", data);
        }
    },

    originacion: async (req, res) => {
        try{
            const data = await utilities.originacionPACData({}, null, req.params.id); 
            return res.render("originacion/originacion", data);
        } catch (error) {
            console.error(error);
            return res.send({error: error.message,});
        }
    },

    nuevaObservacionPAC: async (req, res) => {
        const errors = validationResult(req);
        try{
            if (errors.isEmpty()) {
                // Crear la observación y el adjunto (si lo hay)
                const data = await utilities.originacionPACData(req.body, req.file, req.body.originacion_id, true);
                return res.render("originacion/originacion", data);
            } else {
                let data = await utilities.originacionPACData({}, null, req.body.originacion_id);
                data.oldData = req.body;
                data.PACErrors = errors.mapped();
                return res.render("originacion/originacion", data);
            }
        } catch (error) {
            console.error(error);
            return res.send({error: error.message,});
        }
    },

    observacionesPACs: async (req, res) => {
        // para testear
        try{
            const data = await utilities.allPACsData();
            return res.send(data);
        } catch (error) {
            console.error(error);
            return res.send({error: error.message,});
        }
    },

    observacionPAC: async (req, res) => {
        try{
            const data = await utilities.pacData(req.params.id);
            return res.render("originacion/originacion", data);
        } catch (error) {
            console.error(error);
            return res.send({error: error.message,});
        }
    },
}

module.exports = originacionesController;