import { createSlice } from "@reduxjs/toolkit";
const dashboardReducer = createSlice({
    name: "dashboard",
    initialState: {
        callUs: '',
        internetConnectionAvailable: true,
        isLoading: false,
        isFetchingFromStorage: true,
        favourite_banner: [],
        starting_slider: [],
        business_type_banner: [],
        advertisement_slider: [],
        medical_services_banner: [],
        free_services_slider: [],
        free_services_banner: [],
        tutorial_banner: '',
        show_tutorial_banner: false,
        registration_banner: '',
        districtInfo: [],
        districtAreaInfo: [],
        districtSubAreaInfo: [],
        ditance: [],
        typeInfoByShop: [],
        subtypeInfoByShop: [],
        DashboardSlider: [],
        visitedGroceryStore: {}
    },
    reducers: {
        handleDashboardReducer: (state = initialState, { payload }) => {
            if (payload.type == "SAVE_DASHBOARD_INFO") {
                return {
                    ...state,
                    isFetchingFromStorage: false,
                    favourite_banner: payload?.data[0]?.favourite_banner,
                    starting_slider: payload?.data[0]?.starting_slider,
                    business_type_banner: payload?.data[0]?.business_type_banner,
                    advertisement_slider: payload?.data[0]?.advertisement_slider,
                    medical_services_banner: payload?.data[0]?.medical_services_banner,
                    free_services_slider: payload?.data[0]?.free_services_slider,
                    free_services_banner: payload?.data[0]?.free_services_banner,
                    tutorial_banner: payload?.data[0]?.tutorial_banner,
                    show_tutorial_banner: payload?.data[0]?.show_tutorial_banner,
                    registration_banner: payload?.data[0]?.registration_banner,
                }
            }
            else if (payload.type == "SAVE_LOADING_STATUS") {
                return {
                    ...state,
                    isLoading: payload.data
                }
            }
            else if (payload.type == "SAVE_CONNECTION_STATUS") {
                return {
                    ...state,
                    internetConnectionAvailable: payload.data
                }
            }
            else if (payload.type == "SAVE_AREA_INFO") {
                return {
                    ...state,
                    districtInfo: payload.data.districtInfo,
                    districtAreaInfo: payload.data.districtInfo,
                    districtSubAreaInfo: payload.data.districtInfo,
                }
            }
            else if (payload.type == 'EXPLORE_STORE') {
                return {
                    ...state,
                    isLoading: false,
                    visitedGroceryStore: payload?.data?.ShopDetails[0] || {},
                    typeInfoByShop: payload?.data?.ProductTypeByShop || [],
                    subtypeInfoByShop: payload?.data?.ProductSubTypeByShop || [],
                    DashboardSlider: payload?.data?.DashboardSlider || [],
                };
            }
            else if (payload.type == 'VISITED_STORE') {
                return {
                    ...state,
                    visitedGroceryStore: payload?.data
                };
            }
            else if (payload.type == "RESET_USER") {
                return {
                    ...state,
                    callUs: '',
                    internetConnectionAvailable: true,
                    isLoading: false,
                    isFetchingFromStorage: true,
                    favourite_banner: [],
                    starting_slider: [],
                    business_type_banner: [],
                    advertisement_slider: [],
                    medical_services_banner: [],
                    free_services_slider: [],
                    free_services_banner: [],
                    tutorial_banner: '',
                    show_tutorial_banner: false,
                    registration_banner: '',
                    districtInfo: [],
                    districtAreaInfo: [],
                    districtSubAreaInfo: [],
                }
            } else {
                return {
                    ...state
                }
            }
        }
    }
});

export const { handleDashboardReducer } = dashboardReducer.actions;

export default dashboardReducer.reducer;