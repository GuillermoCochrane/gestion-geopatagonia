const { validationResult } = require('express-validator');
const utilities = require("../utilities/originacionUtilitites");

// refatorizar eliminando los modelos, que se hace en utilities
const originacionesController = {

    originaciones: async (req, res) => {
        let data = await utilities.originacionData();
        return res.render("originacion/orginacion", data);
    },

    nuevaOriginacion: async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                // Crear la originación y el adjunto (si lo hay)
                const data = await utilities.originationPACData(req.body, req.file);
                return res.render("originacion/orginacion", data);
            } catch (error) {
                console.error(error);
                return res.send({error: error.message,});
            }
        } else {
            let data = await utilities.originacionData();
            data.oldData = req.body;
            data.originacionErrors = errors.mapped();
            return res.render("originacion/orginacion", data);
        }
    },

    originacion: async (req, res) => {
        try{
            const data = await utilities.originationPACData({}, null, req.params.id);
            data.PACErrors = true;
            return res.render("originacion/orginacion", data);
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
                const data = await utilities.originationPACData(req.body, req.file, req.body.originacion_id, true);
                return res.render("originacion/orginacion", data);
            } else {
                let data = await utilities.originationPACData({}, null, req.body.originacion_id);
                data.oldData = req.body;
                data.PACErrors = errors.mapped();
                return res.render("originacion/orginacion", data);
            }
        } catch (error) {
            console.error(error);
            return res.send({error: error.message,});
        }
    },
}

module.exports = originacionesController;