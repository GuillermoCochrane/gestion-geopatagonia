// middleware que comprueba si existe el los mails encryptados en las cookies, y si no lo redirecciona a la página de cambio de email
function changeMailAccessMDW(req, res, next) {
    if (!req.cookies.oldEncrypted || !req.cookies.newEncrypted) {
        return res.redirect("/usuario/email"); 
    }
    next();
};

module.exports =  changeMailAccessMDW;