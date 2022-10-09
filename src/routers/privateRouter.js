const express = require('express');
const privateRouter = express.Router();
const middlewareController = require('../app/controllers/middlewareController');


privateRouter.get('/', middlewareController.verifyToken),





module.exports = privateRouter;