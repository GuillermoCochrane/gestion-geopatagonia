const utilities = require("../utilities/usuarioUtilities");
const { validationResult } = require('express-validator');

const usuarioController = {

    index: (req, res) => {
        return res.redirect("/usuario/login")
    },

    login: (req, res) => {
        const data = utilities.loginData();
        return res.render("usuario/login", data)
    },

    processLogin: async function (req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            const user = await utilities.processLogin(req.body);
            if (user) {
                req.session.user = user;
                return res.redirect("/usuario/logged");
            } else {
                return res.redirect("/usuario/login");
            }
        } else {
            let data = utilities.loginData();
            data.errors = errors.mapped();
            req.body.rememberMe = Boolean(req.body.rememberMe);
            data.old = req.body;
            return res.render("usuario/login", data);
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