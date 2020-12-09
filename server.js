const http =require('http');
const app=require('./app')


const port = process.env.PORT || 3001;

const server =http.createServer(app);
const socketio = require('socket.io')(server)
//Socket Logic
socketio.on("connection", (userSocket) => {
    console.log("Yeha Connected");
    userSocket.on("send_message", (data) => {
        data["content"].c
        userSocket.broadcast.emit("receive_message", data)
        console.log(data);
    })

    userSocket.on("typing", (data) => {
        console.log(data);
        userSocket.broadcast.emit("typing", data)
    })

    userSocket.on("stop_typing", (data) => {
        console.log(data);
        userSocket.broadcast.emit("stop_typing", data)
    })
})
server.listen(port);