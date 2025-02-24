import React, { useEffect } from 'react';
import { HiUserAdd } from "react-icons/hi";
import { ImHome } from "react-icons/im";
import { IoLogOut } from "react-icons/io5";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { isCallModalOpen, resetUtilSlice, setDashboardIndex, setOnlineUsers,  } from '../../utils/utilSlice';
import { useDispatch, useSelector } from 'react-redux';
import getPersonalChats from '../hooks/getPersonalChats';
import { UseSocket } from '../hooks/UseSocket';
import { resetUserSlice } from '../../utils/userSlice.js';
import logo from '../assets/logo.png';
import { Navigate } from 'react-router-dom';
import { resetChatSlice } from '../../utils/chatSlice.js';
const Sidebar = ({showModal,setShowModal}) => {
    getPersonalChats()
    const dispatch = useDispatch();
    const user = useSelector(state=>state.CurrUser.user);
    const index = useSelector(state=>state.GlobalUtil.utils.index);

    const handleLogout = async()=>{ 
        dispatch(resetUserSlice())
        dispatch(resetChatSlice())
        dispatch(resetUtilSlice())
        const response = await fetch(`${import.meta.env.VITE_API_PATH}/api/auth/logout`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const data = response.json();
        if(data.success){
            return <Navigate to="/sign-up" replace />;
        }
    }
    const handleClick = (index)=>{
        setShowModal(true);
    }
    return (
        <div className='w-[65px] flex flex-col bg-[#1d2437] items-center justify-center gap-16 py-9 px-4 relative'>
            <div className='w-16 h-16 absolute left-0 top-2'>
                <img src={logo} alt='logo' className='w-full h-full object-fill rounded-lg scale-[110%]'/>
            </div>
            
            <ImHome id='0' onClick={()=>dispatch(setDashboardIndex(0))} className={` duration-100 ease-in-out cursor-pointer text-2xl ${index == 0 ? 'text-[#dd1d5d]' : 'text-white'}`}/>
            <HiChatBubbleBottomCenterText id='1' onClick={()=>dispatch(setDashboardIndex(1))} className={` duration-100 ease-in-out cursor-pointer text-2xl ${index == 1 ? 'text-[#dd1d5d]' : 'text-white'}`}/>
            <HiUserAdd id='3' onClick={()=>handleClick()} className={` duration-100 ease-in-out cursor-pointer text-2xl hover:text-[#dd1d5deb] text-white`}/>
            <IoLogOut id='4' onClick={handleLogout} className='text-red-600 text-2xl cursor-pointer hover:text-red-800 duration-150 ease-in-out'/>
        </div>
    );
}

export default Sidebar;
