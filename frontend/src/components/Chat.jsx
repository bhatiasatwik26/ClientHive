import React from 'react';
import { TiAttachment } from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { IoCall } from "react-icons/io5";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { PiDotsThreeCircleVerticalFill } from "react-icons/pi";

const Chat = () => {
  const selectedChat = useSelector(state=>state.Chat.chats.selectedChat);
  const currUser = useSelector(state=>state.CurrUser.user._id);
  const chatUser = selectedChat.users.filter(user => user._id != currUser);
  const chatName = chatUser[0].username;
  const chatPhoto = chatUser[0].photo;

  
  return (
    <div className='flex-1 h-full flex flex-col items-center justify-between bg-[#202a41ee]'>

      <div className='w-full h-[10%] flex items-center justify-between border-b-2 px-10'>
        <div className='flex items-center justify-center gap-4'>
          <img src={chatPhoto} alt="" className='w-12 h-12 rounded-full object-center object-cover'/>
          <h1 className='text-lg font-semibold uppercase'>{chatName}</h1>
        </div>
        <div className='flex items-center justify-center gap-14'>
        <IoCall className='text-2xl'/>
        <BsFillCameraVideoFill className='text-2xl'/>
        <PiDotsThreeCircleVerticalFill className='text-2xl'/>
        </div>
      </div>

      <div className=' w-full flex-1'>

      </div>

      <form className='w-full  h-[10%] flex items-center justify-between'>
        <input type="text" name="" id="" />
        <TiAttachment />
        <RiSendPlaneFill />
      </form>
    </div>
  )
}

export default Chat