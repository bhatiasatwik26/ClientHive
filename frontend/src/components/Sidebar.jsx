import React from 'react';
import { MdGroupAdd } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";
import { ImHome } from "react-icons/im";
import { IoLogOut } from "react-icons/io5";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { setDashboardIndex } from '../../utils/utilSlice';
import { useDispatch } from 'react-redux';
import getPersonalChats from '../hooks/getPersonalChats';

const Sidebar = () => {
    getPersonalChats()
    const dispatch = useDispatch();

    const setInd = (e) => {
        dispatch(setDashboardIndex(e.target.id));  
    }

    return (
        <div className='w-[65px] flex flex-col bg-[#1d2437] items-center justify-center gap-16 py-9 duration-300 px-4'>
            <ImHome id='0' onClick={()=>dispatch(setDashboardIndex(0))} className={'text-white text-2xl cursor-pointer'}/>
            <HiChatBubbleBottomCenterText id='1' onClick={()=>dispatch(setDashboardIndex(1))} className={'text-white text-3xl cursor-pointer'}/>
            <MdGroupAdd id='2' className='text-white text-2xl cursor-pointer'/>
            <HiUserAdd id='3' className='text-white text-2xl cursor-pointer'/>
            <IoLogOut id='4' className='text-red-600 text-2xl'/>
        </div>
    );
}

export default Sidebar;
