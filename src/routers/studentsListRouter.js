const express = require('express');
const studentsListRouter = express.Router();
const studentsListController = require('../app/controllers/StudentsListController');


studentsListRouter.get('/', studentsListController.index);

studentsListRouter.delete('/:id/:sbd', studentsListController.deleteStudents);


module.exports = studentsListRouter;