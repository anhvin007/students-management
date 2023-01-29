const express = require('express');
const privateAdminRouter = express.Router();
const middlewareController = require('../app/controllers/middlewareController');


privateAdminRouter.get('/', middlewareController.verifyTokenAdmin),



    module.exports = privateAdminRouter;