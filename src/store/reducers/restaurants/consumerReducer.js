import { createSlice } from "@reduxjs/toolkit";
const consumerReducer = createSlice({
    name: "consumer",
    initialState: {
        isUserLocationAvailable: false,
        userLatitude: '',
        userLongitude: '',

    },
    reducers: {
        handleConsumerReducer: (state = initialState, { payload }) => {
            if (payload.type == "SAVE_USER_INFO") {
                return {
                    ...state,
                    isUserLocationAvailable: payload.data.isUserLocationAvailable,
                    userLatitude: payload.data.userLatitude,
                    userLongitude: payload.data.userLatitude,
                    // isLoggedin: payload.data.isLoggedin,
                    // phoneNo: payload.data.phoneNo,
                    // custName: action.payload.custName,
                    // custAdress: payload.data.custAdress,
                    // alternativeMobileNo: payload.data.alternativeMobileNo,
                    // deliveryAddress: payload.data.deliveryAddress,
                }
            }
            else if (payload.type == "RESET_USER") {
                return {
                    ...state,
                    isUserLocationAvailable: false,
                    userLatitude: '',
                    userLongitude: '',
                }
            } else {
                return {
                    ...state
                }
            }
        }
    }
});

export const { handleConsumerReducer } = consumerReducer.actions;

export default consumerReducer.reducer;