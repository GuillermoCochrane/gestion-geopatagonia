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
            const user = req.userFromDB;
            if (user) {
                req.session.user = user.id; //buscar forma de encriptar el ID en un token
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
            return res.send("logueado user: " + user);
        } else {
            return res.redirect("/usuario/login");
        }
    },

    logout: (req, res) => {
        res.redirect("/dashboard");
    }
};

module.exports = usuarioController;