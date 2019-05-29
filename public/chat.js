let socket = io();
// Connect
socket.on('connect', function(){
    console.log('connected to server');

     //Client side create message and send to server
    socket.emit('createMessage', {
        from: 'Client',
        text: 'Client msg to server'
    })
});
//Disconnect
socket.on('disconnect', function(){
    console.log('disconnected from server');
});

//Server side create message and send to client
socket.on('newMessage', function(message){
    console.log('newMessage', message);
});