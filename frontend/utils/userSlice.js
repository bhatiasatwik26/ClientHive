import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {unreadMsg: {}},
  },
  reducers: {
    signInSuccess: (state, action) => {
      state.user = {...state.user, ...action.payload};
    },
    updateUser: (state, action) => {
      state.user = {...state.user, ...action.payload};
    },
    resetUserSlice: (state) => {
      state.user = {unreadMsg: {}};
    },
    setUnreadMsg: (state, action) => {
      let prevCount = state.user.unreadMsg[action.payload];
      state.user = {...state.user, unreadMsg: {...state.user.unreadMsg, [action.payload]: prevCount ? prevCount+1 : 1}};
    },
    markUnreadMsg: (state, action) => {
      if (state.user.unreadMsg && action.payload in state.user.unreadMsg) {
        delete state.user.unreadMsg[action.payload];
    }
    }
  },
});

export const { signInSuccess, updateUser, resetUserSlice, setUnreadMsg, markUnreadMsg } = userSlice.actions;

export default userSlice.reducer;
