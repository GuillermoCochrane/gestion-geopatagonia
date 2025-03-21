const { Estado, EnteInspector, Origen, Sector, Rol, Usuario, AdjuntoOriginacion, Originacion, ObservacionPAC } = require("../database/models");
const { validationResult } = require('express-validator');
const utilities = require("../utilities/taskUtilitites");

const originacionesController = {

    originaciones: async (req, res) => {
        let data = await utilities.originacionData(Origen, Usuario, EnteInspector, Sector);
        return res.render("originacion/orginacion", data);
    },

    nuevaOriginacion: async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                // Crear la originación y el adjunto (si lo hay)
                const data = await utilities.originationPACData(Originacion, Origen, Usuario, EnteInspector, Sector, ObservacionPAC, AdjuntoOriginacion, req.body, req.file);
                // Devolver la respuesta
                return res.render("originacion/orginacion", data);
            } catch (error) {
                console.error(error);
                //En caso de error, devolvemos la respuesta
                return res.send({error: error.message,});
            }
        } else {
            let data = await utilities.originacionData(Origen, Usuario, EnteInspector, Sector);
            data.oldData = req.body;
            data.originacionErrors = errors.mapped();
            return res.render("originacion/orginacion", data);
        }
    },

    originacion: async (req, res) => {
        try{
            const data = await utilities.originationPACData(Originacion, Origen, Usuario, EnteInspector, Sector, ObservacionPAC, AdjuntoOriginacion, req.body, req.file, req.params.id);
            return res.render("originacion/orginacion", data);
        } catch (error) {
            console.error(error);
            return res.send({error: error.message,});
        }
    },
}

module.exports = originacionesController;