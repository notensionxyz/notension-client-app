import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name: "user",
    initialState: {
        setManually: false,
        userLatitude: '00',
        userLongitude: '00',
        districtId: '00',
        districtName: '',
        districtAreaId: '00',
        districtAreaName: '',
        districtSubAreaId: '00',
        districtSubAreaName: '',
        isLoggedin: false,
        phoneNo: '',
        custName: '',
        custAdress: '',
        alternativeMobileNo: '',
        deliveryAddress: '',
        allAddress: [],
        fireBaseToken: '',
        apiKey: '',
        userPin: '',
        existing_outlet_id: '00',
        outlet_id: '00',
        outlet_name: '',
        outlet_address: '',
        default_outlet_id: '00',
        default_outlet_name: '',
        default_outlet_address: '',
        districtInfo: [],
    },
    reducers: {
        handleUserReducer: (state = initialState, { payload }) => {

            if (payload.type == "SAVE_USER_INFO") {
                return {
                    ...state,
                    setManually: false,
                    userLatitude: payload.data.userLatitude,
                    userLongitude: payload.data.userLongitude,
                    districtId: payload.data.districtId,
                    districtName: payload.data.districtName,
                    districtAreaId: payload.data.districtAreaId,
                    districtAreaName: payload.data.districtAreaName,
                    districtSubAreaId: payload.data.districtSubAreaId,
                    districtSubAreaName: payload.data.districtSubAreaName,
                    isLoggedin: payload.data.isLoggedin,
                    phoneNo: payload.data.phoneNo,
                    custName: payload.data.custName,
                    custAdress: payload.data.custAdress,
                    alternativeMobileNo: payload.data.alternativeMobileNo,
                    deliveryAddress: payload.data.deliveryAddress,
                    allAddress: payload.data.allAddress,
                    fireBaseToken: payload.data.fireBaseToken,
                    apiKey: payload.data.apiKey,
                    userPin: payload.data.userPin,
                    default_outlet_id: payload.data.default_outlet_id,
                    default_outlet_name: payload.data.default_outlet_name,
                    default_outlet_address: payload.data.default_outlet_address,
                }
            }
            else if (payload.type == "SAVE_CURRENT_GEOLOCATION") {
                return {
                    ...state,
                    isUserLocationAvailable: true,
                    userLatitude: payload.data.latitude,
                    userLongitude: payload.data.longitude
                }
            }
            else if (payload.type == "SAVE_DISTRICT_INFO") {
                return {
                    ...state,
                    districtInfo: payload?.data || [],
                }
            }
            else if (payload.type == "SAVE_SELECTED_DISTRICT") {
                return {
                    ...state,
                    districtId: payload?.data?.districtId || '00',
                    districtName: payload?.data?.districtName || '',
                }
            }
            else if (payload.type == "SAVE_API_KEY") {
                return {
                    ...state,
                    existing_outlet_id: payload.data.existing_outlet_id,
                    outlet_id: payload.data.outlet_id,
                    outlet_name: payload.data.outlet_name,
                    outlet_address: payload.data.outlet_address,
                }
            }
            else if (payload.type == "RESET_USER") {
                return {
                    ...state,
                    setManually: false,
                    userLatitude: '00',
                    userLongitude: '00',
                    districtId: '00',
                    districtName: '',
                    districtAreaId: '00',
                    districtAreaName: '',
                    districtSubAreaId: '00',
                    districtSubAreaName: '',
                    isLoggedin: false,
                    phoneNo: '',
                    custName: '',
                    custAdress: '',
                    alternativeMobileNo: '',
                    deliveryAddress: '',
                    allAddress: [],
                    fireBaseToken: '',
                    apiKey: '',
                    userPin: '',
                    existing_outlet_id: '00',
                    outlet_id: '00',
                    outlet_name: '',
                    outlet_address: '',
                    default_outlet_id: '00',
                    default_outlet_name: '',
                    default_outlet_address: '',
                }
            } else {
                return {
                    ...state
                }
            }
        }
    }
});

export const { handleUserReducer } = userReducer.actions;

export default userReducer.reducer;