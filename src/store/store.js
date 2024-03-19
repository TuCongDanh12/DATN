import { configureStore } from "@reduxjs/toolkit";
import { authenticationSlice } from "./features/authenticationSlice";
import { muahangSlice } from "./features/muahangSlice";

const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
    muahang: muahangSlice.reducer,
  },
});

export default store;
