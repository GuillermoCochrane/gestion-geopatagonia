const { Estado, EnteInspector, Origen, Sector, Rol, Usuario, AdjuntoOriginacion, Originacion, ObservacionPAC } = require("../database/models");
const { validationResult } = require('express-validator');
const utilities = require("../utilities/taskUtilitites");

const tasksController = {
    index: async (req, res) => {
        return res.redirect("/tasks/originacion");
    },

    originaciones: async (req, res) => {
        let data = await utilities.originacionData(Origen, Usuario, EnteInspector, Sector);
        return res.render("originacion/orginacion", data);
    },

    nuevaOriginacion: async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                // Crear la originación y el adjunto (si lo hay)
                const originacion = await utilities.createOriginacion(Originacion,AdjuntoOriginacion, req.body, req.file);
                // Devolver la respuesta
                return res.send(originacion);
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
        let data = await utilities.singleOriginationData(Originacion, Origen, Usuario, EnteInspector, Sector, AdjuntoOriginacion, ObservacionPAC, req.params.id);
        return res.send( data );
    },
}

module.exports = tasksController;