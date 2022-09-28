const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const route = require('./routers/index.js');
const bodyParser = require('body-parser');
const db = require('./config/db/index');
const isProduction = process.env.NODE_ENV === "production";
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 7000;


const app = express();


// Connect database
db.connect();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// adding cors headers
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

// Use logger 
app.use(isProduction ? morgan('combined', { stream: accessLogStream }) : morgan('dev'));

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


// Handle 404 Not found
app.use((req, res, next) => {
    res.status(404).send("Lỗi 404 không tìm thấy, vui lòng quay lại.")
})

// Listen port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});