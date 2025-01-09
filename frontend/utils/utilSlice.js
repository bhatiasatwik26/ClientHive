import { createSlice } from "@reduxjs/toolkit";

const utilSlice = createSlice({
  name: "utils",
  initialState: {
    utils: { index: 0 },
  },
  reducers: {
    setDashboardIndex: (state, action) => {
      state.utils.index = action.payload;
    },
  },
});

export const { setDashboardIndex } = utilSlice.actions;

export default utilSlice.reducer;
