import { createSlice } from "@reduxjs/toolkit";

const utilSlice = createSlice({
  name: "utils",
  initialState: {
    utils: { index: 0, onlineList: [], isCallModalOpen: false},
  },
  reducers: {
    setDashboardIndex: (state, action) => {
      state.utils.index = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.utils.onlineList = action.payload;
    },
    isCallModalOpen: (state, action) => {
      state.utils.isCallModalOpen = action.payload;
    },
  },
});

export const { setDashboardIndex, setOnlineUsers, isCallModalOpen } = utilSlice.actions;

export default utilSlice.reducer;
