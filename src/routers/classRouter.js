const express = require('express');
const classRouter = express.Router();
const AccountModel = require('../config/models/account/Account.js');

// Lấy tất cả dữ liệu từ database
classRouter.get('/', (req, res, next) => {
    AccountModel.find({})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json('Lỗi server');
        })
});

module.exports = classRouter;