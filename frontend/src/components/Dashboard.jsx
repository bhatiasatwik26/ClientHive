import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import SideBar from "./Sidebar.jsx";
import ChatWindow from "./ChatWIndow.jsx";
import Modal from "./Modal.jsx";
import CallModal from "./CallModal.jsx";
import ChatAnalysis from "./ChatAnalysis.jsx";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const [showModal,setShowModal] = useState(false);
    const index = useSelector((state)=>state.GlobalUtil.utils.index);
    const isCallModalOpen = useSelector(state => state.GlobalUtil.utils.isCallModalOpen);
    const currUser = useSelector(state=>state.CurrUser.user)

    useEffect(() => {
        if (currUser && Object.keys(currUser).length > 0) {
            toast.success(`Welcome ${currUser.username}`);
        }
    }, [currUser]);

    if( currUser === null || currUser==undefined || Object.keys(currUser).length === 0){
        return <Navigate to="/sign-up" replace />;
    }
    const components = [ <Profile/>, <ChatWindow />];
    
    
    return (
        <div className="w-full h-full flex">
            <SideBar showModal={showModal} setShowModal={setShowModal}/>
            <div className="w-full p-5 pl-0 bg-[#1d2437]">
                {components[index]}
                {showModal ? <Modal setShowModal={setShowModal}/>:null}
                {false && <CallModal />}
                {/* {<ChatAnalysis />} */}
            </div>
        </div>
    );
};

export default Dashboard;
