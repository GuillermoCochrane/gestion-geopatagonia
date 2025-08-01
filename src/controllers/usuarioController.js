const userUtilities = require("../utilities/usuarioUtilities");
const utilities = require("../utilities/utilities");
const { validationResult } = require('express-validator');

const usuarioController = {

    index: (req, res) => {
        return res.redirect("/usuario/logged")
    },

    login: (req, res) => {
        const data = userUtilities.loginData();
        return res.render("usuario/login", data)
    },

    processLogin: async function (req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            const { id, rol } = userUtilities.encryptedSessionData(req.userFromDB);
            if (req.userFromDB) {
                req.session.user = id;
                req.session.rol = rol;
                req.session.nombre = req.userFromDB.nombre;
                // Si se marca el checkbox de recordarme, se crea un cookie con el id del usuario que dura 1 hora
                if(req.body.rememberMe) res.cookie("user", req.session.user, {maxAge: (1000*60)*60} ) //(1000*60 = 1000ms * 60s = 1 min) * 60min = 1h
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
        if (req.session.user) {
            return res.send({
                Usuario: req.session.nombre, 
                ID: req.session.user,
                Rol: req.session.rol
            });
        } else {
            return res.send("No hay usuario logueado");
        }
    },

    logout: (req, res) => {
        res.clearCookie("user");
        req.session.destroy();
        res.redirect("/usuario/login");
    }
};

module.exports = usuarioController;