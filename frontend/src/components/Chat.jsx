import React, { useRef, useState } from 'react';
import { LuImagePlus } from "react-icons/lu";
import { PiArrowElbowRightUpBold } from "react-icons/pi";
import { useSelector } from 'react-redux';
import { TbPhone} from "react-icons/tb";
import { TbVideo } from "react-icons/tb";
import { PiDotsThreeOutlineBold  } from "react-icons/pi";
import { BsClockHistory } from "react-icons/bs";
import Chatlist from './Chatlist.jsx';
import { TbSendOff } from "react-icons/tb";
import { TbSend } from "react-icons/tb";
import { toast } from 'react-hot-toast';
import '../style/chat.css';
import logo from '../assets/logo.png';

export const Chat = () => {
  const selectedChat = useSelector(state=>state.Chat.chats.selectedChat);
  const currUser = useSelector(state=>state.CurrUser.user._id);
  const chatUser = selectedChat.users.filter(user => user._id != currUser);
  const chatName = chatUser[0].username;
  const chatPhoto = chatUser[0].photo;
  const chatId = selectedChat._id;
  const chatEmail = chatUser[0].email;
  const [formData, setFormData] = useState({});
  const [preview, setPreview] = useState();

  const ref = useRef();

  const handleImgInput = ()=>{
    ref.current.click();
  }
  const handleImg = (e)=>{
    const file = e.target.files[0];
    console.log('inside image');
    
    toast.error("hihihihi")
  }
  const handleSend = async (e)=>{
    e.preventDefault();
    if(
      (formData.text == null || formData.text == undefined || formData.text == '') && (formData.image == null || formData.image == undefined || formData.image == '')
    )
      return; 
  }
  if(!selectedChat)
    {
      return (
        <div className='h-full flex-1 flex items-center justify-center flex-col'>
          <img src={logo} alt="logo" className=' h-72 w-72'/>
          <p id='id' className='text-[#dd1d5d] text-2xl font-medium -mt-14 tracking-wide'>Select a chat to continue</p>
        </div>
      )
    }
  return (
    <div id='chatContainer' className='h-full flex flex-1 flex-col items-center justify-start bg-[#222a3f] p-2 pb-1'>

      <div className='w-full h-[10%] flex items-center gap-10 p-10 bg-[#1d2437] rounded-xl '>
          <div className=' flex-1'>
            <h1 className='text-xl capitalize text-white cursor-not-allowed'>
              {chatName}
            </h1>
          </div>
          <div className=' flex-1 flex items-center justify-center gap-14'>
            <TbPhone  className='text-[28px] cursor-pointer text-[#dd1d5d] hover:scale-[106%] duration-100 ease-linear'/>
            <TbVideo className='text-[28px] cursor-pointer text-[#dd1d5d] hover:scale-[106%] duration-100 ease-linear'/>
            <PiDotsThreeOutlineBold  className='text-[28px] cursor-pointer text-[#dd1d5d] hover:scale-[106%] duration-100 ease-linear'/>
          </div>
          <div id='id' className=' flex-1 text-right'>
            <h2 className='lowercase text-[#ffffff50] cursor-not-allowed'>
              {chatEmail}
            </h2>
          </div>
      </div>

      <div className=' w-full flex-1'>

      </div>

      <form onSubmit={handleSend} className='w-full h-[10%] flex items-center gap-10 p-10  rounded-xl max-w-[1000px] justify-center'>
        <BsClockHistory className='text-[#dd1d5d80] text-[24px] hover:text-[#dd1d5d] duration-150 cursor-pointer'/>
        <input type="text" placeholder='Your message here' className='placeholder:text-[#ffffff4b] flex-1 text-lg bg-[#1d2437] px-5 py-3 text-white rounded-md outline-none focus:scale-x-[101%] duration-200'/>
        <LuImagePlus className='text-[#ffffff80] text-[28px] hover:text-[#fff] duration-200 cursor-pointer' onClick={handleImgInput}/>
        <div>
          {
            true ? 
            <TbSend className='text-[#ffffff80] text-[28px] hover:text-[#fff] duration-100 cursor-pointer'/>
            :<TbSendOff className='text-[#ffffff80] text-[26px] cursor-not-allowed'/>
          }
        </div>
        <input type="file" ref={ref} className='hidden' onChange={handleImg}/>
      </form>

    </div>
  )
}
