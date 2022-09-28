const express = require('express');
const attendanceRouter = express.Router();
const attendanceController = require('../app/controllers/AttendanceController')


attendanceRouter.get('/', attendanceController.index);



module.exports = attendanceRouter;