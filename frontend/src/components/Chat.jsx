import React from 'react';
import { TiAttachment } from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { TbPhone} from "react-icons/tb";
import { TbVideo } from "react-icons/tb";
import { PiDotsThreeOutlineBold  } from "react-icons/pi";
import '../style/chat.css';

const Chat = () => {
  const selectedChat = useSelector(state=>state.Chat.chats.selectedChat);
  const currUser = useSelector(state=>state.CurrUser.user._id);
  const chatUser = selectedChat.users.filter(user => user._id != currUser);
  const chatName = chatUser[0].username;
  const chatPhoto = chatUser[0].photo;
  const chatId = selectedChat._id;
  const chatEmail = chatUser[0].email;

  
  return (
    <div id='chatContainer' className='h-full flex flex-col items-center justify-start bg-[#eaebed] rounded-3xl'>
      <div className='w-full h-[10%] flex items-center justify-center gap-10 p-10'>
          <div className=' flex-1'>
            <h1 className='text-xl font-medium capitalize text-[#1e202cd4] cursor-not-allowed'>
              {chatName}
            </h1>
          </div>
          <div className=' flex-1 flex items-center justify-center gap-14'>
            <TbPhone  className='text-[26px] cursor-pointer text-[#1e202c] hover:scale-[104%] duration-100 ease-linear'/>
            <TbVideo className='text-[26px] cursor-pointer text-[#1e202c] hover:scale-[104%] duration-100 ease-linear'/>
            <PiDotsThreeOutlineBold  className='text-[26px] cursor-pointer text-[#1e202c] hover:scale-[104%] duration-100 ease-linear'/>
          </div>
          <div className=' flex-1 text-right'>
            <h2 className='lowercase text-[#1e202cae] cursor-not-allowed'>
              {chatEmail}
            </h2>
          </div>
      </div>
      <div className=' w-full flex-1'>

      </div>

      <form className='w-full h-[10%] flex items-center justify-between'>
        <input type="text" name="" id="" />
        <TiAttachment />
        <RiSendPlaneFill />
      </form>
    </div>
  )
}

export default Chat