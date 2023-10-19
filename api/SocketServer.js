let onlineeUsers = []
export default function (socket, io) {
    // when user join or open application
    socket.on('join', (user) => {
        socket.join(user)
        // add user to online status
        if (!onlineeUsers.some((us) => us.userId === user)) {
            console.log(`user ${user} is online`)
            onlineeUsers.push({ userId: user, socketId: socket.id })
        }
        // sent status to client
        io.emit('get-online-users', onlineeUsers)
    })
    // socket disconnected
    socket.on("disconnect", () => {
        onlineeUsers = onlineeUsers.filter((user) => user.socketId !== socket.id)
        io.emit('get-online-users', onlineeUsers)
    })


    // socket ofline


    // join conversation
    socket.on("join conversation", (conversation) => {
        socket.join(conversation)
    })

    // send receive messages
    socket.on("send message", (message) => {
        // console.log("new message cmae :", message)
        let conversation = message.conversation;
        if (conversation.user) return
        conversation.users.forEach(user => {
            if (user._id === message.sender._id) return
            socket.in(user._id).emit('recive message', message)
        });
    })

    // typing 
    socket.on('typing', (conversation) => {
        console.log('typing')
        socket.in(conversation).emit('typing')
    })
    socket.on('stop typing', (conversation) => {
        socket.in(conversation).emit('stop typing')
    })
}