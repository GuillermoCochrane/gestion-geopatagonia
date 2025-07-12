const utilities = require("../../utilities/utilities");
const originacionUtilities = require("../../utilities/originacionUtilitites");

const utilitiesAPIController = {
    checkEmail: async(req, res) => {
        const {email, id} = req.params;
        const endpoint =  "/api/utilities/unique/:email";
        try {
            let inUse = await utilities.checkEmail(email, id);
            let info = {
                meta: {
                    status : 200,
                    url: endpoint,
                },
                data: {
                    inUse: inUse,
                    oldData: email
                }
            }
            return res.json(info);
        } catch (error) {
            let info = {
                meta: {
                    status : 400,
                    url: endpoint,
                },
                errors: "error interno del servidor",
            }
            return res.json(info);
        }
    },

    deleteOrigination: async(req, res) => {
        const {id} = req.params;
        const endpoint =  "/api/utilities/deleteOrigination/:id";
        try {
            await originacionUtilities.deleteRegistro(id);
            let info = {
                meta: {
                    status : 200,
                    url: endpoint,
                },
                data: {
                    source: "Originaicion",
                    id: id,
                    deleted: true,
                    message: "Originación eliminada correctamente",
                }
            }
            return res.json(info);
        } catch (error) {
            let info = {
                meta: {
                    status : 400,
                    url: endpoint,
                },
                errors: "error interno del servidor",
            }
            return res.json(info);
        }
    },

    incisos: async(req, res) => {
        const {id} = req.params;
        const endpoint =  "/api/utilities/incisos/:id";
        try {
            let incisos = await utilities.incisos(id);
            let info = {
                meta: {
                    status : 200,
                    url: endpoint,
                },
                data: {
                    formulario_id: id,
                    incisos_encotrados: incisos.length > 0 ? true : false,
                    incisos: incisos,
                }
            }
            return res.json(info);
        } catch (error) {
            let info = {
                meta: {
                    status : 400,
                    url: endpoint,
                },
                errors: "error interno del servidor",
            }
            return res.json(info);
        }
    },
};

module.exports = utilitiesAPIController;