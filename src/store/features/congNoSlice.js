import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";
import banHangService from "../../services/banHang.service";

export const getListCongNo = createAsyncThunk(
    "congNo/getListCongNo",
    async (thunkAPI) => {
        try {
            const response = await banHangService.getListChungTuBan();
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

    isSuccessGetListCongNo: false,

    isError: false,
    message: "",

    listCongNo: [],
};


export const congNoSlice = createSlice({
    name: "congNo",
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;

            state.isSuccessGetListCongNo = false;

            state.isFetching = false;
            state.message = "";
            return state;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getListCongNo.pending, (state) => {
            console.log("getListCongNo.pending", state)
            state.isFetching = true;
        })

        builder.addCase(getListCongNo.fulfilled, (state, action) => {
            console.log("getListCongNo.fulfilled", action.payload)
            state.isFetching = false;
            state.isSuccessGetListCongNo = true;

            const dataAddKey = action.payload.result.data.map(item => { return { ...item, key: item.id } });

            const dataSet = new Set();
            dataAddKey.forEach(hoaDon => {
                dataSet.add(hoaDon.donBanHang.customer.id);
            })

            const dataFilter_PaymentStatus_BEING_PAID_NOT_PAID = dataAddKey.filter(hoaDon => hoaDon.paymentStatus === "BEING_PAID" || hoaDon.paymentStatus === "NOT_PAID")

            let dataConvert = {};

            dataFilter_PaymentStatus_BEING_PAID_NOT_PAID.forEach(hoaDon=> {
                if(!dataConvert[hoaDon.donBanHang.customer.id]){
                    dataConvert[hoaDon.donBanHang.customer.id] = [hoaDon]
                }
                else{
                    dataConvert[hoaDon.donBanHang.customer.id].push(hoaDon);
                }
            })

            let results = []

            Object.entries(dataConvert).forEach(([key,value])=> results.push(value))

            // for (const item of dataFilter_PaymentStatus_BEING_PAID_NOT_PAID) {
            //     const { id } = item.donBanHang.customer.id;
              
            //     // Kiểm tra nếu id có trong dataSet
            //     if (dataSet.has(id)) {
            //       // Nếu chưa có danh sách các phần tử cho id này, khởi tạo một danh sách rỗng
            //       if (!dataConvert[id]) {
            //         dataConvert[id] = [];
            //       }
                  
            //       // Thêm phần tử vào danh sách của id tương ứng
            //       dataConvert[id].push(item);
            //     }
            //   }
            
            // dataSet.forEach(data => dataConvert.set(data:[]))

            // dataFilter_PaymentStatus_BEING_PAID_NOT_PAID.map(item => {
            //     return {
            //         hoaDon.donBanHang.customer.id:
            //     }
            // })

            console.log("results", results)

            state.listCongNo = results;
        })

        builder.addCase(getListCongNo.rejected, (state, action) => {
            console.log("getListCongNo.rejected", action)
            state.isFetching = false;
            state.isError = true;
            // state.message = action.error.message;
        })
    }
});

export const { clearState } = congNoSlice.actions;

export const congNoSelector = (state) => state.congNo;