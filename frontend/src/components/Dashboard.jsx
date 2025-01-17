import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import SideBar from "./Sidebar.jsx";
import ChatWindow from "./ChatWIndow.jsx";
import Modal from "./Modal.jsx";

const Dashboard = () => {
    const [showModal,setShowModal] = useState(false);
    const index = useSelector((state)=>state.GlobalUtil.utils.index)
    const components = [ <Profile/>, <ChatWindow />];
    
    return (
        <div className="w-full h-full flex">
            <SideBar showModal={showModal} setShowModal={setShowModal}/>
            <div className="w-full p-5 pl-0 bg-[#1d2437]">
                {components[index]}
                {showModal ? <Modal setShowModal={setShowModal}/>:null}
            </div>
        </div>
    );
};

export default Dashboard;
