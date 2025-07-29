const utilities = require("../utilities/usuarioUtilities");

const usuarioController = {

    index: (req, res) => {
        return res.redirect("/usuario/login")
    },

    login: (req, res) => {
        res.redirect("/dashboard");
    },

    logout: (req, res) => {
        res.redirect("/dashboard");
    }
};

module.exports = usuarioController;