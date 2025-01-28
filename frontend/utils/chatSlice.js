import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chats: {personal: [], typing: null, selectedChat: null, currMsg: []},
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
    },
    setTyping: (state, action) => {
      state.chats = {...state.chats, typing: action.payload};
    },
    resetChatSlice : (state) => {
      state.chats = {personal: [], typing: null, selectedChat: null, currMsg: []};
    }   
  }
});

export const { setPersonalChats, setGroupChats, setSelectedChat, updateCurrMsg, clearMsg, setTyping, resetChatSlice } = chatSlice.actions;

export default chatSlice.reducer;
