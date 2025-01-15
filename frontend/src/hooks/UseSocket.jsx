import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setOnlineUsers } from "../../utils/utilSlice";
import { updateCurrMsg } from "../../utils/chatSlice";
import { AppStore } from "../../utils/Appstore";


export const UseSocket = () => {
    const dispatch = useDispatch();

    const connectSocket = (userId) => {
        const socket = io(`${import.meta.env.VITE_API_PATH}`, {
            query: {userId},
        });
        return socket;
    };

    const disconnectSocket = (socket) => {
            console.log('disconnecting'+socket);
            socket.disconnect();
    };

    const getOnlineUsers = (socket) => {
        socket.on('getOnlineUsers', (list) => {
            dispatch(setOnlineUsers(list))
        });
    };

    const listenToMessage = (socket) => {
        socket.on('recieveMessage', (msg) => {
            const currentState = AppStore.getState();
            const activeChatUsers = currentState.Chat.chats.selectedChat.users;
            if(msg.senderId == activeChatUsers[0]._id || msg.senderId == activeChatUsers[1]._id)
                dispatch(updateCurrMsg(msg));
        });
    };

    return { connectSocket, disconnectSocket, getOnlineUsers, listenToMessage };
};
