const jwt = require('jsonwebtoken');
const AccountClassModel = require('../../config/models/account/Account');

const middlewareController = {

    // VerifyTokenUser
    verifyToken(req, res, next) {
        try {
            const token = req.cookies.accessToken;
            const idAndType = jwt.verify(token, 'mk');
            AccountClassModel.findOne({
                id: idAndType.id,
                type: idAndType.type,
            })
            .then(data => {
                if(data.type === 'class') {
                    req.data = data;
                    next();
                }
                else {
                    
                    res.json('Chỉ tài khoản lớp học mới được truy cập!');
                }
            })
            .catch(err => {
                res.json('Chỉ tài khoản lớp học mới được truy cập!');
            })

        }
        catch (err) {
            res.redirect('/login');
        }
    },

    // VerifyTokenAdmin
    verifyTokenAdmin(req, res, next) {
        try {
            const token = req.cookies.accessToken;
            const idAndType = jwt.verify(token, 'mk');
            AccountClassModel.findOne({
                id: idAndType.id,
                type: idAndType.type,
            })
                .then(data => {
                    if (data.type === 'admin') {
                        req.data = data;
                        next();
                    }
                    else {
                        res.redirect('/');
                    }
                })
                .catch(err => {
                    res.redirect('/');
                })
        }
        catch (err) {
            res.redirect('/');
        }
    }

};


module.exports = middlewareController;