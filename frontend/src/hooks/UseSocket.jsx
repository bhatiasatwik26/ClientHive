import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { isCallModalOpen, setOnlineUsers } from "../../utils/utilSlice";
import { setPersonalChats, setTyping, updateCurrMsg } from "../../utils/chatSlice";
import { AppStore } from "../../utils/Appstore";
import { setUnreadMsg } from "../../utils/userSlice";
import getPersonalChats from "./getPersonalChats";
import toast from "react-hot-toast";
import { setCallingUser, setType } from "../../utils/callSlice";
import { PiPhoneIncomingBold } from "react-icons/pi";


export const UseSocket = () => {

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
        if(!socket) 
            return
        socket.on('AddChat',(data)=>{
            const currentState = AppStore.getState();
            const personalChats = currentState.Chat.chats.personal || [];
            dispatch(setPersonalChats([...personalChats, data]));
        })
    }

    const listenToIncomingCall = (socket) => {
        if(!socket)
            return;
        socket.on('call:initiate', ({ from, name }) => {
            toast.custom((t) => (
                <div className='w-fit shadow-xl rounded-lg pointer-events-auto bg-[#1d2437] border-2 border-[#dd1d5d] transition-all duration-300 hover:shadow-2xl'>
                <div className="p-3 flex flex-col items-center justify-between gap-2">
                <h1 id='font1' className='text-lg font-medium text-white flex items-center justify-between gap-2'>
                    <PiPhoneIncomingBold className="text-2xl animate-[vibrate_0.2s_ease-in-out_infinite]"/>
                  Incoming call from {name}
                </h1>
                <div className='flex items-center justify-center gap-6 w-full'>
                  <button 
                    onClick={(t) => {
                        toast.dismiss(t.id);
                        dispatch(isCallModalOpen(true));
                        dispatch(setCallingUser(from));
                        dispatch(setType('reciever'));
                    }}
                    className='px-4 py-1 rounded-md font-medium bg-[#dd1d5d] text-[#1d2437] hover:bg-[#222a3fab] hover:text-[#dd1d5d]  duration-200 ease-out'>
                    Accept
                  </button>
                  <button 
                    onClick={
                        () => {
                            console.log('rejecting call',t);
                            toast.dismiss(t.id)
                            socket.emit('call:terminate:reject', {to: from, from: socket.id})
                        }
                    } 
                    className='px-4 py-1 rounded-md font-medium text-[#dd1d5d] border border-[#dd1d5d] hover:bg-[#dd1d5d] hover:text-[#1d2437] duration-150'>
                    Reject
                  </button>
                </div>
            </div>
        </div>), {duration: 600000, position: 'top-right'});
        });
    }

    return { connectSocket, disconnectSocket, getOnlineUsers, listenToMessage, listenToTyping, listenToAddChat, listenToIncomingCall };
};
