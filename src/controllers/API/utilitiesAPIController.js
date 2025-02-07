const utilities = require("../../utilities/utilities");

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

};

module.exports = utilitiesAPIController;