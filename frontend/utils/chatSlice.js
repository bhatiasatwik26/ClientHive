import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chats: {personal: [], group: [], selectedChat: null, currMsg: []},
  },
  reducers: {
    setPersonalChats: (state, action) => {
      state.chats = {...state.chats, personal: action.payload};
    },
    setGroupChats: (state, action) => {
      state.chats = {...state.chats, group: action.payload};
    },
    setSelectedChat: (state, action) => {
      state.chats.selectedChat = action.payload;
    },
    updateCurrMsg: (state, action) => {
      const newMessages = Array.isArray(action.payload) ? action.payload : [action.payload];
      state.chats = { 
        ...state.chats, 
        currMsg: [...state.chats.currMsg, ...newMessages] 
      };
    },
    clearMsg: (state) => {
      state.chats = {...state.chats, currMsg: []};
    }
  }
});

export const { setPersonalChats, setGroupChats, setSelectedChat, updateCurrMsg, clearMsg } = chatSlice.actions;

export default chatSlice.reducer;
