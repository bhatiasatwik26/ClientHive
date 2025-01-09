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
            {components[index]}
        </div>
    );
};

export default Dashboard;
