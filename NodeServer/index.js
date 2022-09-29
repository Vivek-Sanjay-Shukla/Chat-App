// node server which will handle socket io connections
const io = require('socket.io')(8001)

const users = {};



// for all connection
io.on('connection', socket => {

    // for particular connection
    socket.on("new-user-joined" , (name) =>{
        //  console.log("new user",name);
         users[socket.id] = name;
         socket.broadcast.emit('user-joined',name);
    })
      
    
    // for particular connection
    socket.on('send', message => {
        socket.broadcast.emit('recieve',{message:message, name:users[socket.id]})
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
   
})

