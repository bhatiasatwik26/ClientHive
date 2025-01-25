import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    signInSuccess: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = {...state.user, ...action.payload};
    },
    resetUser: (state) => {
      state.user = {};
    },
  },
});

export const { signInSuccess, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
