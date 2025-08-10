//Middleware global que persiste la sesion del usuario, si hay cookie y no sesión
const usuarioUtilities = require("../utilities/usuarioUtilities");

async function persistUserMDW(req, res, next) {
    // 1. Reconstruye sesión desde cookie si no existe
    if (req.cookies.user && !req.session.user) { 
        const data = await usuarioUtilities.encryptedRol(req.cookies.user);
        req.session.user = req.cookies.user;
        req.session.rol = data.rol;
        req.session.nombre = data.nombre;
    }

    // 2. Guarda nombre de usuario en locals
    if (req.session.user) {
        res.locals.username = req.session.nombre;
    }
    
    next();
}

module.exports = persistUserMDW