const express = require('express');
const siteRouter = express.Router();
const siteController = require('../app/controllers/SiteController')


siteRouter.use('/coming-soon/', siteController.comingSoon);
siteRouter.use('/chat-realtime/', siteController.chatRealTime);
siteRouter.use('/kenh-chat/', siteController.kenhChat);
siteRouter.use('/', siteController.home);


module.exports = siteRouter;