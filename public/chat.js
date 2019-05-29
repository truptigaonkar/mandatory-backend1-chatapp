//import moment from 'moment';

let socket = io();
// Connect
socket.on('connect', function () {
    console.log('connected to server');
});
//Disconnect
socket.on('disconnect', function () {
    console.log('disconnected from server');
});

//Server side create message and send to client
socket.on('newMessage', function (message) {
    console.log('newMessage', message);

    const formattedTime = moment(message.createdAt).format('LT');
    //Webpage: Created li and append content to body
    let li = document.createElement('li');
    li.innerText = `${message.from} ${formattedTime}: ${message.text}`;
    document.querySelector('body').appendChild(li);
});

let messageForm = document.querySelector('#message-form');
messageForm.addEventListener('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text:
            document.querySelector('input[name="message"]').value
    }, function () {

    })
})