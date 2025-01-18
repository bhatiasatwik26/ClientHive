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
import { signInSuccess } from '../../utils/userSlice.js';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
const Sidebar = ({showModal,setShowModal}) => {

    getPersonalChats();
    const {connectSocket, getOnlineUsers, disconnectSocket, listenToMessage} = UseSocket();
    const userId = useSelector(state=>state.CurrUser.user._id);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    useEffect(()=>{
        const socket = connectSocket(userId);
        getOnlineUsers(socket);
        listenToMessage(socket);
        return ()=>{socket.disconnect()}
    }, [])
    
    const index = useSelector(state=>state.GlobalUtil.utils.index);

    const handleLogout = (chat)=>{ 
        dispatch(signInSuccess(null));
        navigate('/sign-in');
    }
    const handleClick = (index)=>{
        setShowModal(true);
    }
    return (
        <div className='w-[65px] flex flex-col bg-[#1d2437] items-center justify-center gap-16 py-9 px-4 relative'>
            <div className='w-16 h-16 absolute left-0 top-0'>
                <img src={logo} alt='logo' className='w-full h-full object-fill rounded-lg scale-[105%]'/>
            </div>
            
            <ImHome id='0' onClick={()=>dispatch(setDashboardIndex(0))} className={` duration-100 ease-in-out cursor-pointer text-2xl ${index == 0 ? 'text-[#dd1d5d]' : 'text-white'}`}/>
            <HiChatBubbleBottomCenterText id='1' onClick={()=>dispatch(setDashboardIndex(1))} className={` duration-100 ease-in-out cursor-pointer text-2xl ${index == 1 ? 'text-[#dd1d5d]' : 'text-white'}`}/>
            <MdGroupAdd id='2' onClick={()=>handleClick()} className={` duration-100 ease-in-out cursor-pointer text-2xl ${showModal ? 'text-[#dd1d5d]' : 'text-white'}`}/>
            <HiUserAdd id='3' onClick={()=>handleClick()} className={` duration-100 ease-in-out cursor-pointer text-2xl ${showModal ? 'text-[#dd1d5d]' : 'text-white'}`}/>
            <IoLogOut id='4' onClick={handleLogout} className='text-red-600 text-2xl cursor-pointer hover:text-red-700 duration-150 ease-out'/>
        </div>
    );
}

export default Sidebar;
