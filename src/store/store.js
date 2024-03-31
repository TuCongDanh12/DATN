import { configureStore } from "@reduxjs/toolkit";
import { authenticationSlice } from "./features/authenticationSlice";
import { muahangSlice } from "./features/muahangSlice";
import { doiTuongSlice } from "./features/doiTuongSilce";

const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
    muahang: muahangSlice.reducer,
    doiTuong: doiTuongSlice.reducer,
  },
});

export default store;
