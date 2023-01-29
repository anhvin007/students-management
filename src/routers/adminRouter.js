const express = require('express');
const adminRouter = express.Router();
const adminController = require('../app/controllers/adminController');
const privateAdminRouter = require('./privateRouterAdmin');


adminRouter.get('/', adminController.index);

module.exports = adminRouter;