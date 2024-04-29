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






export const getListCustomerGroup = createAsyncThunk(
    "doiTuong/getListCustomerGroup",
    async (thunkAPI) => {
        try {
            const response = await doiTuongService.getListCustomerGroup();
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getCustomerGroup = createAsyncThunk(
    "doiTuong/getCustomerGroup",
    async ({ id }, thunkAPI) => {
        try {
            const response = await doiTuongService.getCustomerGroup({ id });
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const postCustomerGroup = createAsyncThunk(
    "doiTuong/postCustomerGroup",
    async ({ values }, thunkAPI) => {
        try {
            const response = await doiTuongService.postCustomerGroup({ values });
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);









export const getListCustomer = createAsyncThunk(
    "doiTuong/getListCustomer",
    async (thunkAPI) => {
        try {
            const response = await doiTuongService.getListCustomer();
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getCustomer = createAsyncThunk(
    "doiTuong/getCustomer",
    async ({ id }, thunkAPI) => {
        try {
            const response = await doiTuongService.getCustomer({ id });
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const postCustomer = createAsyncThunk(
    "doiTuong/postCustomer",
    async ({ values }, thunkAPI) => {
        try {
            console.log("values", values)
            const response = await doiTuongService.postCustomer({values});
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);













export const getListProductGroup = createAsyncThunk(
    "doiTuong/getListProductGroup",
    async (thunkAPI) => {
        try {
            const response = await doiTuongService.getListProductGroup();
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getProductGroup = createAsyncThunk(
    "doiTuong/getProductGroup",
    async ({ id }, thunkAPI) => {
        try {
            const response = await doiTuongService.getProductGroup({ id });
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const postProductGroup = createAsyncThunk(
    "doiTuong/postProductGroup",
    async ({ values }, thunkAPI) => {
        try {
            const response = await doiTuongService.postProductGroup({ values });
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);









export const getListProduct = createAsyncThunk(
    "doiTuong/getListProduct",
    async (thunkAPI) => {
        try {
            const response = await doiTuongService.getListProduct();
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getProduct = createAsyncThunk(
    "doiTuong/getProduct",
    async ({ id }, thunkAPI) => {
        try {
            const response = await doiTuongService.getProduct({ id });
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const postProduct = createAsyncThunk(
    "doiTuong/postProduct",
    async ({ values }, thunkAPI) => {
        try {
            console.log("values", values)
            const response = await doiTuongService.postProduct({values});
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

    isSuccessGetListCustomer: false,
    isSuccessPostCustomer: false,
    isSuccessGetListCustomerGroup: false,
    isSuccessPostCustomerGroup: false,

    isSuccessGetListProduct: false,
    isSuccessPostProduct: false,
    isSuccessGetListProductGroup: false,
    isSuccessPostProductGroup: false,

    isError: false,
    message: "",
    listSupplierData: [],
    supplierData: {},
    listSupplierGroupData: [],
    supplierGroupData: {},

    listCustomerData: [],
    customerData: {},
    listCustomerGroupData: [],
    customerGroupData: {},

    listProductData: [],
    productData: {},
    listProductGroupData: [],
    productGroupData: {},
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

            state.isSuccessGetListCustomer = false;
            state.isSuccessPostCustomer = false;
            state.isSuccessGetListCustomerGroup = false;
            state.isSuccessPostCustomerGroup = false;

            state.isSuccessGetListProduct = false;
            state.isSuccessPostProduct = false;
            state.isSuccessGetListProductGroup = false;
            state.isSuccessPostProductGroup = false;

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
            // state.message = action.error.message;
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
            state.message = action.error.message;
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
            state.message = action.error.message;
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
            // state.message = action.error.message;
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
            state.message = action.error.message;
        })

        builder.addCase(postSupplierGroup.pending, (state) => {
            console.log("postSupplierGroup.pending", state)
            state.isFetching = true;
        })

        builder.addCase(postSupplierGroup.fulfilled, (state, action) => {
            console.log("postSupplierGroup.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccessPostSupplierGroup = true;
            state.supplierGroupData = action.payload;
            //   state.message = action.payload.message;
        })

        builder.addCase(postSupplierGroup.rejected, (state, action) => {
            console.log("postSupplierGroup.rejected", action)
            state.isFetching = false;
            state.isError = true;
            state.message = action.error.message;
        })








        builder.addCase(getListCustomerGroup.pending, (state) => {
            console.log("getListCustomerGroup.pending", state)
            state.isFetching = true;
        })

        builder.addCase(getListCustomerGroup.fulfilled, (state, action) => {
            console.log("getListCustomerGroup.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccessGetListCustomerGroup = true;
            state.listCustomerGroupData = action.payload.result.data.map(item=>{return {...item, key: item.id, size:item.customers.length}});
            //   state.message = action.payload.message;
        })

        builder.addCase(getListCustomerGroup.rejected, (state, action) => {
            console.log("getListCustomerGroup.rejected", action)
            state.isFetching = false;
            state.isError = true;
            // state.message = action.error.message;
        })

        builder.addCase(getCustomerGroup.pending, (state) => {
            console.log("getCustomerGroup.pending", state)
            state.isFetching = true;
        })

        builder.addCase(getCustomerGroup.fulfilled, (state, action) => {
            console.log("getCustomerGroup.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccess = true;
            state.customerGroupData = action.payload.result.data;
            //   state.message = action.payload.message;
        })

        builder.addCase(getCustomerGroup.rejected, (state, action) => {
            console.log("getCustomerGroup.rejected", action)
            state.isFetching = false;
            state.isError = true;
            state.message = action.error.message;
        })

        builder.addCase(postCustomerGroup.pending, (state) => {
            console.log("postCustomerGroup.pending", state)
            state.isFetching = true;
        })

        builder.addCase(postCustomerGroup.fulfilled, (state, action) => {
            console.log("postCustomerGroup.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccessPostCustomerGroup = true;
            state.customerGroupData = action.payload.result.data;
            //   state.message = action.payload.message;
        })

        builder.addCase(postCustomerGroup.rejected, (state, action) => {
            console.log("postCustomerGroup.rejected", action)
            state.isFetching = false;
            state.isError = true;
            state.message = action.error.message;
        })












        builder.addCase(getListCustomer.pending, (state) => {
            console.log("getListCustomer.pending", state)
            state.isFetching = true;
        })

        builder.addCase(getListCustomer.fulfilled, (state, action) => {
            console.log("getListCustomer.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccessGetListCustomer = true;
            state.listCustomerData = action.payload.result.data.map(item=>{return {...item, key: item.id, customerGroup:item.customerGroup.id}});
            //   state.message = action.payload.message;
        })

        builder.addCase(getListCustomer.rejected, (state, action) => {
            console.log("getListCustomer.rejected", action)
            state.isFetching = false;
            state.isError = true;
            // state.message = action.error.message;
        })

        builder.addCase(getCustomer.pending, (state) => {
            console.log("getCustomer.pending", state)
            state.isFetching = true;
        })

        builder.addCase(getCustomer.fulfilled, (state, action) => {
            console.log("getCustomer.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccess = true;
            state.customerData = {...action.payload.result.data, key: action.payload.result.data.id, customerGroup:action.payload.result.data.customerGroup.id};

            //   state.message = action.payload.message;
        })

        builder.addCase(getCustomer.rejected, (state, action) => {
            console.log("getCustomer.rejected", action)
            state.isFetching = false;
            state.isError = true;
            state.message = action.error.message;
        })

        builder.addCase(postCustomer.pending, (state) => {
            console.log("postCustomer.pending", state)
            state.isFetching = true;
        })

        builder.addCase(postCustomer.fulfilled, (state, action) => {
            console.log("postCustomer.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccessPostCustomer = true;
            state.customerData = action.payload;
            //   state.message = action.payload.message;
        })

        builder.addCase(postCustomer.rejected, (state, action) => {
            console.log("postCustomer.rejected", action)
            state.isFetching = false;
            state.isError = true;
            state.message = action.error.message;
        })





































        

        builder.addCase(getListProductGroup.pending, (state) => {
            console.log("getListProductGroup.pending", state)
            state.isFetching = true;
        })

        builder.addCase(getListProductGroup.fulfilled, (state, action) => {
            console.log("getListProductGroup.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccessGetListProductGroup = true;
            state.listProductGroupData = action.payload.result.data.map(item=>{return {...item, key: item.id, size:item.products.length}});
            //   state.message = action.payload.message;
        })

        builder.addCase(getListProductGroup.rejected, (state, action) => {
            console.log("getListProductGroup.rejected", action)
            state.isFetching = false;
            state.isError = true;
            // state.message = action.error.message;
        })

        builder.addCase(getProductGroup.pending, (state) => {
            console.log("getProductGroup.pending", state)
            state.isFetching = true;
        })

        builder.addCase(getProductGroup.fulfilled, (state, action) => {
            console.log("getProductGroup.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccess = true;
            state.productGroupData = action.payload.result.data;
            //   state.message = action.payload.message;
        })

        builder.addCase(getProductGroup.rejected, (state, action) => {
            console.log("getProductGroup.rejected", action)
            state.isFetching = false;
            state.isError = true;
            state.message = action.error.message;
        })

        builder.addCase(postProductGroup.pending, (state) => {
            console.log("postProductGroup.pending", state)
            state.isFetching = true;
        })

        builder.addCase(postProductGroup.fulfilled, (state, action) => {
            console.log("postProductGroup.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccessPostProductGroup = true;
            state.productGroupData = action.payload.result.data;
            //   state.message = action.payload.message;
        })

        builder.addCase(postProductGroup.rejected, (state, action) => {
            console.log("postProductGroup.rejected", action)
            state.isFetching = false;
            state.isError = true;
            state.message = action.error.message;
        })












        builder.addCase(getListProduct.pending, (state) => {
            console.log("getListProduct.pending", state)
            state.isFetching = true;
        })

        builder.addCase(getListProduct.fulfilled, (state, action) => {
            console.log("getListProduct.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccessGetListProduct = true;
            state.listProductData = action.payload.result.data.map(item=>{return {...item, key: item.id,productGroupInfo: item.productGroup, productGroup:item.productGroup.id}});
            //   state.message = action.payload.message;
        })

        builder.addCase(getListProduct.rejected, (state, action) => {
            console.log("getListProduct.rejected", action)
            state.isFetching = false;
            state.isError = true;
            // state.message = action.error.message;
        })

        builder.addCase(getProduct.pending, (state) => {
            console.log("getProduct.pending", state)
            state.isFetching = true;
        })

        builder.addCase(getProduct.fulfilled, (state, action) => {
            console.log("getProduct.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccess = true;
            state.productData = {...action.payload.result.data, key: action.payload.result.data.id, productGroup:action.payload.result.data.productGroup.id};

            //   state.message = action.payload.message;
        })

        builder.addCase(getProduct.rejected, (state, action) => {
            console.log("getProduct.rejected", action)
            state.isFetching = false;
            state.isError = true;
            state.message = action.error.message;
        })

        builder.addCase(postProduct.pending, (state) => {
            console.log("postProduct.pending", state)
            state.isFetching = true;
        })

        builder.addCase(postProduct.fulfilled, (state, action) => {
            console.log("postProduct.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccessPostProduct = true;
            state.productData = action.payload;
            //   state.message = action.payload.message;
        })

        builder.addCase(postProduct.rejected, (state, action) => {
            console.log("postProduct.rejected", action)
            state.isFetching = false;
            state.isError = true;
            state.message = action.error.message;
        })


    },
});

export const { clearState } = doiTuongSlice.actions;

export const doiTuongSelector = (state) => state.doiTuong;