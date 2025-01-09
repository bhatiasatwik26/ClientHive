import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDashboardIndex } from '../../utils/utilSlice'
import getPersonalChats from '../hooks/getPersonalChats';
import { use } from 'react';
import { setSelectedChat } from '../../utils/chatSlice';

const SideBar = () => {
    getPersonalChats();
    const user = useSelector(state=>state.CurrUser.user);
    const personalChats = useSelector(state=>state.Chat.chats.personal);
    const dispatch = useDispatch();
    const activeChat = (chat)=>{
        dispatch(setSelectedChat(chat));
    }
    return (
        <div className='w-[80px] bg-[#1B2439] flex flex-col pb-3  items-center justify-between'>
            <img src={user.photo} className='h-14 w-full rounded-b-md cursor-pointer object-cover' onClick={()=>dispatch(setDashboardIndex(0))}/>
            <div className='w-[70%] h-[30%] flex flex-col items-center justify-evenly gap-1' onClick={()=>dispatch(setDashboardIndex(1))}>
                <p className='text-[#e0fbfc]'>Personal</p>
                <div className='flex flex-col gap-4'>
                {personalChats.map((chat,index)=>(
                    <div key={chat._id} onClick={()=>{activeChat(chat)}} className='w-14 h-14 hover:scale-[120%] duration-200 cursor-pointer rounded-full p-1 border-2 border-green-600'>
                        <img src={chat.users[0]._id===user._id ?
                            chat.users[1].photo :
                            chat.users[0].photo
                        } className='w-full h-full object-cover rounded-full'/>
                    </div>
                ))}
                </div>
            </div>
            <div className='w-full h-[30%] flex flex-col items-center justify-evenly bg-green-600 gap-2' onClick={()=>dispatch(setDashboardIndex(1))}>
                <p>Groups</p>
                {/* <div className='w-12 h-12 rounded-full bg-red-500'>+</div>
                <div className='w-12 h-12 rounded-full bg-blue-500'></div> */}
                {/* <div className='w-12 h-12 rounded-full bg-yellow-500'></div> */}
            </div>
            <p className='text-white'>Logout</p>
        </div>
)}
export default SideBar