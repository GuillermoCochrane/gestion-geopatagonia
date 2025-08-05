// middleware que comprueba si existe el token en las cookies, y si no lo redirecciona a la página de recuperación
function tokenAccessMDW(req, res, next) {
    if (!req.cookies.token) {
        return res.redirect("/usuario/recovery"); 
    }
    next();
};

module.exports =  tokenAccessMDW;