const authController = require('./handle/AuthHandle');


class LoginController {


    // GET login
    index(req, res, next) {
        res.render('login');
    }

    // POST login
    login(req, res, next) {

        authController.login(req, res, next);

        // res.next();
        // res.json('you are admin');

    }

}

module.exports = new LoginController;