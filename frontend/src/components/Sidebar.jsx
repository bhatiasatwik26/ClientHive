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


const SideBar = () => {
    getPersonalChats();
    const user = useSelector(state=>state.CurrUser.user);
    const personalChats = useSelector(state=>state.Chat.chats.personal);
    const dashboardIndex = useSelector(state=>state.GlobalUtil.utils.index); 
    const selectedChat = useSelector(state=>state.Chat.chats.selectedChat);
    console.log(selectedChat);
    const dispatch = useDispatch();
    const activeChat = (chat)=>{ 
        dispatch(setSelectedChat(chat));
    }
    return (
        <div id='sidebar' className='w-[80px] flex flex-col bg-[#1e202c] items-center justify-between py-9 duration-300'>
            <div className='w-[100%] overflow-hidden flex flex-col items-center justify-start' onClick={()=>dispatch(setDashboardIndex(1))}>
                <p className={`tracking-tighter text-sm text-white 
                    ${selectedChat?.isGroupChat === false ? ' font-medium tracking-normal' : ''}`}>Personal
                </p>
                <div className='flex flex-col gap-3 w-full items-center justify-center py-2 pb-3 rounded-t-3xl rounded-b-full border-1 border-[#2d2c3082]'>
                {personalChats.map((chat,index)=>(
                    <div key={chat._id} onClick={()=>{activeChat(chat)}} 
                    className={`w-[50px] h-[50px] hover:scale-[95%] hover:shadow-inner duration-200 cursor-pointer rounded-full
                    ${selectedChat?._id === chat._id ? 'border-2 border-[#cc1f08d6] p-1' : ''}`}>
                        <img src={chat.users[0]._id===user._id ?
                            chat.users[1].photo :
                            chat.users[0].photo
                        } className='w-full h-full object-cover rounded-full'/>
                    </div>
                ))}
                </div>
                <div className=' hover:scale-[95%] hover:shadow-inner duration-200 cursor-pointer flex items-center justify-center text-[#ffffff34] hover:text-[#ffffffaa] border-2 border-[#ffffff34] hover:border-[#ffffffaa] w-[50px] h-[50px] rounded-full'>
                    <TiUserAddOutline  className='text-2xl'/>
                </div>
            </div>

            <div className={`border-y-2 border-y-[#e44d3911] w-full py-4 flex items-center justify-center cursor-pointer 
            ${dashboardIndex == 0 ? 'text-[#cc1f08d6] text-[40px]' : 'text-[#cc1f0867] text-3xl '} `} 
            onClick={()=>{
                dispatch(setDashboardIndex(0));
                dispatch(setSelectedChat(null));
            }}>
                <PiIdentificationCard className='cursor-pointer'/>
            </div>
            
            <div className='w-[100%] overflow-hidden flex flex-col-reverse items-center justify-start gap-1' onClick={()=>dispatch(setDashboardIndex(1))}>
                <p className={`tracking-tighter text-sm text-white 
                    ${selectedChat?.isGroupChat === false ? ' font-medium tracking-normal' : ''}`}>Channel
                </p>
                <div className='flex flex-col gap-3 w-full items-center justify-center py-2 pb-3 rounded-t-3xl rounded-b-full border-1 border-[#2d2c3082]'>
                {personalChats.map((chat,index)=>(
                    <div key={chat._id} onClick={()=>{activeChat(chat)}} className='w-[50px] h-[50px] hover:scale-[95%] hover:shadow-inner duration-200 cursor-pointer rounded-full'>
                        <img src={chat.users[0]._id===user._id ?
                            chat.users[1].photo :
                            chat.users[0].photo
                        } className='w-full h-full object-cover rounded-full'/>
                    </div>
                ))}
                </div>
                <div className=' hover:scale-[95%] hover:shadow-inner duration-200 cursor-pointer flex items-center justify-center text-[#ffffff34] hover:text-[#ffffffaa] border-2 border-[#ffffff34] hover:border-[#ffffffaa] w-[50px] h-[50px] rounded-full'>
                    <MdOutlineGroupAdd  className='text-2xl'/>
                </div>
            </div>
        </div>
)}
export default SideBar


