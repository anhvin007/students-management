const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const route = require('./routers/index.js')
const bodyParser = require('body-parser')
const db = require('./config/db/index');
const port = 7000;


// Connect database
db.connect();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// adding cors headers
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

// Use logger 
app.use(morgan('dev'));

// Use template engine
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Use static
app.use(express.static(path.join(__dirname, 'public')));

// Use router
route(app);



// Listen port
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});