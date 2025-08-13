const e = require("express");
const userUtilities = require("../utilities/usuarioUtilities");
const utilities = require("../utilities/utilities");
const { validationResult } = require('express-validator');

const usuarioController = {

    index: (req, res) => {
        try {
            const data = userUtilities.homeData(req.session.rol);
            return res.render("usuario/homeUsuario", data)
        } catch (error) {
            console.error(error);
            const errorData = userUtilities.errorData(error);
            return res.render("error", errorData);
        }
    },

    login: (req, res) => {
        const data = userUtilities.loginData();
        return res.render("usuario/usuario", data)
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
                return res.redirect("/usuario");
            } else {
                return res.redirect("/usuario/login");
            }
        } else {
            const errorData = userUtilities.loginData();
            errorData.errors = errors.mapped();
            errorData.old = req.body;
            errorData.old.rememberMe = Boolean(req.body.rememberMe);
            return res.render("usuario/usuario", errorData);
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
    },

    password: (req, res) => {
        const data = userUtilities.setPasswordData();
        return res.render("usuario/homeUsuario", data)
    },

    setPassword: async (req, res) => {
        const errors = validationResult(req);
        try {
            if (errors.isEmpty()){
              await userUtilities.setPassword(req.session.user, req.body);
              return res.redirect("/usuario");
            } else {
              const errorData = userUtilities.setPasswordData();
              errorData.errors = errors.mapped();
              return res.render("usuario/homeUsuario", errorData);
            }
        } catch (error) {
          console.error(error);
          const errorData = userUtilities.errorData(error);
          return res.render("error", errorData);
        }
    },

    email: (req, res) => {
        const data = userUtilities.setEmailData();
        return res.render("usuario/homeUsuario", data)
    },

    processEmail: async (req, res) => {
        const errors = validationResult(req);
        const host = req.get("host");
        const protocol = req.protocol;
        const baseUrl = `${protocol}://${host}`;
        try {
            if (errors.isEmpty()){
                // encriptamos los mails con los datos del formulario
                const { oldEncrypted, newEncrypted } = userUtilities.encryptedMails(req.body.oldEmail, req.body.email);
                // lo guadamos en cookies
                res.cookie("oldEncrypted", oldEncrypted, {maxAge: (1000*60)*30} ) //(1000*60 = 1000ms * 60 = 1 min) * 30 = 30 min
                res.cookie("newEncrypted", newEncrypted, {maxAge: (1000*60)*30} ) //(1000*60 = 1000ms * 60 = 1 min) * 30 = 30 min
                // enviamos el mail al mail original, con el token
                const sended = await userUtilities.sendChangeMailNotification(req.body.email, req.body.oldEmail, req.body.token, baseUrl);
                if (!sended.success) {
                    throw new Error("Error al enviar el mail de confirmacion");
                }
                // redirgitamos a la pagina de confirmacion
                return res.redirect("/usuario/validateEmail");
            } else {
              const errorData = userUtilities.setEmailData();
              errorData.errors = errors.mapped();
              errorData.old = req.body;
              return res.render("usuario/homeUsuario", errorData);
            }
        } catch (error) {
          console.error(error);
          const errorData = userUtilities.errorData(error);
          return res.render("error", errorData);
        }

    },

    validateEmail: async (req, res) => {
      return res.send("validacion de email");
    },

    recovery: async (req, res) => {
        try {
            const data = await userUtilities.recoveryData();
            return res.render("usuario/usuario", data)
        } catch (error) {
            console.error(error);
            const errorData = userUtilities.errorData(error);
            return res.render("error", errorData);
        }
    },

    processRecovery: async (req, res) => {
        const errors = validationResult(req);
        const host = req.get("host");
        const protocol = req.protocol;
        const baseUrl = `${protocol}://${host}`;
        try {
            if (errors.isEmpty()){
                const token = await userUtilities.processRecovery(req.body.email, baseUrl);
                res.cookie("token", token, {maxAge: (1000*60)*15} ) //(1000*60 = 1000ms * 60 = 1 min) * 15 = 15 min
                return res.redirect("/usuario/validate");
            } else {
                const errorData = await userUtilities.recoveryData();
                errorData.errors = errors.mapped();
                errorData.old = req.body;
                return res.render("usuario/usuario", errorData);
            }
        } catch (error) {
            console.error(error);
            const errorData = userUtilities.errorData(error);
            return res.render("error", errorData);
        }
    },

    validateToken: async (req, res) => {
        const data = userUtilities.tokenData();
        return res.render("usuario/usuario", data);
    },

    tokenValidation: async (req, res) => {
        let errors = validationResult(req);
        errors = userUtilities.tokenValidator(errors, req.params.token, req.cookies.token);

        try {
            if (errors.isEmpty()){
                req.session.validToken = true;
                return res.redirect("/usuario/newPassword");
            } else {
                const errorData = userUtilities.tokenData();
                errorData.errors = errors.mapped();
                errorData.old = req.body;
                return res.render("usuario/usuario", errorData);
            }
        } catch (error) {
            console.error(error);
            const errorData = userUtilities.errorData(error);
            return res.render("error", errorData);
        }
    },

    newPassword: async (req, res) => {
        const data = userUtilities.newPasswordData();
        return res.render("usuario/usuario", data)
    },

    setNewPassword: async (req, res) => {
        const errors = validationResult(req);
        try {
            if (errors.isEmpty()){
                const results = await userUtilities.setNewPassword(req.cookies.token, req.body);
                if (results.success) {
                    res.clearCookie("token")
                    delete req.session.validToken;
                }
                return res.redirect("/usuario/login");
            } else {
                const errorData = userUtilities.newPasswordData();
                errorData.errors = errors.mapped();
                return res.render("usuario/usuario", errorData);
            }
        } catch (error) {
            console.error(error);
            const errorData = userUtilities.errorData(error);
            return res.render("error", errorData);
        }
    }
};

module.exports = usuarioController;