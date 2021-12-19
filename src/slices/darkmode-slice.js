import { createSlice } from "@reduxjs/toolkit";
const darkSlice = createSlice({
  name: "darkmode",
  initialState: {
    onDarkMode: false,
  },
  reducers: {
    toggleDarkMode(state) {
      state.onDarkMode = !state.onDarkMode;
    },
  },
});
export default darkSlice.reducer;
export const { toggleDarkMode } = darkSlice.actions;
