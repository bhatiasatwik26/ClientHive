import React, { useRef, useState, useEffect } from 'react';
import { LuImagePlus } from "react-icons/lu";
import { useSelector } from 'react-redux';
import { TbPhone} from "react-icons/tb";
import { TbVideo } from "react-icons/tb";
import { PiDotsThreeOutlineBold  } from "react-icons/pi";
import { BsClockHistory } from "react-icons/bs";
import { TbSendOff } from "react-icons/tb";
import { TbSend } from "react-icons/tb";
import { toast } from 'react-hot-toast';
import '../style/chat.css';
import Incoming from './Incoming.jsx';
import Outgoing from './Outgoing.jsx';
import { MdCloudOff } from "react-icons/md";
import { MdCloudQueue } from "react-icons/md";
import { updateCurrMsg, clearMsg } from '../../utils/chatSlice';
import { useDispatch } from 'react-redux';
import { RxCrossCircled } from "react-icons/rx";
import { PiHourglassMediumBold } from "react-icons/pi"
import CallModal from './CallModal.jsx';
import { isCallModalOpen } from '../../utils/utilSlice.js';
import { markUnreadMsg } from '../../utils/userSlice.js';
import { TbKeyboardShow  } from "react-icons/tb";
import { BsKeyboard } from "react-icons/bs";
import Delayed from './Delayed.jsx';

export const Chat = ({ socket }) => {

  const chatContainerRef = useRef(null); 
  const selectedChat = useSelector(state=>state.Chat.chats.selectedChat);
  const currUser = useSelector(state=>state.CurrUser.user._id);
  const chatUser = selectedChat.users.filter(user => user._id != currUser);
  const chatName = chatUser[0].username;
  const chatPhoto = chatUser[0].photo;
  const chatId = selectedChat._id;
  const chatEmail = chatUser[0].email;
  const [formData, setFormData] = useState({ text:"", image:""});
  const [preview, setPreview] = useState(null);
  const ref = useRef();
  const onlineUsers = useSelector(state=>state.GlobalUtil.utils.onlineList);
  const dispatch = useDispatch();
  const currMsg = useSelector(state=>state.Chat.chats.currMsg);
  const [loading, setLoading] = useState(false);
  const [messageschedule, setMessageschedule] = useState(false);
  const [scheduledata, setScheduledata] = useState(0);
  const typing = useSelector(state=>state.Chat.chats.typing);

  // fetching all messages of this chat
  useEffect(()=>{
    if(socket)
      socket.emit('typing', {
        emitterId:currUser,
        targetId:chatUser[0]._id,
        typingStatus:false
      });
    fetchMsg()
  },[chatId]); 

  // mark all unread messages as read
  useEffect(()=>{ 
    dispatch(markUnreadMsg(chatUser[0]._id))
  },[chatId]);

  // emitting typing event if user is typing
  useEffect(()=>{
    if(socket &&  formData.text.trim() == '')
      socket.emit('typing', {
        emitterId:currUser,
        targetId:chatUser[0]._id,
        typingStatus:false
      });
      else if(socket)
      socket.emit('typing', {
        emitterId:currUser,
        targetId:chatUser[0]._id,
        typingStatus:true
      });
  },[formData.text]);
  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [currMsg]);

  const fetchMsg = async ()=>{
    dispatch(clearMsg());
    const data = await fetch(`${import.meta.env.VITE_API_PATH}/api/message/${chatUser[0]._id}`, {
      credentials: 'include'
    });
    const res = await data.json();
    dispatch(updateCurrMsg(res.data));
    
  }
  const handleImgInput = ()=>{
    if(!loading)
      ref.current.click();
  }
  const handleImg = (e)=>{
    const file = e.target.files[0];
    // todo: check if file is an image
    const reader = new FileReader();
    try{
      reader.readAsDataURL(file);
      reader.onload = () => {
          setFormData({...formData, image: reader.result});
          setPreview(reader.result);
      }
      toast.success('Image selected');  
      e.target.value = null;
    }
  catch(err){
      toast.error('Error in selecting photo');
  }
  }
  const handleSend = async (e)=>{
    e.preventDefault();
    if((formData.text.trim() == null || formData.text.trim() == undefined || formData.text.trim() == '') && (formData.image == null || formData.image == undefined || formData.image == ''))
      return; 
    if(loading) return;
    setLoading(true);
    setMessageschedule(false);
    const delay = parseInt(scheduledata) || 0; 
    formData['delay'] = delay;
    if (delay > 0) 
        toast.success(`Message scheduled for ${delay} minute(s).`); 
    if(scheduledata)
      await sendDelayMsg();
    else
      await sendNormalMsg();
    setFormData({ image: "", text: "" });
    setPreview(null);
    setLoading(false);
    formData['delay']=0;
    }

  const sendNormalMsg = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_PATH}/api/message/${chatUser[0]._id}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        
    } catch (err) {
        console.error("Error sending message:", err);
        toast.error("Failed to send message.");
    }
};

