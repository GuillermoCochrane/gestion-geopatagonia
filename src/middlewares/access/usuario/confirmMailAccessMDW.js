//Middleware que comprueba si validó el cambio de email, y si no lo redirecciona a la página de confirmación de email
function confirmMailAccessMDW(req, res, next) {
    if (!req.session.confirmedEmail) {
        return res.redirect("/usuario/emailConfirmation");
    }
    next();
};

module.exports =  confirmMailAccessMDW;