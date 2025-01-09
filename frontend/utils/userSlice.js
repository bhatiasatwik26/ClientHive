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
  },
});

export const { signInSuccess, updateUser } = userSlice.actions;

export default userSlice.reducer;