const sendDelayMsg = async () => {
  try {
      const res = await fetch(`${import.meta.env.VITE_API_PATH}/api/message/delay/${chatUser[0]._id}`, {
          method: "POST",
          credentials: "include",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
      });
      const data = await res.json();
      
  } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Failed to send message.");
  }
};



  const clearImg = ()=>{
    setFormData({...formData, image:''});
    setPreview(null);
  }

  return (
    <div id='chatContainer' className='h-full flex flex-1 flex-col items-center relative justify-start bg-[#222a3f] py-3 px-4 pb-1 shadow-inner'>
      <div className='w-full h-[10%] flex items-center gap-10 p-10 bg-[#1d2437] rounded-xl relative shadow-sm'>
          <div className=' flex-1'>
            <h1 id='font1' className='text-xl capitalize text-white cursor-not-allowed'>
              {chatName}
            </h1>
          </div>
          <div className=' flex-1 flex items-center justify-center gap-14'>
            <TbPhone   className='text-[28px] cursor-pointer text-[#dd1d5d] hover:scale-[106%] duration-100 ease-linear'/>
            <TbVideo onClick={()=>{
              dispatch(isCallModalOpen(true)) 
            }} className='text-[28px] cursor-pointer text-[#dd1d5d] hover:scale-[106%] duration-100 ease-linear'/>
            <PiDotsThreeOutlineBold  className='text-[28px] cursor-pointer text-[#dd1d5d] hover:scale-[106%] duration-100 ease-linear'/>
          </div>
          <div id='menu' className=' flex-1 text-right'>
            <h2 id='font3' className='lowercase text-[#ffffff50] cursor-not-allowed'>
              {chatEmail}
            </h2>
          </div>
      </div>

      <div id='scrollarea' ref={chatContainerRef} className='w-full flex-1 flex flex-col items-center gap-4 p-10 px-14 justify-start overflow-y-scroll pb-16'>
        <p id='font3' className='bg-[#1d243774] text-[#ffffff26] px-2 py-1 text-sm font-light shadow-inner rounded-xl'>
        🔃 After delayed message is delivered, refresh to remove marker. 
        </p>
        {
            currMsg.length > 0 && currMsg.map((msg,index)=>(
              msg.type == 'delay' ? 
              <Delayed msg={msg.text} img={msg.image} key={msg._id}/> :
              msg.senderId == chatUser[0]._id ? 
              <Incoming msg={msg.text} img={msg.image}  key={msg._id}/> :
              <Outgoing msg={msg.text} img={msg.image} key={msg._id}/>
            ))
          }
        {
            typing && typing.emitterId == chatUser[0]._id &&
            typing.typingStatus &&
            <Incoming msg={<BsKeyboard/>} key={Math.random()} type={'type'}/>
          }
      </div>

      <form onSubmit={handleSend} className='w-full h-[10%] flex items-center gap-10 p-10 px-6  rounded-xl max-w-[1000px] justify-center relative'>
        <BsClockHistory onClick={()=>setMessageschedule(!messageschedule)} className='text-[#dd1d5d80] text-[24px] hover:text-[#dd1d5d] duration-150 cursor-pointer'/>
        {messageschedule &&
         (<input type='number' placeholder='Enter value in minutes' value={scheduledata}
            onChange={(e)=>{setScheduledata(e.target.value)}}
        />)}
        <div className='flex-1 flex items-center justify-center relative'>
          {
            preview && 
            <div className='absolute left-0 top-0 -translate-y-[110%] h-[75px] w-[75px]'>
              <img src={preview} alt="selected" className='w-full h-full object-cover rounded-md' />
              <RxCrossCircled className='absolute right-0 top-0 text-[#fff] translate-x-1/2 -translate-y-1/2 cursor-pointer' 
              onClick={clearImg}/>
            </div>
          }
          <input id='font2' type="text" placeholder={loading ? 'Sending...' :'Your message here'} value={formData.text} 
          onChange={ (e)=>{setFormData({...formData, text:e.target.value })} } disabled={loading}
          className='placeholder:text-[#ffffff4b] w-[100%]  text-lg bg-[#1d2437] pl-5 pr-10 py-3 text-white rounded-md outline-none focus:outline-[#dd1d5d1c] duration-200 disabled:cursor-not-allowed shadow-inner'/>
          <p className=' text-[#dd1d5d61] absolute right-2 top-1/2 -translate-x-[50%] -translate-y-1/2 '>
            {onlineUsers.includes(chatUser[0]._id) ? <MdCloudQueue/> : <MdCloudOff />}
          </p>
        </div>
        <LuImagePlus className={`text-[#ffffff80] text-[28px] duration-200  ${loading ? 'cursor-not-allowed hover:text-[#ffffff80]' : 'cursor-pointer hover:text-[#fff]'}`} onClick={handleImgInput}/>
        <div>
          {
            loading ?
            <PiHourglassMediumBold className='text-[28px] text-[#ffffff80] cursor-not-allowed'/> :
            formData.text || preview ? 
            <TbSend onClick={handleSend} className='text-[#ffffff80] text-[28px] hover:text-[#fff] duration-100 cursor-pointer'/>
            :<TbSendOff className='text-[#ffffff80] text-[28px] cursor-not-allowed'/>
          }
        </div>
        <input type="file" ref={ref} className='hidden' onChange={handleImg}/>
      </form>

    </div>
  )
}
