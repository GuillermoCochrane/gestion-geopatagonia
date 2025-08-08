//Middleware de ruta que redireciona al login , cuando un usuario no está logeado
function guestMDW (req,res, next) {
    const isDevMode = process.env.DISABLE_AUTH === "true"; // Variable de entorno para desactivar el middleware en desarrollo (eliminar en la version final)
    if(Boolean(req.session.user) && !isDevMode){
        return res.redirect("/usuario")
    }
    next();
}

module.exports = guestMDW