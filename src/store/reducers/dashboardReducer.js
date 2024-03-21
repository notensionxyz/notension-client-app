import { createSlice } from "@reduxjs/toolkit";
const dashboardReducer = createSlice({
    name: "dashboard",
    initialState: {
        currentModule: 'dashboard',
        callUs: '',
        internetConnectionAvailable: true,
        isLoading: true,
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
        ad_slider_by_district: {},
        districtInfo: [],
        districtAreaInfo: [],
        districtSubAreaInfo: [],
        ditance: [],
        typeInfoByShop: [],
        subtypeInfoByShop: [],
        shopCategory: [],
        DashboardSlider: [],
        visitedGroceryStore: {},
        visitedMedicineStore: {},
        showProductPrice: true,
        visitedFoodStore: {},
        visitedDineInRestaurent: {},
    },
    reducers: {
        handleDashboardReducer: (state = initialState, { payload }) => {
            if (payload.type == "SAVE_DASHBOARD_INFO") {
                return {
                    ...state,
                    isLoading: false,
                    favourite_banner: payload?.data?.allAppDashboard[0]?.favourite_banner || [],
                    starting_slider: payload?.data?.allAppDashboard[0]?.starting_slider || [],
                    business_type_banner: payload?.data?.allAppDashboard[0]?.business_type_banner || [],
                    advertisement_slider: payload?.data?.allAppDashboard[0]?.advertisement_slider || [],
                    medical_services_banner: payload?.data?.allAppDashboard[0]?.medical_services_banner || [],
                    free_services_slider: payload?.data?.allAppDashboard[0]?.free_services_slider || [],
                    free_services_banner: payload?.data?.allAppDashboard[0]?.free_services_banner || [],
                    tutorial_banner: payload?.data?.allAppDashboard[0]?.tutorial_banner || '',
                    show_tutorial_banner: payload?.data?.allAppDashboard[0]?.show_tutorial_banner || false,
                    registration_banner: payload?.data?.allAppDashboard[0]?.registration_banner || '',
                    ad_slider_by_district: payload?.data?.DashboardSlider || {},
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
                let status = true;
                if (payload?.data?.ShopDetails[0]?.show_product_price !== undefined) {
                    status = payload?.data?.ShopDetails[0]?.show_product_price;
                }

                return {
                    ...state,
                    isLoading: false,
                    visitedGroceryStore: payload?.data?.ShopDetails[0] || {},
                    typeInfoByShop: payload?.data?.ProductTypeByShop || [],
                    subtypeInfoByShop: payload?.data?.ProductSubTypeByShop || [],
                    DashboardSlider: payload?.data?.DashboardSlider || [],
                    showProductPrice: status
                };
            }
            else if (payload.type == 'VISITED_STORE') {
                return {
                    ...state,
                    visitedGroceryStore: payload?.data
                };
            }
            else if (payload.type == 'EXPLORE_MED_STORE') {
                let status = true;
                if (payload?.data?.ShopDetails[0]?.show_product_price !== undefined) {
                    status = payload?.data?.ShopDetails[0]?.show_product_price;
                }
                return {
                    ...state,
                    isLoading: false,
                    visitedMedicineStore: payload?.data?.ShopDetails[0] || {},
                    typeInfoByShop: payload?.data?.ProductTypeByShop || [],
                    subtypeInfoByShop: payload?.data?.ProductSubTypeByShop || [],
                    DashboardSlider: payload?.data?.DashboardSlider || [],
                };
            }
            else if (payload.type == 'VISITED_MED_STORE') {
                return {
                    ...state,
                    visitedMedicineStore: payload?.data
                };
            }
            else if (payload.type == 'EXPLORE_FOOD_MODULE') {
                return {
                    ...state,
                    isLoading: false,
                    shopCategory: payload?.data?.shopCategory || [],
                    DashboardSlider: payload?.data?.DashboardSlider || [],
                };
            }
            else if (payload.type == 'EXPLORE_FOOD_STORE') {
                return {
                    ...state,
                    isLoading: false,
                    visitedMedicineStore: payload?.data?.ShopDetails[0] || {},
                    typeInfoByShop: payload?.data?.ProductTypeByShop || [],
                    subtypeInfoByShop: payload?.data?.ProductSubTypeByShop || [],
                    DashboardSlider: payload?.data?.DashboardSlider || [],
                };
            }
            else if (payload.type == 'VISITED_FOOD_STORE') {
                return {
                    ...state,
                    visitedFoodStore: payload?.data
                };
            }
            else if (payload.type == 'SET_CURRENT_MODULE') {
                return {
                    ...state,
                    currentModule: payload?.data,
                    //typeInfoByShop: [],
                    //subtypeInfoByShop: [],
                    //shopCategory: [],
                    //DashboardSlider: [],
                };
            }
            else if (payload.type == "RESET_DASHBOARD_REDUCER") {
                return {
                    ...state,
                    currentModule: 'dashboard',
                    callUs: '',
                    internetConnectionAvailable: true,
                    isLoading: true,
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
                    shopCategory: [],
                    DashboardSlider: [],
                    visitedGroceryStore: {},
                    visitedMedicineStore: {},
                    visitedFoodStore: {},
                    visitedDineInRestaurent: {},
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