import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDashboardIndex } from '../../utils/utilSlice'
import getPersonalChats from '../hooks/getPersonalChats';
import { setSelectedChat } from '../../utils/chatSlice';
import { PiUserFill } from "react-icons/pi";
import { MdOutlineGroupAdd } from "react-icons/md";
import { TiUserAddOutline } from "react-icons/ti";
import { PiIdentificationCard } from "react-icons/pi";
import '../style/sidebar.css'


const Chatlist = () => {
    
    const user = useSelector(state=>state.CurrUser.user);
    const personalChats = useSelector(state=>state.Chat.chats.personal);
    const dashboardIndex = useSelector(state=>state.GlobalUtil.utils.index); 
    const selectedChat = useSelector(state=>state.Chat.chats.selectedChat);
    const dispatch = useDispatch();
    const activeChat = (chat)=>{ 
        dispatch(setSelectedChat(chat));
    }
    return (
        <div id='sidebar' className='w-[300px] flex flex-col items-start justify-between duration-300 px-4 py-9 bg-[#222a3f] h-full gap-10'>
            <div className=' w-[100%] overflow-hidden flex flex-col items-start justify-start flex-1' onClick={()=>dispatch(setDashboardIndex(1))}>
                <p className={` text-white self-center text-xl font-medium
                    ${selectedChat?.isGroupChat === false ? 'tracking-wider' : ''}`}>
                Direct Messages
                </p>
                <div className='flex flex-col gap-3 w-full items-start justify-center py-5 pb-3 border-1 border-[#2d2c3082]'>
                {personalChats.map((chat,index)=>(
                    <div key={chat._id} onClick={()=>{activeChat(chat)}} 
                    className={` flex justify-start items-center gap-4  cursor-pointer w-full`}>
                        <div className={`w-[50px] h-[50px] rounded-full hover:scale-[95%] hover:shadow-inner duration-200 ${selectedChat?._id === chat._id ? 'border-2 border-[#dd1d5d] p-1' : ''}`}>
                        <img src={chat.users[0]._id===user._id ?
                            chat.users[1].photo :
                            chat.users[0].photo
                        } 
                        className='w-full h-full object-cover rounded-full'/>
                        </div>
                        <h2 className={`text-white capitalize ${selectedChat?._id === chat._id ? '' : 'font-thin'}`}>{chat.users[1].username}</h2> 
                    </div>
                ))}
                </div>
                <div className="w-full bg-orange flex items-center justify-start gap-4 group cursor-pointer hover:text-[#ffffffaa] text-[#ffffff34]">
                    <div className="hover:scale-95 hover:shadow-inner duration-200 cursor-pointer flex items-center justify-center border-2 border-[#ffffff34] text-[#ffffff34] group-hover:text-[#ffffffaa] group-hover:border-[#ffffffaa] w-[50px] h-[50px] rounded-full">
                    <TiUserAddOutline className="text-2xl" />
                    </div>
                    <p className="font-normal tracking-normal group-hover:text-[#ffffffaa]">New Chat</p>
                </div>
            </div>

            <div className=' w-[100%] overflow-hidden flex flex-col items-start justify-start flex-1' onClick={()=>dispatch(setDashboardIndex(1))}>
                <p className={` text-white self-center text-xl font-medium
                    ${selectedChat?.isGroupChat === false ? 'tracking-wider' : ''}`}>
                Group Chats
                </p>
                <div className='flex flex-col gap-3 w-full items-start justify-center py-5 pb-3 border-1 border-[#2d2c3082]'>
                {personalChats.map((chat,index)=>(
                    <div key={chat._id} onClick={()=>{activeChat(chat)}} 
                    className={` flex justify-start items-center gap-4  cursor-pointer w-full`}>
                        <div className={`w-[50px] h-[50px] rounded-full hover:scale-[95%] hover:shadow-inner duration-200 ${selectedChat?._id === chat._id ? 'border-2 border-[#dd1d5d] p-1' : ''}`}>
                        <img src={chat.users[0]._id===user._id ?
                            chat.users[1].photo :
                            chat.users[0].photo
                        } 
                        className='w-full h-full object-cover rounded-full'/>
                        </div>
                        <h2 className={`text-white capitalize ${selectedChat?._id === chat._id ? '' : 'font-thin'}`}>{chat.users[1].username}</h2> 
                    </div>
                ))}
                </div>
                <div className="w-full bg-orange flex items-center justify-start gap-4 group cursor-pointer hover:text-[#ffffffaa] text-[#ffffff34]">
                    <div className="hover:scale-95 hover:shadow-inner duration-200 cursor-pointer flex items-center justify-center border-2 border-[#ffffff34] text-[#ffffff34] group-hover:text-[#ffffffaa] group-hover:border-[#ffffffaa] w-[50px] h-[50px] rounded-full">
                    <MdOutlineGroupAdd className="text-2xl" />
                    </div>
                    <p className="font-normal tracking-normal group-hover:text-[#ffffffaa]">New Group</p>
                </div>
            </div>
        </div>
)}
export default Chatlist;


