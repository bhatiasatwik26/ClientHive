import { createSlice } from "@reduxjs/toolkit";

const utilSlice = createSlice({
  name: "utils",
  initialState: {
    utils: { index: 0, onlineList: []},
    
  },
  reducers: {
    setDashboardIndex: (state, action) => {
      state.utils.index = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.utils.onlineList = action.payload;
    }
  },
});

export const { setDashboardIndex, setOnlineUsers } = utilSlice.actions;

export default utilSlice.reducer;
