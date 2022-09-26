const express = require('express');
const accountRouter = express.Router();
const AccountModel = require('../config/models/account/Account.js');


// Lấy tất cả dữ liệu từ database
accountRouter.get('/', (req, res, next) => {
    AccountModel.find({})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json('Lỗi server');
    })
});

// Lấy 1 dữ liệu từ database
accountRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    AccountModel.find({
        _id: id,
    })
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json('Lỗi server');
    })
});

// Thêm dữ liệu vào database
accountRouter.post('/', (req, res, next) => {
    const _class = req.body.class;
    const username = req.body.username;
    const password = req.body.password;
    AccountModel.create({
        class: _class,
        username: username,
        password: password,
    })
    .then(data => {
        res.json('Thêm account thành công');
    })
    .catch(err => {
        res.status(500).json('Lỗi server');
    })
});

// Chỉnh sửa dữ liệu trong database
accountRouter.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const newPassword = req.body.newPassword;
    AccountModel.findByIdAndUpdate(id, {
        password: newPassword,
    })
    .then(data => {
        res.json('Đổi mật khẩu thành công');
    })
    .catch(err => {
        res.status(500).json('Lỗi server');
    })
});

// Xóa dữu liệu trong database
accountRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    AccountModel.deleteOne({
        _id: id,
    })
    .then(data => {
        res.json('Xóa thành công');
    })
    .catch(err => {
        res.status(500).json('Lỗi server');
    })
});
module.exports = accountRouter;
