const AccountClassModel = require("../../config/models/account/Account");
const jwt = require("jsonwebtoken");

class LoginController {

    // GET login
    index(req, res, next) {
        res.render('login');
    }

    // POST login
    login(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
        
        AccountClassModel.findOne({
            username: username,
            password: password
        })
        .then(data => {
            console.log(data);
            if(data) {
                const token = jwt.sign({
                    _id: data._id,
                }, 'mk');
                return 
            }
            else {
                return res.json('Thất bại');
            }
        })
        .catch(err => {
            res.status(500).json('Lỗi server');
        })
    }

}

module.exports = new LoginController;