import React, { useEffect } from 'react'
import Chatlist from './Chatlist'
import { Chat } from './Chat'
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';
import { FaRegFaceLaughWink } from "react-icons/fa6";
import { LiaHandPointLeft } from "react-icons/lia";
import { use } from 'react';

const ChatWindow = ({ socket }) => {
    const selectedChat = useSelector(state=>state.Chat.chats.selectedChat);
    const [error, setError] = React.useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setError(false);
        }, 1000)
    },[])

    return (
        <div className='flex items-center justify-between w-full h-full rounded-xl overflow-hidden gap-1'>
            <Chatlist />
            {selectedChat ? 
            <Chat socket={socket}/> :
            <div className='h-full flex flex-1 flex-col items-center justify-start pt-[12%] bg-[#222a3f] pb-1'>
                <img src={logo} alt="logo" className=' h-[250px] w-[250px]'/>
                <div id='font3' className='text-[#dd1d5d] text-2xl font-medium -mt-14 tracking-wide'>
                    {error ? 
                        <p id='font1' className='text-[red]'>ERROR 404: src not found</p> : 
                        <div className='flex justify-center items-center flex-col gap-2'>
                            <div className='flex items-center justify-start gap-2'>
                                <p id='font2'>Nahh just kiddin' </p>
                                <FaRegFaceLaughWink/>
                            </div>
                            <div className='text-xl font-normal text-[#ffffff42] flex items-center justify-center gap-2'>
                                <LiaHandPointLeft />
                                <p id='font3'>
                                Select a chat to proceed
                                </p>
                            </div>
                        </div>
                    }
                </div>
            </div>
            }
        </div>
    )
}

export default ChatWindow