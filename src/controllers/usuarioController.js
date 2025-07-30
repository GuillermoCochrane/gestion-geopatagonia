const utilities = require("../utilities/usuarioUtilities");

const usuarioController = {

    index: (req, res) => {
        return res.redirect("/usuario/login")
    },

    login: (req, res) => {
        const data = utilities.loginData();
        return res.render("usuario/login", data)
    },

    processLogin: async function (req, res) {
        const user = await utilities.processLogin(req.body);
        if (user) {
            req.session.user = user;
            return res.redirect("/usuario/logged");
        } else {
            return res.redirect("/usuario/login");
        }
    },

    logged: function(req, res){
        const user = req.session.user;
        if (user) {
            return res.send(user);
        } else {
            return res.redirect("/usuario/login");
        }
    },

    logout: (req, res) => {
        res.redirect("/dashboard");
    }
};

module.exports = usuarioController;