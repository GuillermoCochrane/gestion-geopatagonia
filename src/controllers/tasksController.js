const { Estado, EnteInspector, Origen, Sector, Rol, Usuario, AdjuntoOriginacion, Originacion } = require("../database/models");
const { validationResult } = require('express-validator');
const utilities = require("../utilities/taskUtilitites");

const tasksController = {
    index: async (req, res) => {
        return res.redirect("/tasks/originacion");
    },

    originacion: async (req, res) => {
        let data = await utilities.originacionData(Origen, Usuario, EnteInspector, Sector);
        return res.render("originacion/orginacion", data);
    },

    nuevaOriginacion: async (req, res) => {
        const originacionErrors = validationResult(req);
        console.log(originacionErrors);
        if (originacionErrors.isEmpty()) {
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
            const old = req.body;
            return res.send({old: old, originacioErrors: originacionErrors});
        }
    },
}

module.exports = tasksController;