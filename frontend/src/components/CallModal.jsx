import React, { useEffect, useRef, useState } from 'react'
import { isCallModalOpen } from '../../utils/utilSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { setLocalStream, setRemoteStream, resetCallSlice } from '../../utils/callSlice.js'
import { toast } from 'react-hot-toast';
import ReactPlayer from 'react-player';
import { IoMicOutline } from "react-icons/io5";
import { IoMicOffOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import { IoVideocamOffOutline } from "react-icons/io5";
import { PiPhoneDisconnect } from "react-icons/pi";
import peer from '../../utils/peer.js';
import { use } from 'react';
import { AppStore } from '../../utils/Appstore.js';
import { RiWifiOffLine } from "react-icons/ri";

const CallModal = ({ socket }) => {

  const dispatch = useDispatch();
  const callingUser = useSelector(state=>state.Call.callingUser);
  const currUser = useSelector(state=>state.CurrUser.user);
  const type = useSelector(state=>state.Call.type);
  const localStream = useSelector(state=>state.Call.localStream);
  const remoteStream = useSelector(state=>state.Call.remoteStream);
  console.log(localStream, remoteStream);
  

  useEffect(() => {
    callEventListeners();
    if(type == 'caller')
      initiateCall();
    else
      confirmCall();
    return () => {
      resetCallListeners();
      dispatch(resetCallSlice());
    }
  }, []);

  useEffect(() => {
    peer.peer.ontrack = e => dispatch(setRemoteStream(e.streams[0]));
    peer.peer.onnegotiationneeded = async () => {
      const offer = await peer.getOffer();
      socket && socket.emit('call:negotiation:needed', {
        offer,
        to: callingUser,
        from: currUser._id
      });
    }
  }, []);

  const callEventListeners = () => {
    if(!socket)
      return;
    socket.on('call:terminate:offline', () => {
      dispatch(isCallModalOpen(false));
      toast.error('User is offline',{
        icon: <RiWifiOffLine className='text-xl text-[#dd1d5d]'/>,
        duration: 1000
      });
    });
    socket.on('call:terminate:reject', () => {
      console.log('call rejected');
      dispatch(isCallModalOpen(false));
      toast.error('Call rejected');
    });
    socket.on('call:accept', sendOffer);
    socket.on('call:offer', sendAnswer);
    socket.on('call:answer', handleCallAccepted);
    socket.on('call:negotiation:needed', handleIncomingNegotiationRequest);
    socket.on('call:negotiation:done', handleIncomingNegotiationDone);
  }

  const initiateCall = async () => {
    console.log('initiate call');
    socket && socket.emit('call:initiate', {
      to: callingUser,
      from: currUser._id,
      name: currUser.username
    });
  }

  const confirmCall = async () => {
    console.log('confirm call');
    socket && socket.emit('call:accept', {
      to: callingUser,
      from: currUser._id
    });
  }

  const sendOffer = async () => {
    console.log('sending offer');
    try{
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      dispatch(setLocalStream(stream));
    }
    catch(error){
      console.log(error);
      toast.error(error.message);
    }
    const offer = await peer.getOffer();
    socket && socket.emit('call:offer', {
      offer,
      to: callingUser,
      from: currUser._id
    });
  }

  const sendAnswer = async ({ offer }) => {
    console.log('got offer, sending answer');
    try{
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      dispatch(setLocalStream(stream));
    }
    catch(error){
      console.log(error);
      toast.error(error.message);
    }
    const answer = await peer.getAnswer(offer);
    socket && socket.emit('call:answer', {
      answer,
      to: callingUser,
      from: currUser._id
    });
  }

  const handleCallAccepted = async ({ answer }) => {
    console.log('call accepted');
    await peer.setRemoteDescription(answer);
    sendStream();
  }

  const handleIncomingNegotiationRequest = async ({ offer }) => {
    const answer = await peer.getAnswer(offer);
    sendStream();
    socket && socket.emit('call:negotiation:done', {
      answer,
      to: callingUser,
      from: currUser._id
    });
  }

  const handleIncomingNegotiationDone = async ({ answer }) => {
    await peer.setRemoteDescription(answer);
  }

  const sendStream = () => {
    console.log('sending stream');
    const currentState = AppStore.getState();
    const localStream = currentState.Call.localStream;

    if (!localStream) {
        console.error("No local stream available.");
        return;
    }

    localStream.getTracks().forEach((track) => {
        const existingSender = peer.peer.getSenders().find(s => s.track?.kind === track.kind);
        
        if (existingSender) {
            existingSender.replaceTrack(track);  // ✅ Replace track instead of adding a new one
        } else {
            peer.peer.addTrack(track, localStream);  // ✅ Only add if not already added
        }
    });
};

  const resetCallListeners = () => {
    socket && socket.off('call:terminate:offline');
    socket && socket.off('call:terminate:reject');
    socket && socket.off('call:accept');
    socket && socket.off('call:offer');
    socket && socket.off('call:answer');
    socket && socket.off('call:negotiation:needed');
    socket && socket.off('call:negotiation:done');
  }
  
  return (
    <div className='h-[100%] w-[100%] absolute top-0 left-0 bg-[#222a3f] z-50 flex flex-col items-center justify-center'>
      <div className='w-full h-[80%] flex items-center justify-center p-10 gap-10'>
        <div className='w-[50%] h-full'>
        <ReactPlayer playing muted height="100%" width="100%" 
        style={{objectFit: 'cover'}} 
        url={localStream}
        />        
        </div>
        <div className='w-[50%] h-full rounded-lg'>
        <ReactPlayer playing muted height="100%" width="100%" 
        style={{objectFit: 'cover'}} 
        url={remoteStream}
        />        
        </div>
      </div>
      <div className='w-full h-[20%] flex items-center justify-center gap-20 bg-[#222a3f]'>
        <IoVideocamOutline className='text-3xl text-[#dd1d5d] cursor-pointer'/>
        <IoMicOutline className='text-3xl text-[#dd1d5d] cursor-pointer'/>
        <PiPhoneDisconnect onClick={()=>dispatch(isCallModalOpen(false))} className='text-3xl text-[#dd1d5d] cursor-pointer'/>
      </div>
    </div>
  )
}

export default CallModal