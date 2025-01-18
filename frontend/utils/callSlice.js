import { createSlice } from "@reduxjs/toolkit";

const callSlice = createSlice({
  name: "callSlice",
  initialState: {
    call: {callStatus: null, localStream: null, remoteStream: null, peerConnection: null, offerData: null, typeOfCall: null},
  },
  reducers: {
    setCallstatus: (state, action) => {
      state.call.callStatus = action.payload;
    },
    setLocalStream: (state, action) => {
      state.call.localStream = action.payload;
    },
    setRemoteStream: (state, action) => {
      state.call.remoteStream = action.payload;
    },
    setPeerConnection: (state, action) => {
        state.call.peerConnection = action.payload;
    },
    setOfferData: (state, action) => {
        state.call.offerData = action.payload;
    },
    setTypeOfCall: (state, action) => {
        state.call.typeOfCall = action.payload;
    },
    resetSlice: (state) => {
        state.call = {callStatus: null, localStream: null, remoteStream: null, peerConnection: null, offerData: null, typeOfCall: null};
  },
}
});


export const { setCallstatus, setLocalStream, setRemoteStream, setPeerConnection, setOfferData, setTypeOfCall, resetSlice } = callSlice.actions;

export default callSlice.reducer;
