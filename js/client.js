const socket = io('http://localhost:8001');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

// var audio = new Audio('ting.mp');

const append = (message,pos) => {

      const messageElement = document.createElement('div');
      messageElement.innerText = message;
      messageElement.classList.add('message');
      messageElement.classList.add(pos);
      messageContainer.append(messageElement);

    //   if(pos == 'left'){
    //     audio.play();
    //   }
    
}

const name = prompt("Enter your name to join"); 

// console.log(name);
socket.emit("new-user-joined", name);

socket.on('user-joined', name =>{
     append(`${name} joined the chat`,'right');
})


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');

     socket.emit('send',message);

     messageInput.value = '';
})

socket.on('recieve', data =>{
    append(`${data.name} : ${data.message}`,'left');
})



socket.on('left', data =>{
    append(`${data} left the chat`,'left');
})
