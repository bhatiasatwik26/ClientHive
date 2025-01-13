import React from 'react'
import Chatlist from './Chatlist'
import { Chat } from './Chat'
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';

const ChatWindow = () => {
    const selectedChat = useSelector(state=>state.Chat.chats.selectedChat);
    return (
        <div className='flex items-center justify-between w-full h-full rounded-xl overflow-hidden gap-1'>
            <Chatlist />
            {selectedChat ? 
            <Chat /> :
            <div className='h-full flex-1 flex items-center justify-center flex-col'>
                <img src={logo} alt="logo" className=' h-72 w-72'/>
                <p id='id' className='text-[#dd1d5d] text-2xl font-medium -mt-14 tracking-wide'>Select a chat to continue</p>
            </div>
            }
        </div>
    )
}

export default ChatWindow