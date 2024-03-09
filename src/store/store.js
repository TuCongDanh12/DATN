import { configureStore } from "@reduxjs/toolkit";
import { authenticationSlice } from "./features/authenticationSlice";

const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
  },
});

export default store;
