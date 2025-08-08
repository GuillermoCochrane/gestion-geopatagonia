//Middleware de ruta que no permite el acceso a usuarios sin rol de originador
const utilities = require("../../../utilities/utilities");
function originadorAccessMDW (req,res, next) {

    if (process.env.DISABLE_AUTH === "true") return next(); // Variable de entorno para desactivar el middleware en desarrollo (eliminar en la version final)
    
    try{
        const rol = Boolean(req.session.rol) && utilities.decrypt(req.session.rol); //Obtenemos el rol del usuario, a partir del rol sesión desencriptado
        if((rol != 2)) return res.redirect("/forbidden");
        next();
    } catch (error) {
        console.error("Error al desencriptar rol:", error);
        return res.redirect("/forbidden");
    }
}

module.exports = originadorAccessMDW