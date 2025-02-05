import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'https://admin.socket.io/'],
    },    
});

const socketUserMap = {}

io.on('connection', (socket)=>{
    
    const userId = socket.handshake.query.userId;
    console.log('Welcome user '+socket.id);
    if(userId)
        socketUserMap[userId] = socket.id;
    console.log(socketUserMap);
    io.emit('getOnlineUsers', Object.keys(socketUserMap));

    socket.on('startCall',(startCallConfig)=>{
        const targetSocketId = socketUserMap[startCallConfig.to];
        const fromSocketId = socketUserMap[startCallConfig.from];
        console.log(startCallConfig);
        
        if(!targetSocketId)
        {
            io.to(fromSocketId).emit('callNotAnswered', 'Uhoh! user is offline');
            console.log('User is offline');
            
        }
        
        else
            io.to(targetSocketId).emit('incomingCall', startCallConfig);
    })

    socket.on('disconnect', ()=>{
        console.log('Bye user '+socket.id);
        delete socketUserMap[userId];
        io.emit('getOnlineUsers', Object.keys(socketUserMap));
    })

    socket.on('typing', ({emitterId, targetId, typingStatus})=>{
        const targetSocketId = socketUserMap[targetId];
        io.to(targetSocketId).emit('typing', {emitterId, typingStatus});
    })

    socket.on('AddChat',(data)=>{
        const userId1 = data.users[0]._id;
        const userId2 = data.users[1]._id;
        const targetSocketId1 = socketUserMap[userId1];
        const targetSocketId2 = socketUserMap[userId2];
        io.to(targetSocketId1).emit('AddChat',data)
        io.to(targetSocketId2).emit('AddChat',data)
    })

})

export const getSocketIdFromUserId = (userId) => {
    return socketUserMap[userId];
}

export {io, server, app}