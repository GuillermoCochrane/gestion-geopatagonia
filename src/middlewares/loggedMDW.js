//Middleware de ruta que redireciona a usuario, cuando un usuario está logeado
function loggedMDW (req,res, next) {
    const working = true // para desactivar el middleware en desarrollo
    if(Boolean(req.session.user) && working){
        return res.redirect("/usuario")
    }
    next();
}

module.exports = loggedMDW