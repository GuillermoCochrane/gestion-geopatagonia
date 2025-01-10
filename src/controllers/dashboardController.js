const db = require("../database/models");

const dashboardController = {
    index: (req, res) => {
        res.send("Dashboard");
    },

};

module.exports = dashboardController;