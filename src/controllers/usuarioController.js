const utilities = require("../utilities/usuarioUtilities");

const usuarioController = {

    index: (req, res) => {
        return res.redirect("/usuario/login")
    },

    login: (req, res) => {
        const data = utilities.loginData();
        return res.render("usuario/login", data)
    },

    logout: (req, res) => {
        res.redirect("/dashboard");
    }
};

module.exports = usuarioController;