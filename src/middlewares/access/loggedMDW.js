//Middleware de ruta que redireciona a usuario, cuando un usuario está logeado
function loggedMDW (req,res, next) {
    const isDevMode = process.env.DISABLE_AUTH === "true"; // Variable de entorno para desactivar el middleware en desarrollo (eliminar en la version final)
    if(!Boolean(req.session.user) && !isDevMode){
        return res.redirect("/usuario/login")
    }
    next();
}

module.exports = loggedMDW