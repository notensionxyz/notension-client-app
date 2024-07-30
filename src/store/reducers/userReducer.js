import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name: "user",
    initialState: {
        setManually: false,
        setCurrentLocation: false,
        setDefaultLocation: false,
        defaultUserLocation: {},
        currentUserLocation: {},
        userLatitude: '00',
        userLongitude: '00',
        districtId: '00',
        isLoggedin: false,
        userInfo: {},
        deliveryAddress: '',
        allAddress: [],
        fireBaseToken: '',
        apiKey: '',
        userPin: '',
        deliveryLocations: [],
        districtInfo: [],
        groceryOrderInfo: [],
        medicineOrderInfo: [],
        foodOrderInfo: [],
        patientInfo: [],
    },
    reducers: {
        handleUserReducer: (state = initialState, { payload }) => {

            if (payload.type == "SAVE_USER_INFO") {
                return {
                    ...state,
                    setManually: false,
                    userLatitude: payload.data.userLatitude,
                    userLongitude: payload.data.userLongitude,
                    isLoggedin: payload.data.isLoggedin,
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
            else if (payload.type == "SAVE_DEFAULT_LOCATION") {
                state.groceryOrderInfo = payload.data;
            }
            else if (payload.type == "SAVE_CURRENT_LOCATION") {
                state.currentUserLocation = payload.data;
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
            else if (payload.type == "SAVE_LOGGEDIN_INFO") {
                return {
                    ...state,
                    isLoggedin: true,
                    userInfo: payload.data,
                }
            }
            else if (payload.type == "LOGOUT_USER") {
                return {
                    ...state,
                    isLoggedin: false,
                    userInfo: payload.data,
                }
            }
            else if (payload.type == "SAVE_USER_CURRENT_LOCATION") {
                state.currentUserLocation = payload.data;
                state.setCurrentLocation = payload?.data?.setCurrentLocation;
                state.userLatitude = payload?.data?.userLatitude || '00';
                state.userLongitude = payload?.data?.userLongitude || '00';
                state.districtId = payload?.data?.districtId || '00';
            }
            else if (payload.type == "SAVE_USER_DEFAULT_LOCATION") {
                //console.log('payload?.data : ', payload?.data);
                state.defaultUserLocation = payload?.data;
                state.userLatitude = payload?.data?.userLatitude;
                state.userLongitude = payload?.data?.userLongitude;
                state.districtId = payload?.data?.districtId;
            }
            else if (payload.type == "SAVE_GROCERY_ORDER_INFO") {
                state.groceryOrderInfo = payload?.data;
            }
            else if (payload.type == "SAVE_MEDICINE_ORDER_INFO") {
                state.medicineOrderInfo = payload?.data;
            }
            else if (payload.type == "SAVE_FOOD_ORDER_INFO") {
                state.foodOrderInfo = payload.data;
            }
            else if (payload.type == "SAVE_PATIENT_INFO") {
                state.patientInfo = payload.data;
            }
            else if (payload.type == "RESET_USER_LOCATION") {
                state.setCurrentLocation = false;
                state.setDefaultLocation = true;
                state.defaultUserLocation = {};
                state.currentUserLocation = {};
                state.userLatitude = '00';
                state.userLongitude = '00';
                state.districtId = '00';
            }
            else if (payload.type == "RESET_USER_CURRENT_LOCATION") {
                state.setCurrentLocation = true;
                state.setDefaultLocation = false;
                state.currentUserLocation = {};
            }
            else if (payload.type == "RESET_USER") {
                return {
                    ...state,
                    setManually: false,
                    setCurrentLocation: false,
                    setDefaultLocation: false,
                    defaultUserLocation: {},
                    currentUserLocation: {},
                    userLatitude: '00',
                    userLongitude: '00',
                    districtId: '00',
                    isLoggedin: false,
                    userInfo: {},
                    deliveryAddress: '',
                    allAddress: [],
                    fireBaseToken: '',
                    apiKey: '',
                    userPin: '',
                    deliveryLocations: [],
                    districtInfo: [],
                    groceryOrderInfo: [],
                    medicineOrderInfo: [],
                    foodOrderInfo: [],
                    patientInfo: [],
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