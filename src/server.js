const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const route = require('./routers/index.js');
const bodyParser = require('body-parser');
const db = require('./config/db/index');
const isProduction = process.env.NODE_ENV === "production";
const dotenv = require('dotenv');
dotenv.config();
const faceapi = require("face-api.js");
const { Canvas, Image } = require("canvas");
const canvas = require("canvas");
const fileUpload = require("express-fileupload");
faceapi.env.monkeyPatch({ Canvas, Image });
const app = express();
const http = require("http");
const port = process.env.PORT || 7000;

// Use static
app.use(express.static(path.join(__dirname, 'public')));

// Use fileupload
app.use(fileUpload({ useTempFiles: true }));

// Attached http server to the socket.io
const server = http.createServer(app);
const io = require('socket.io')(server);

// Handle socket.io
const { addUser, removeUser, getUser,
    getUsersInRoom } = require("./public/js/page/kenhChatHandle");
var countUserOnline = 2;
io.on('connection', (socket) => {
    console.log('user connected');    
    countUserOnline++;
    // generate userId
    socket.on("join", ({name, room}, callback) => {
        const { error, user } = addUser(
            { id: socket.id, name, room });
        if (error) {
            countUserOnline--;
            return callback(error);
        }   

        // Emit will send message to the user
        // who had joined
        socket.emit('messageStatus', {
            user: 'bot004', text:
                `Kết nối thành công kênh ${user.room}.`
        }, countUserOnline);

        // Broadcast will send message to everyone
        // in the room except the joined user
        socket.broadcast.to(user.room)
            .emit('messageStatus', {
                user: "bot007",
                text: `"${user.name}" đã tham gia kênh!`
            }, countUserOnline);

        socket.join(user.room);

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });
    });

    // Handle message chat
    socket.on('sendMessage', (message) => {

        const user = getUser(socket.id);
        io.emit('message',
            { user: user.name, text: message });

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
        const users = removeUser();
        const index = users.findIndex(elem => elem.id === socket.id);
        const user = users[index];
        removeUser(index);
        countUserOnline--;
        if(user) {
            io.emit('messageStatus',
                    {
                        user: 'bot009', text:
                            `"${user.name}"  đã rời kênh!`
                    }, countUserOnline);
        }
    })

    // Handle user typing
    socket.on("typing", function (data) {
        socket.broadcast.emit("typing", data);
    });
});


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

// Use cors
app.use(cors());

// Use cookie-parser
app.use(cookieParser());

// Use logger 
app.use(isProduction ? morgan('combined', { stream: accessLogStream }) : morgan('dev'));

// Use template engine
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));


// check localStorage
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

if (!localStorage) {
    res.status(404).json('Trình duyệt này không hỗ trợ vui lòng đổi trình duyệt khác !!')
}


// Use router
route(app);

// Listen port
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});