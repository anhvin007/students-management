const jwt = require('jsonwebtoken');
const AccountClassModel = require('../../config/models/account/Account');

const middlewareController = {

    // VerifyTokenUser
    async verifyToken(req, res, next) {
        try {
            const token = req.cookies.accessToken;
            const idAndType = jwt.verify(token, 'mk');
            await AccountClassModel.findOne({
                id: idAndType.id,
                type: idAndType.type,
            })
            .then(data => {
                console.debug(data)
                console.debug(data.type)
                if(data.type === 'class') {
                    req.data = data;bb
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
    async verifyTokenAdmin(req, res, next) {
        try {
            const token = req.cookies.accessToken;
            const idAndType = jwt.verify(token, 'mk');
            await AccountClassModel.findOne({
                id: idAndType.id,
                type: idAndType.type,
            })
                .then(data => {
                    console.debug(data)
                    console.debug(data.type)
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