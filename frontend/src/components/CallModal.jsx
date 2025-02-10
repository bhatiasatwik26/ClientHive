import React, { useEffect, useRef, useState } from 'react'
import { isCallModalOpen } from '../../utils/utilSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { setLocalStream, setRemoteStream, resetCallSlice } from '../../utils/callSlice.js'
import { toast } from 'react-hot-toast';
// import ReactPlayer from 'react-player';
import { IoMicOutline } from "react-icons/io5";
import { IoMicOffOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import { IoVideocamOffOutline } from "react-icons/io5";
import { PiPhoneDisconnect } from "react-icons/pi";
import peer from '../../utils/peer.js';

const CallModal = ({ socket }) => {

  // useEffect(() => {
  //   callEventListeners();
  //   if(type == 'caller')
  //     startCall();
  //   else
  //     recieveCall(); 
  //   return () => {
  //     console.log(localStream);
  //     dispatch(resetCallSlice());
  //     resetListeners();
  //   };
  // }, []);

  // const callEventListeners = () => {
  //   if(!socket)
  //     return;
  //   socket.on('incomingCall', (data) => {
  //     dispatch(isCallModalOpen(true));
  //     dispatch(setCallingUser(data.from));
  //     dispatch(setType('reciever'));
  //   });
  //   socket.on('callNotAnswered', (message) => {
  //     dispatch(isCallModalOpen(false));
  //     toast.error(message);
  //   });
  //   socket.on('callAnswered', (data) => {
            
  //   });
  // }

  // const resetListeners = () => {
  //   socket.off('incomingCall');
  //   socket.off('callNotAnswered');
  //   socket.off('callAnswered');
  // }


  // const dispatch = useDispatch();
  // const callingUser = useSelector(state=>state.Call.callingUser);
  // const currUser = useSelector(state=>state.CurrUser.user);
  // // const [localStream, setLocalStream] = useState(null);
  // const type = useSelector(state=>state.Call.type);
  // const localStream = useSelector(state=>state.Call.localStream);
  
  


  // const startCall = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       video: true,
  //       audio: true
  //     });
  //     dispatch(setLocalStream(stream));
  //   } 
  //   catch (error) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  //   const offer = await peer.getOffer();
  //   socket && socket.emit('startCall', {
  //     offer,
  //     to: callingUser._id,
  //     from: currUser._id
  //   });
    
  // }
  // const recieveCall = async () => {
  // }
  
  return (
    <div className='h-[100%] w-[100%] absolute top-0 left-0 bg-[#222a3f] z-50 flex flex-col items-center justify-center'>
      {/* <div className='w-full h-[80%] flex items-center justify-center p-10 gap-10'>
        <div className='w-[50%] h-full'>
        <ReactPlayer playing muted height="100%" width="100%" 
        style={{objectFit: 'cover'}} 
        url={localStream}
        />        
        </div>
        <div className='w-[50%] h-full rounded-lg'>
        <ReactPlayer playing muted height="100%" width="100%" 
        style={{objectFit: 'cover'}} 
        url={localStream}
        />        
        </div>
      </div>
      <div className='w-full h-[20%] flex items-center justify-center gap-20 bg-[#222a3f]'>
        <IoVideocamOutline className='text-3xl text-[#dd1d5d] cursor-pointer'/>
        <IoMicOutline className='text-3xl text-[#dd1d5d] cursor-pointer'/>
        <PiPhoneDisconnect onClick={()=>dispatch(isCallModalOpen(false))} className='text-3xl text-[#dd1d5d] cursor-pointer'/>
      </div> */}
    </div>
  )
}

export default CallModal