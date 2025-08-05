// middleware/routeProtection.js
const tokenAccessMDW = (req, res, next) => {
    if (!req.session.validToken) {
        return res.redirect("/usuario/validate"); 
    }
    next();
};

module.exports =  tokenAccessMDW;