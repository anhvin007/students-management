const express = require('express');
const siteRouter = express.Router();
const siteController = require('../app/controllers/SiteController')

siteRouter.use('/introduce', siteController.introduce);
siteRouter.use('/coming-soon', siteController.comingSoon);
siteRouter.use('/', siteController.home);


module.exports = siteRouter;