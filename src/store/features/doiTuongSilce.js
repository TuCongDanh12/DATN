import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";
import doiTuongService from "../../services/doiTuong.service";

export const getListSupplier = createAsyncThunk(
    "doiTuong/getListSupplier",
    async (thunkAPI) => {
        try {
            const response = await doiTuongService.getListSupplier();
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getSupplier = createAsyncThunk(
    "doiTuong/getSupplier",
    async ({ id }, thunkAPI) => {
        try {
            const response = await doiTuongService.getSupplier({ id });
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const postSupplier = createAsyncThunk(
    "doiTuong/postSupplier",
    async ({ values }, thunkAPI) => {
        try {
            console.log("values", values)
            const response = await doiTuongService.postSupplier({values});
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);






export const getListSupplierGroup = createAsyncThunk(
    "doiTuong/getListSupplierGroup",
    async (thunkAPI) => {
        try {
            const response = await doiTuongService.getListSupplierGroup();
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getSupplierGroup = createAsyncThunk(
    "doiTuong/getSupplierGroup",
    async ({ id }, thunkAPI) => {
        try {
            const response = await doiTuongService.getSupplierGroup({ id });
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const postSupplierGroup = createAsyncThunk(
    "doiTuong/postSupplierGroup",
    async ({ values }, thunkAPI) => {
        try {
            const response = await doiTuongService.postSupplierGroup({ values });
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
    isSuccess: false,
    isSuccessGetListSupplier: false,
    isSuccessPostSupplier: false,
    isSuccessGetListSupplierGroup: false,
    isSuccessPostSupplierGroup: false,
    isError: false,
    message: "",
    listSupplierData: [],
    supplierData: {},
    listSupplierGroupData: [],
    supplierGroupData: {},
};

export const doiTuongSlice = createSlice({
    name: "doiTuong",
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccessGetListSupplier = false;
            state.isSuccessPostSupplier = false;
            state.isSuccessGetListSupplierGroup = false;
            state.isSuccessPostSupplierGroup = false;
            state.isFetching = false;
            state.message = "";
            return state;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getListSupplier.pending, (state) => {
            console.log("getListSupplier.pending", state)
            state.isFetching = true;
        })

        builder.addCase(getListSupplier.fulfilled, (state, action) => {
            console.log("getListSupplier.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccessGetListSupplier = true;
            state.listSupplierData = action.payload.result.data.map(item=>{return {...item, key: item.id, supplierGroup:item.supplierGroup.id}});
            //   state.message = action.payload.message;
        })

        builder.addCase(getListSupplier.rejected, (state, action) => {
            console.log("getListSupplier.rejected", action)
            state.isFetching = false;
            state.isError = true;
            //   state.message = action.payload.message;
        })

        builder.addCase(getSupplier.pending, (state) => {
            console.log("getSupplier.pending", state)
            state.isFetching = true;
        })

        builder.addCase(getSupplier.fulfilled, (state, action) => {
            console.log("getSupplier.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccess = true;
            state.supplierData = {...action.payload.result.data, key: action.payload.result.data.id, supplierGroup:action.payload.result.data.supplierGroup.id};

            //   state.message = action.payload.message;
        })

        builder.addCase(getSupplier.rejected, (state, action) => {
            console.log("getSupplier.rejected", action)
            state.isFetching = false;
            state.isError = true;
            //   state.message = action.payload.message;
        })

        builder.addCase(postSupplier.pending, (state) => {
            console.log("postSupplier.pending", state)
            state.isFetching = true;
        })

        builder.addCase(postSupplier.fulfilled, (state, action) => {
            console.log("postSupplier.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccessPostSupplier = true;
            state.supplierData = action.payload;
            //   state.message = action.payload.message;
        })

        builder.addCase(postSupplier.rejected, (state, action) => {
            console.log("postSupplier.rejected", action)
            state.isFetching = false;
            state.isError = true;
            //   state.message = action.payload.message;
        })









        builder.addCase(getListSupplierGroup.pending, (state) => {
            console.log("getListSupplierGroup.pending", state)
            state.isFetching = true;
        })

        builder.addCase(getListSupplierGroup.fulfilled, (state, action) => {
            console.log("getListSupplierGroup.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccessGetListSupplierGroup = true;
            state.listSupplierGroupData = action.payload.result.data.map(item=>{return {...item, key: item.id, size:item.suppliers.length}});
            //   state.message = action.payload.message;
        })

        builder.addCase(getListSupplierGroup.rejected, (state, action) => {
            console.log("getListSupplierGroup.rejected", action)
            state.isFetching = false;
            state.isError = true;
            //   state.message = action.payload.message;
        })

        builder.addCase(getSupplierGroup.pending, (state) => {
            console.log("getSupplierGroup.pending", state)
            state.isFetching = true;
        })

        builder.addCase(getSupplierGroup.fulfilled, (state, action) => {
            console.log("getSupplierGroup.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccess = true;
            state.supplierGroupData = action.payload.result.data;
            //   state.message = action.payload.message;
        })

        builder.addCase(getSupplierGroup.rejected, (state, action) => {
            console.log("getSupplierGroup.rejected", action)
            state.isFetching = false;
            state.isError = true;
            //   state.message = action.payload.message;
        })

        builder.addCase(postSupplierGroup.pending, (state) => {
            console.log("postSupplierGroup.pending", state)
            state.isFetching = true;
        })

        builder.addCase(postSupplierGroup.fulfilled, (state, action) => {
            console.log("postSupplierGroup.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccessPostSupplierGroup = true;
            state.SupplierGroupData = action.payload;
            //   state.message = action.payload.message;
        })

        builder.addCase(postSupplierGroup.rejected, (state, action) => {
            console.log("postSupplierGroup.rejected", action)
            state.isFetching = false;
            state.isError = true;
            //   state.message = action.payload.message;
        })


    },
});

export const { clearState } = doiTuongSlice.actions;

export const doiTuongSelector = (state) => state.doiTuong;