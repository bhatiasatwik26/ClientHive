import React, { useEffect } from 'react';
import { MdGroupAdd } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";
import { ImHome } from "react-icons/im";
import { IoLogOut } from "react-icons/io5";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { setDashboardIndex,  } from '../../utils/utilSlice';
import { useDispatch, useSelector } from 'react-redux';
import getPersonalChats from '../hooks/getPersonalChats';
import { UseSocket } from '../hooks/UseSocket';
const Sidebar = () => {
    getPersonalChats();
    const {connectSocket, getOnlineUsers, disconnectSocket, listenToMessage} = UseSocket();
    const userId = useSelector(state=>state.CurrUser.user._id);
    const dispatch = useDispatch();

    useEffect(()=>{
        const socket = connectSocket(userId);
        getOnlineUsers(socket);
        listenToMessage(socket);
        return ()=>{socket.disconnect()}
    }, [])
    
    const index = useSelector(state=>state.GlobalUtil.utils.index);

    const handleLogout = (chat)=>{ 
        dispatch(signInSuccess(null));
    }

    return (
        <div className='w-[65px] flex flex-col bg-[#1d2437] items-center justify-center gap-16 py-9 px-4'>
            <ImHome id='0' onClick={()=>dispatch(setDashboardIndex(0))} className={` duration-100 ease-in-out cursor-pointer text-2xl ${index == 0 ? 'text-[#dd1d5d]' : 'text-white'}`}/>
            <HiChatBubbleBottomCenterText id='0' onClick={()=>dispatch(setDashboardIndex(1))} className={` duration-100 ease-in-out cursor-pointer text-2xl ${index == 1 ? 'text-[#dd1d5d]' : 'text-white'}`}/>
            <MdGroupAdd id='0' onClick={()=>dispatch(setDashboardIndex(2))} className={` duration-100 ease-in-out cursor-pointer text-2xl ${index == 3 ? 'text-[#dd1d5d]' : 'text-white'}`}/>
            <HiUserAdd id='0' onClick={()=>dispatch(setDashboardIndex(3))} className={` duration-100 ease-in-out cursor-pointer text-2xl ${index == 4 ? 'text-[#dd1d5d]' : 'text-white'}`}/>
            <IoLogOut id='4' onClick={handleLogout} className='text-red-600 text-2xl cursor-pointer hover:text-red-700 duration-150 ease-out'/>
        </div>
    );
}

export default Sidebar;
