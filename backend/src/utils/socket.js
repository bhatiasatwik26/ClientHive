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

    socket.on('call:initiate', ({to, from, name})=>{
        const toSocketId = socketUserMap[to];
        const fromSocketId = socketUserMap[from];
        if(!toSocketId)
        {
            io.to(fromSocketId).emit('call:terminate:offline');
            console.log('User appears offline');
        }
        else
        {
            io.to(toSocketId).emit('call:initiate', {from, name});
        }
    })
    socket.on('call:accept', ({to, from})=>{
        const toSocketId = socketUserMap[to];
        io.to(toSocketId).emit('call:accept');
    });
    socket.on('call:terminate:reject', ({to, from})=>{
        const toSocketId = socketUserMap[to];
        io.to(toSocketId).emit('call:terminate:reject');
    });
    socket.on('call:offer', ({offer, to, from})=>{
        const toSocketId = socketUserMap[to];
        io.to(toSocketId).emit('call:offer', {offer, from});
    });
    socket.on('call:answer', ({answer, to, from})=>{
        const toSocketId = socketUserMap[to];
        io.to(toSocketId).emit('call:answer', {answer, from});
    });
    socket.on('call:negotiation:needed', ({offer, to, from})=>{
        const toSocketId = socketUserMap[to];
        io.to(toSocketId).emit('call:negotiation:needed', {offer, from});
    });
    socket.on('call:negotiation:done', ({answer, to, from})=>{
        const toSocketId = socketUserMap[to];
        io.to(toSocketId).emit('call:negotiation:done', {answer, from});
    });
})

export const getSocketIdFromUserId = (userId) => {
    return socketUserMap[userId];
}

export {io, server, app}