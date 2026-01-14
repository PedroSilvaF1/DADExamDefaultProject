import {Server} from "socket.io"

const PORT = process.env.PORT || 3000

const io = new Server(PORT, {
    cors: {
        origin: "*",
    },
})
io.on("connection", (socket) => {
    console.log(`New socket connected : ${socket.id}`)
    socket.on("echo", (msg) => {
        io.emit("echo", msg.toUpperCase())
    })
    socket.on('newNoteCreated', (data) => {
        console.log(`Nova nota recebida: ${data.title}`);
        socket.broadcast.emit('newNoteCreated', data);
    })
})
console.log(`Socket.io server running on port ${PORT}`)
