import {Server} from 'socket.io';
import http from 'http';
import express from 'express';
import {instrument} from '@socket.io/admin-ui'
import { log } from 'console';
import e from 'cors';

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
        console.log(startCallConfig);
        /*senderId,offer,sendericecandiadte,receriverId,answer,receivericecandidate*/
    })

    socket.on('disconnect', ()=>{
        console.log('Bye user '+socket.id);
        delete socketUserMap[userId];
        io.emit('getOnlineUsers', Object.keys(socketUserMap));
    })

    socket.on('typing', ({emitterId, targetId, typingStatus})=>{
        console.log(emitterId, targetId, typingStatus);
        const targetSocketId = socketUserMap[targetId];
        console.log(targetSocketId);
        
        io.to(targetSocketId).emit('typing', {emitterId, typingStatus});
    })

})

export const getSocketIdFromUserId = (userId) => {
    return socketUserMap[userId];
}

export {io, server, app}