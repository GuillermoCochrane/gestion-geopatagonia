// middleware/routeProtection.js
const tokenAccessMDW = (req, res, next) => {
    if (!req.cookies.token) {
        return res.redirect("/usuario/recovery"); 
    }
    next();
};

module.exports =  tokenAccessMDW;