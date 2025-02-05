import { createSlice } from "@reduxjs/toolkit";

const callSlice = createSlice({
  name: "chats",
  initialState: {localStream: null, remoteStream: null, callingUser: null},
  reducers: {
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
    setCallingUser: (state, action) => {
      state.callingUser = action.payload;
    },  
    resetCallSlice : (state) => {
      state = initialState;
    },
  }
});

export const { setLocalStream, setRemoteStream, resetCallSlice, setCallingUser } = callSlice.actions;

export default callSlice.reducer;
