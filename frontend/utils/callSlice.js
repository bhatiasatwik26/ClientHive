import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  localStream: null,
  remoteStream: null,
  isCallActive: false,
  isCaller: false,
  isReceivingCall: false,
  isVideoEnabled: true,
  isAudioEnabled: true,
  targetUserId: null,
  peerConnection: null,
};

const callSlice = createSlice({
  name: 'callSlice',
  initialState,
  reducers: {
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
    setRemoteStream: (state, action) => {
      state.remoteStream = action.payload;
    },
    setIsCallActive: (state, action) => {
      state.isCallActive = action.payload;
    },
    setIsCaller: (state, action) => {
      state.isCaller = action.payload;
    },
    setIsReceivingCall: (state, action) => {
      state.isReceivingCall = action.payload;
    },
    setIsVideoEnabled: (state, action) => {
      state.isVideoEnabled = action.payload;
    },
    setIsAudioEnabled: (state, action) => {
      state.isAudioEnabled = action.payload;
    },
    setTargetUserId: (state, action) => {
      state.targetUserId = action.payload;
    },
    setPeerConnection: (state, action) => {
      state.peerConnection = action.payload;
    },
    resetSlice: (state) => {
      return initialState;
    },
  },
});

export const {
  setLocalStream,
  setRemoteStream,
  setIsCallActive,
  setIsCaller,
  setIsReceivingCall,
  setIsVideoEnabled,
  setIsAudioEnabled,
  setTargetUserId,
  setPeerConnection,
  resetSlice,
} = callSlice.actions;

export default callSlice.reducer;
