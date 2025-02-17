import { createSlice } from "@reduxjs/toolkit";

const utilSlice = createSlice({
  name: "utils",
  initialState: {
    utils: { index: 0, onlineList: [], isCallModalOpen: false, isChatAnalyticsOpen: false},
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
    setChatAnalyticsOpen: (state, action) => {
      state.utils.isChatAnalyticsOpen = action.payload;
    },
    resetUtilSlice: (state) => {
      state.utils = { index: 0, onlineList: [], isCallModalOpen: false, isChatAnalyticsOpen: false};
    },
  },
});

export const { setDashboardIndex, setOnlineUsers, isCallModalOpen, setChatAnalyticsOpen, resetUtilSlice } = utilSlice.actions;

export default utilSlice.reducer;
