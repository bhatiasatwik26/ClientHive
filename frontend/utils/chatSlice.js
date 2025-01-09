import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chats: {personal: [], group: [], selectedChat: null},
  },
  reducers: {
    setPersonalChats: (state, action) => {
      state.chats = {...state.chats, personal: action.payload};
    },
    setGroupChats: (state, action) => {
      state.chats = {...state.chats, group: action.payload};
    },
    setSelectedChat: (state, action) => {
      state.chats = {...state.chats, selectedChat: action.payload};
    },  
  },
});

export const { setPersonalChats, setGroupChats, setSelectedChat } = chatSlice.actions;

export default chatSlice.reducer;
