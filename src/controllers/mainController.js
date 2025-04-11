const mainController = {
    index: (req, res) => {
        res.redirect("/dashboard");
    },

    logout: (req, res) => {
        res.redirect("/dashboard");
    }
};

module.exports = mainController;