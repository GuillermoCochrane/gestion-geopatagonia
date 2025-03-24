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

    nuevaObservacionPAC: async (req, res) => {
        const errors = validationResult(req);
        try{
            if (errors.isEmpty()) {
                return res.send("Observacion / PAC procesada correctamente");
            } else {
                let data = await utilities.originationPACData(Originacion, Origen, Usuario, EnteInspector, Sector, ObservacionPAC, AdjuntoOriginacion, req.body, req.file, req.body.originacion_id);
                data.oldData = req.body;
                data.PACErrors = errors.mapped();
                //let data = {oldData: req.body, originacionErrors: errors.mapped()};
                console.log(data);
                //return res.send(data);
                return res.render("originacion/orginacion", data);
            }
        } catch (error) {
            console.error(error);
            return res.send({error: error.message,});
        }
    },
}

module.exports = originacionesController;