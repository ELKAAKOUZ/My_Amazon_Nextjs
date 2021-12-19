import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";
import darkModeReducer from "../slices/darkmode-slice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    darkMode: darkModeReducer,
  },
});
