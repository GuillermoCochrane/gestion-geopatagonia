//Middleware global que persiste la sesion del usuario, si hay cookie y no sesión
function persistUserMDW(req, res, next) {
    // Toma el valor falsy o trusty de la sesión
    res.locals.isLogged = Boolean(req.session.user);

    // Si hay cookie y no sesión, se guarda el valor de la cookie en la sesión y se establece como logged
    if (req.cookies.user && !req.session.user) { 
        req.session.user = req.cookies.user; 
        res.locals.isLogged = true;
    }
    next();
}

module.exports = persistUserMDW