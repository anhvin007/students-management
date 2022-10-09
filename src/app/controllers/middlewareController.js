const jwt = require('jsonwebtoken');
const AccountClassModel = require('../../config/models/account/Account');

const middlewareController = {

    // VerifyTokenUser
    verifyToken(req, res, next) {
        try {
            const token = req.cookies.accessToken;
            const idAndType = jwt.verify(token, 'mk');
            AccountClassModel.findOne({
                id: idAndType.id
            })
            .then(data => {
                if(data) {
                    req.data = data;
                    next();
                }
                else {
                    res.json('Bạn không có quyền!');
                }
            })
            .catch(err => {
            })

        }
        catch (err) {
            // res.status(500).json('Bạn chưa đăng nhập!');
            res.redirect('/login');
        }
    },

    // VerifyTokenAdmin
    verifyTokenAdmin(req, res, next) {
        res.json('hello')
    }

};


module.exports = middlewareController;