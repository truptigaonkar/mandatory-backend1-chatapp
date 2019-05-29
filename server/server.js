const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000
let app = express();

let server = http.createServer(app);

app.use(express.static(publicPath));

server.listen(port, function(){
    console.log(`Server is running on port ${port}`);
});

let io = socketIO(server); // get access to socket library http://localhost:3000/socket.io/socket.io.js
io.on('connection', function(socket){
    console.log("New user CONNECTED");

    //Client side create message and send to server
    socket.on('createMessage', function(message){
        console.log('createMessage', message);
    });

    //Client side create message and send to server
    socket.emit('newMessage', {
        from: 'server',
        text: 'server msg to client'
    })

    socket.on('disconnect', function(){
        console.log('User DISCONNECTED')
    });
});