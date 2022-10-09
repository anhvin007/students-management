const express = require('express');
const adminRouter = express.Router();
const adminController = require('../app/controllers/adminController');

adminRouter.get('/', adminController.index);

module.exports = adminRouter;