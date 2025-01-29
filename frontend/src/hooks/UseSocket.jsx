import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setOnlineUsers } from "../../utils/utilSlice";
import { setPersonalChats, setTyping, updateCurrMsg } from "../../utils/chatSlice";
import { AppStore } from "../../utils/Appstore";
import { setUnreadMsg } from "../../utils/userSlice";
import getPersonalChats from "./getPersonalChats";


export const UseSocket = () => {

    const selectedChat = useSelector(state=>state.Chat.chats.selectedChat);
    const personalChats = useSelector(state=>state.Chat.chats.personal);
    const dispatch = useDispatch();

    const connectSocket = (userId) => {
        const socket = io(`${import.meta.env.VITE_API_PATH}`, {
            query: {userId},
        });
        return socket;
    };

    const disconnectSocket = (socket) => {
        if(!socket) 
            return
        console.log('disconnecting'+socket);
        socket.disconnect();
    };

    const getOnlineUsers = (socket) => {
        if(!socket) 
            return
        socket.on('getOnlineUsers', (list) => {
            dispatch(setOnlineUsers(list))
        });
    };

    const listenToMessage = (socket) => {
        if(!socket) 
            return
        socket.on('recieveMessage', (msg) => {
            const currentState = AppStore.getState();
            const activeChat = currentState.Chat.chats.selectedChat;
            if(activeChat && ( msg.senderId == activeChat.users[0]._id || msg.senderId == activeChat.users[1]._id) )
                dispatch(updateCurrMsg(msg));
            else
                dispatch(setUnreadMsg(msg.senderId));
        });
    };

    const listenToIncomingCall = (socket) => {
        if(!socket) 
            return
        socket.on('incomingCall', (data) => {
            console.log('incoming call', data);
        });
    };

    const listenToTyping = (socket) => {
        if(!socket) 
            return
        socket.on('typing', ({emitterId, typingStatus}) => {
            const currentState = AppStore.getState();
            const selectedChat = currentState.Chat.chats.selectedChat;
            if(selectedChat != null && (
                selectedChat.users[0]._id == emitterId 
                || selectedChat.users[1]._id == emitterId)
            )
            {
                dispatch(setTyping({emitterId, typingStatus}));
            }
        });
    };
    
    const listenToAddChat = (socket) => {
        socket.on('AddChat',(data)=>{
            const currentState = AppStore.getState();
            const personalChats = currentState.Chat.chats.personal || [];
            dispatch(setPersonalChats([...personalChats, data]));
        })
    }

    return { connectSocket, disconnectSocket, getOnlineUsers, listenToMessage, listenToTyping, listenToAddChat };
};
