import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDashboardIndex } from '../../utils/utilSlice'
import getPersonalChats from '../hooks/getPersonalChats';
import { setSelectedChat } from '../../utils/chatSlice';
import { FaUserTie } from "react-icons/fa";
import { TbCirclePlus } from "react-icons/tb";
import '../style/sidebar.css'


const SideBar = () => {
    getPersonalChats();
    const user = useSelector(state=>state.CurrUser.user);
    const personalChats = useSelector(state=>state.Chat.chats.personal);
    const dispatch = useDispatch();
    const activeChat = (chat)=>{ 
        dispatch(setSelectedChat(chat));
    }
    return (
        <div id='sidebar' className='w-[80px] flex flex-col bg-[#1e202c] items-center justify-between py-6'>
            <div className='w-[100%] overflow-hidden flex flex-col items-center justify-start' onClick={()=>dispatch(setDashboardIndex(1))}>
                <p className='text-[white] font-medium tracking-tighter'>Personal</p>
                <div className='flex flex-col gap-4 w-full items-center justify-center py-2 pb-3 rounded-t-3xl rounded-b-full border-1 border-[#2d2c3082]'>
                {personalChats.map((chat,index)=>(
                    <div key={chat._id} onClick={()=>{activeChat(chat)}} className='w-[50px] h-[50px] hover:scale-[95%] hover:shadow-inner duration-200 cursor-pointer rounded-full'>
                        <img src={chat.users[0]._id===user._id ?
                            chat.users[1].photo :
                            chat.users[0].photo
                        } className='w-full h-full object-cover rounded-full'/>
                    </div>
                ))}
                </div>
                <div className=' hover:scale-[95%] hover:shadow-inner duration-200 cursor-pointer flex items-center justify-center text-[#ffffff7a] hover:text-white'>
                    <TbCirclePlus  className='text-[35px]'/>
                </div>
            </div>

            <div className='border-y-2 border-y-[#e44d3911] text-[#812c21b4] hover:text-[#812c21] w-full py-4 flex items-center justify-center' onClick={()=>dispatch(setDashboardIndex(0))}>
                <FaUserTie className='text-3xl cursor-pointer'/>
            </div>
            
            <div className='w-[100%] overflow-hidden flex flex-col-reverse items-center justify-start gap-1' onClick={()=>dispatch(setDashboardIndex(1))}>
                <p className='text-[white] font-medium tracking-tight'>Groups</p>
                <div className='flex flex-col gap-4 w-full items-center justify-center py-2 pb-3 rounded-t-3xl rounded-b-full border-1 border-[#2d2c3082]'>
                {personalChats.map((chat,index)=>(
                    <div key={chat._id} onClick={()=>{activeChat(chat)}} className='w-[50px] h-[50px] hover:scale-[95%] hover:shadow-inner duration-200 cursor-pointer rounded-full'>
                        <img src={chat.users[0]._id===user._id ?
                            chat.users[1].photo :
                            chat.users[0].photo
                        } className='w-full h-full object-cover rounded-full'/>
                    </div>
                ))}
                </div>
                <div className=' hover:scale-[95%] hover:shadow-inner duration-200 cursor-pointer flex items-center justify-center text-[#ffffff7a] hover:text-white'>
                    <TbCirclePlus  className='text-[35px]'/>
                </div>
            </div>
        </div>
)}
export default SideBar