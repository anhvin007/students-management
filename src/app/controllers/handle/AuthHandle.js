const jwt = require("jsonwebtoken");
const AccountClassModel = require("../../../config/models/account/Account");




const authController = {

    // Generate access token
    generateAccessToken: (account, id, type) => {
        return jwt.sign({
            id: id,
            type: type,
        },
        "mk",
        { expiresIn: "2h" }
        );
    },

    // Generate refresh token
    generateRefreshToken: (account, id, type) => {
        return jwt.sign({
            id: id,
            type: type,
        },
        'mk',
        { expiresIn: '365d' });
    },

    // Handle register
    register: async(req, res) => {
        // const Class = req.body.class;
        const username = req.body.username;
        const password = req.body.password;

        // Create new account
        try {
            const newAccount = await new AccountClassModel({
                // class: Class,
                username: username,
                password: password,
            })

            // Save to database
            const account = await newAccount.save();
            res.status(200).json(account);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // Handle login
    login: async(req, res, next) => {
        const username = req.body.username;
        const password= req.body.password;

        try {
            // Check Account
            const account = await AccountClassModel.findOne({
                username: username,
                password: password,
            });
            if(account) {
                // jwt
                const id = account._id;
                const type = account.type;

                const accessToken = authController.generateAccessToken(account, id, type);
                res.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    secure: false,
                    path:'/',
                    sameSite: 'strict',
                });
                const {password, ...others} = account._doc;
                
                res.redirect('/');
                // res.status(200).json({...others, accessToken});
            }
            else {
                res.status(404).json('Sai tên tài khoản hoặc mật khẩu!');
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    requestRefreshToken: async(req, res) => {
        // Take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        console.log(refreshToken);
        res.status(200).json(refreshToken);
    }

}

module.exports = authController;