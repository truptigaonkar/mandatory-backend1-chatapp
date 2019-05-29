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

// Message Form

let messageForm = document.querySelector('#messageForm');
let messageInput = document.querySelector('input[name="message"]');

messageForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    //Input validation
    if (messageInput.value == '') {
        //alert("Message required");
        messageInput.classList.add("messageInput__placeholder");
        messageInput.setAttribute("placeholder", "You must write something!!!")
    } else {
        messageInput.setAttribute("placeholder", "Enter message here.....")
        messageInput.classList.remove("messageInput__placeholder")

        // Socket emit
        socket.emit('createMessage', {
            from: 'User',
            text:
                messageInput.value
        });
    }
    messageInput.value = '';
})