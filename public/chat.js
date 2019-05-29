let socket = io();
// Connect
socket.on('connect', function(){
    console.log('connected to server');
});
//Disconnect
socket.on('disconnect', function(){
    console.log('disconnected from server');
});

//Server side create message and send to client
socket.on('newMessage', function(message){
    console.log('newMessage', message);
});