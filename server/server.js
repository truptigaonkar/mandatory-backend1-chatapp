const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000
let app = express();

let server = http.createServer(app);

app.use(express.static(publicPath));

server.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});

let io = socketIO(server); // get access to socket library http://localhost:3000/socket.io/socket.io.js
io.on('connection', function (socket) {
    console.log("New user CONNECTED");

    // Admin message to everyone at the start
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to chat application!',
        createdAt: new Date().getTime()
    });

    //Broadcast msg from Admin to everone
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined!',
        createdAt: new Date().getTime()
    });

    //Client side create message and send to server
    socket.on('createMessage', function (message) {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    });

    socket.on('disconnect', function () {
        console.log('User DISCONNECTED')
    });
});