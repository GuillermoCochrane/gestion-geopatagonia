// middleware que comprueba si existe un token válido en la sesión, y si no lo redirecciona a la página de validación
function tokenAccessMDW(req, res, next) {
    if (!req.session.validToken) {
        return res.redirect("/usuario/validate"); 
    }
    next();
};

module.exports =  tokenAccessMDW;