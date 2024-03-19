import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";
import muahangService from "../../services/muahang.service";

export const getListDonMuahang = createAsyncThunk(
  "muahang/getListDonMuahang",
  async (thunkAPI) => {
    try {
      const response = await muahangService.getListDonMuahang();
      // thunkAPI.dispatch(setMessage(response.data.message));
      // console.log(response)
      console.log(response)
      return response.data;
    } catch (error) {
      console.log("error",error)
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // thunkAPI.dispatch(setMessage(message));
      
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



export const logout = createAsyncThunk(
  "authentication/logout",
  async (thunkAPI) => {
    try {
      const response = await authService.logout();
      localStorage.removeItem("user");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  message: "",
  data: []
};

export const muahangSlice = createSlice({
  name: "muahang",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.message = "";
      return state;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getListDonMuahang.pending, (state) => {
      console.log("getListDonMuahang.pending", state)
      state.isFetching = true;
    })

    builder.addCase(getListDonMuahang.fulfilled, (state, action) => {
      console.log("getListDonMuahang.fulfilled", action.payload)
      state.isFetching = false;
      state.isSuccess = true;
      state.data = action.payload;
      state.message = action.payload.message;
    })

    builder.addCase(getListDonMuahang.rejected, (state, action) => {
      console.log("getListDonMuahang.rejected", action)
      state.isFetching = false;
      state.isError = true;
    //   state.message = action.payload.message;
    })

    
  },
});

export const { clearState } = muahangSlice.actions;

export const muahangSelector = (state) => state.muahang;