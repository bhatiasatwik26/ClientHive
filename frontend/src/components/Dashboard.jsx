import { useState } from "react";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import SideBar from "./Sidebar.jsx";
import ChatWindow from "./ChatWIndow.jsx";

const Dashboard = () => {
    const index = useSelector((state)=>state.GlobalUtil.utils.index)
    const components = [ <Profile/>];
    return (
        <div className="w-full h-full flex">
            <SideBar/>
            <div className="w-full p-5 pl-0 bg-[#1d2437]">
                <ChatWindow />
                {/* {components[0]} */}
            </div>
        </div>
    );
};

export default Dashboard;
