const userUtilities = require("../utilities/usuarioUtilities");
const utilities = require("../utilities/utilities");
const { validationResult } = require('express-validator');

const usuarioController = {

    index: (req, res) => {
        return res.redirect("/usuario/login")
    },

    login: (req, res) => {
        const data = userUtilities.loginData();
        return res.render("usuario/login", data)
    },

    processLogin: async function (req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            const user = req.userFromDB;
            if (user) {
                req.session.user = utilities.encrypt(user.id); 
                return res.redirect("/usuario/logged");
            } else {
                return res.redirect("/usuario/login");
            }
        } else {
            let data = userUtilities.loginData();
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
            return res.send("No hay usuario logueado");
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.redirect("/usuario/login");
    }
};

module.exports = usuarioController;