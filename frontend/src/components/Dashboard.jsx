import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import SideBar from "./Sidebar.jsx";
import ChatWindow from "./ChatWIndow.jsx";
import Modal from "./Modal.jsx";
import CallModal from "./CallModal.jsx";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { UseSocket } from "../hooks/UseSocket.jsx";
import ChatAnalysis from "./ChatAnalysis.jsx";

const Dashboard = () => {

    const {connectSocket, getOnlineUsers, disconnectSocket, listenToMessage, listenToTyping, listenToAddChat, listenToIncomingCall} = UseSocket();

    const [socket, setSocket] = useState(null);
    
    const [showModal,setShowModal] = useState(false);

    const index = useSelector((state)=>state.GlobalUtil.utils.index);
    const isCallModalOpen = useSelector(state => state.GlobalUtil.utils.isCallModalOpen);
    const currUser = useSelector(state=>state.CurrUser.user)
    const userId = useSelector(state=>state.CurrUser.user._id);
    const isChatAnalyticsOpen = useSelector(state => state.GlobalUtil.utils.isChatAnalyticsOpen);
    
    useEffect(()=>{
        toast.success("Welcome "+currUser.username+" !!!");   
        setSocket(connectSocket(userId));
        return ()=>{disconnectSocket(socket)};
    },[])

    useEffect(()=>{
        if(socket){
            getOnlineUsers(socket);
            listenToMessage(socket);
            listenToTyping(socket);
            listenToAddChat(socket);
            listenToIncomingCall(socket);
        }
    }, [socket])

    if(currUser === null || currUser==undefined || Object.keys(currUser).length === 1)
    {
        return <Navigate to="/sign-up" replace />;
    }
    const components = [ <Profile />,<ChatWindow socket={socket}/>];
    
    return (
        <div className="w-full h-full flex">
            <SideBar showModal={showModal} setShowModal={setShowModal}/>
            <div className="w-full p-6 pl-0 bg-[#1d2437]">
                {components[index]}
                {showModal ? <Modal setShowModal={setShowModal} socket={socket}/>:null}
                {isCallModalOpen && <CallModal socket={socket} />}
                {isChatAnalyticsOpen && <ChatAnalysis/>}
            </div>
        </div>
    );
};

export default Dashboard;
