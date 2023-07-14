 const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var a1 = new Audio('ting.mp3');
var a2 = new Audio('a2.mp3');


const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'right') {
        a2.play();
    }
    else{
        a1.play();
    }
    
}

form.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = messageInput.value
      if(message != ""){
      append(`You: ${message}`, 'right')
      socket.emit('send', message);
      }
      messageInput.value = "";
})
const name = prompt('Enter your name to join');
if (name == ""){
    alert ("Please enter your name");
    const name = prompt('Enter your name to join');
    
}
socket.emit('new-user-joined', name);
 
socket.on('user-joined', name => {
    append(`"${name}" joined the chat`, 'mid')
    
}) 

socket.on('receive', (data)=> {
    append(`${data.name}: ${data.message}`, 'left')    
})
socket.on('left', name => {
    append(`"${name}" left the chat`, 'mid')    
})
