import { useState } from "react";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import Chat from "./Chat.jsx";
import SideBar from "./Sidebar.jsx";

const Dashboard = () => {
    const index = useSelector((state)=>state.GlobalUtil.utils.index)
    const components = [<Profile/>, <Chat/>];
    return (
        <div className="w-full h-full flex">
            <SideBar/>
            <div className="flex-1 h-full bg-[#1e202c] p-5 pl-0">
                {components[index]}
            </div>
        </div>
    );
};

export default Dashboard;
