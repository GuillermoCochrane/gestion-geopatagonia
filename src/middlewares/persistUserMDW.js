//Middleware global que persiste la sesion del usuario, si hay cookie y no sesión
const usuarioUtilities = require("../utilities/usuarioUtilities");

async function persistUserMDW(req, res, next) {
    // Toma el valor falsy o trusty de la sesión
    res.locals.isLogged = Boolean(req.session.user);

    // Si hay cookie y no sesión, se guarda el valor de la cookie en la sesión y se establece como logged
    if (req.cookies.user && !req.session.user) { 
        const data = await usuarioUtilities.encryptedRol(req.cookies.user);
        req.session.user = req.cookies.user;
        req.session.rol = data.rol;
        req.session.nombre = data.nombre;
        res.locals.isLogged = true;
    }
    next();
}

module.exports = persistUserMDW