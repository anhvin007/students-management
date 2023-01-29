
// Router
// const accountRouter = require('./accountRouter');
const loginRouter = require('./loginRouter');
const siteRouter = require('./siteRouter');
const attendanceRouter = require('./attendanceRouter');
const studentsListRouter = require('./studentsListRouter');
const adminRouter = require('./adminRouter');
const faceLabelsRouter = require('./faceLabelsRouter')

const route = function(app) {


    app.use('/login', loginRouter);

    app.use('/admin', adminRouter);

    app.use('/face-labels', faceLabelsRouter);

    app.use('/attendance', attendanceRouter);

    app.use('/students-list', studentsListRouter);
    app.use('/', siteRouter);

};

module.exports = route;