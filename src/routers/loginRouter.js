const express = require('express');
const loginRouter = express.Router();
const loginController = require('../app/controllers/LoginController')


loginRouter.get('/', loginController.index);
loginRouter.post('/', loginController.login);



module.exports = loginRouter;