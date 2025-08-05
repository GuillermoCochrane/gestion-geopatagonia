//Middleware de ruta que redireciona al login , cuando un usuario no está logeado
function guestMDW (req,res, next) {
    const working = true // para desactivar el middleware en desarrollo
    if(!Boolean(req.session.user) && working){
        return res.redirect("/usuario/login")
    }
    next();
}

module.exports = guestMDW