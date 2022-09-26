
// Router
const accountRouter = require('./accountRouter');
const classRouter = require('./classRouter');
const loginRouter = require('./loginRouter');
const siteRouter = require('./siteRouter');


const route = function(app) {

    app.use('/login/', loginRouter);
    
    app.use('/api/account/', accountRouter);
    
    app.use('/', siteRouter);

// app.use('/admin/login/', loginRouter);
};

module.exports = route;