import { createSlice } from "@reduxjs/toolkit";

const callSlice = createSlice({
  name: "chats",
  initialState: {
    localStream: null, remoteStream: null, callingUser: null, type: null
  },
  reducers: {
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
    setRemoteStream: (state, action) => {
      state.remoteStream = action.payload;
    },
    setCallingUser: (state, action) => {
      state.callingUser = action.payload;
    },  
    setType: (state, action) => {
      state.type = action.payload;
    },
    resetCallSlice : (state) => {
      state.localStream = null;
      state.remoteStream = null;
      state.callingUser = null;
      state.type = null;
    },
  }
});

export const { setLocalStream, setRemoteStream, resetCallSlice, setCallingUser, setType } = callSlice.actions;

export default callSlice.reducer;
