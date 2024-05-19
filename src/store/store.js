import { configureStore } from "@reduxjs/toolkit";
import { authenticationSlice } from "./features/authenticationSlice";
import { muahangSlice } from "./features/muahangSlice";
import { doiTuongSlice } from "./features/doiTuongSilce";
import { banHangSlice } from "./features/banHangSlice";
import { congNoSlice } from "./features/congNoSlice";
import { baoCaoSlice } from "./features/baoCaoSlice";

const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
    muahang: muahangSlice.reducer,
    doiTuong: doiTuongSlice.reducer,
    banHang: banHangSlice.reducer,
    congNo: congNoSlice.reducer,
    baoCao: baoCaoSlice.reducer,
  },
});

export default store;
