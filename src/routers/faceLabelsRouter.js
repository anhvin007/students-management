const express = require('express');
const faceLabelsRouter = express.Router();
const adminController = require('../app/controllers/faceLabelsController');
const faceLabelsPrivateRouter = require('./privateRouterAdmin');


faceLabelsRouter.get('/', adminController.index);
faceLabelsRouter.post('/', adminController.upload);

module.exports = faceLabelsRouter;