const User = require('../models/User');

const UserController = {
    renderHome: (req, res) => {
        res.render('home');
    },

};

module.exports = UserController;