const express = require('express');
const attendanceRouter = express.Router();
const attendanceController = require('../app/controllers/AttendanceController')
const privateRouter = require('./privateRouter');



// GET /attendance
attendanceRouter.get('/', privateRouter, attendanceController.index);



module.exports = attendanceRouter;