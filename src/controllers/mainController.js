const utilities = require("../utilities/utilities");
const { forbiddenData } = require("../utilities/utilities");

const mainController = {
    index: (req, res) => {
        res.redirect("/usuario/login");
    },

    forbidden: (req, res) => {
        res.render("error", utilities.forbiddenData);
    }
};

module.exports = mainController;