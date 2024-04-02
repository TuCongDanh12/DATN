import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";
import banHangService from "../../services/banHang.service";

export const getListDonBanHang = createAsyncThunk(
    "banHang/getListDonBanHang",
    async (thunkAPI) => {
        try {
            const response = await banHangService.getListDonBanHang();
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getDonBanHang = createAsyncThunk(
    "banHang/getDonBanHang",
    async ({ id }, thunkAPI) => {
        try {
            const response = await banHangService.getDonBanHang({ id });
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const postDonBanHang = createAsyncThunk(
    "banHang/postDonBanHang",
    async ({ values }, thunkAPI) => {
        try {
            console.log("values", values)
            const response = await banHangService.postDonBanHang({ values });
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    isFetching: false,

    isSuccessGetListDonBanHang: false,
    isSuccessPostDonBanHang: false,

    isError: false,
    message: "",

    listDonBanHangData: [],
    donBanHangData: {},
};


export const banHangSlice = createSlice({
    name: "banHang",
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;

            state.isSuccessGetListDonBanHang = false;
            state.isSuccessPostDonBanHang = false;

            state.isFetching = false;
            state.message = "";
            return state;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getListDonBanHang.pending, (state) => {
            console.log("getListDonBanHang.pending", state)
            state.isFetching = true;
        })

        builder.addCase(getListDonBanHang.fulfilled, (state, action) => {
            console.log("getListDonBanHang.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccessGetListDonBanHang = true;
        
            state.listDonBanHangData = action.payload.result.data.map(item => { return { ...item, key: item.id, customer: item.customer.name } });
            //   state.message = action.payload.message;
        })

        builder.addCase(getListDonBanHang.rejected, (state, action) => {
            console.log("getListDonBanHang.rejected", action)
            state.isFetching = false;
            state.isError = true;
            //   state.message = action.payload.message;
        })

        builder.addCase(getDonBanHang.pending, (state) => {
            console.log("getDonBanHang.pending", state)
            state.isFetching = true;
        })

        builder.addCase(getDonBanHang.fulfilled, (state, action) => {
            console.log("getDonBanHang.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccess = true;
            state.donBanHangData =
            {
                ...action.payload.result.data,
                key: action.payload.result.data.id,
                salesperson: action.payload.result.data.salesperson.name,
                address: action.payload.result.data.customer.address,
                namecCustomer: action.payload.result.data.customer.name,

            };

            //   state.message = action.payload.message;
        })

        builder.addCase(getDonBanHang.rejected, (state, action) => {
            console.log("getDonBanHang.rejected", action)
            state.isFetching = false;
            state.isError = true;
            //   state.message = action.payload.message;
        })

        builder.addCase(postDonBanHang.pending, (state) => {
            console.log("postDonBanHang.pending", state)
            state.isFetching = true;
        })

        builder.addCase(postDonBanHang.fulfilled, (state, action) => {
            console.log("postDonBanHang.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccessPostDonBanHang = true;
            state.donBanHangData = action.payload;
            //   state.message = action.payload.message;
        })

        builder.addCase(postDonBanHang.rejected, (state, action) => {
            console.log("postDonBanHang.rejected", action)
            state.isFetching = false;
            state.isError = true;
            //   state.message = action.payload.message;
        })

    }
});

export const { clearState } = banHangSlice.actions;

export const banHangSelector = (state) => state.banHang;