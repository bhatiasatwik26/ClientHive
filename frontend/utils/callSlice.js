import { createSlice } from "@reduxjs/toolkit";

const callSlice = createSlice({
  name: "chats",
  initialState: {
    localStream: null, remoteStream: null, callingUser: null, type: null
  },
  reducers: {
    setLocalStream: (state, action) => {
      console.log(action.payload);
      state.localStream = action.payload;
    },
    setCallingUser: (state, action) => {
      state.callingUser = action.payload;
    },  
    setType: (state, action) => {
      state.type = action.payload;
    },
    resetCallSlice : (state) => {
      console.log('resetting')
      state.localStream = null;
      state.remoteStream = null;
      state.callingUser = null;
      state.type = null;
    },
  }
});

export const { setLocalStream, setRemoteStream, resetCallSlice, setCallingUser, setType } = callSlice.actions;

export default callSlice.reducer;
