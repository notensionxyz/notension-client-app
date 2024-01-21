import { createSlice } from "@reduxjs/toolkit";

const userChoiceReducer = createSlice({
    name: "userChoice",
    initialState: {
        defaultGroceryStore: {},
        defaultMedicineStore: {},
        currentGroceryStore: {},
        currentMedicineStore: {},
        currentFoodShop: {},
        favouriteGroceryStore: [],
        favouriteMedicineStore: [],
        favouriteFoodShop: [],
        favouriteGroceryItems: [],
        favouriteMedicineItems: [],
        favouriteFoodItems: [],
        favouriteDoctors: [],
        kownNurse: [],
        favouriteHospital: [],
        favouriteDiagnosticCentre: [],
        kownAmbulanceProvider: [],
    },
    reducers: {
        handleUserChoiceReducer: (state = initialState, { payload }) => {
            if (payload.type == "SAVE_DEFAULT_STORE") {
                state.defaultGroceryStore = payload.data;
            }
            else if (payload.type == "SAVE_CURRENT_MERCHANT") {
                state.defaultMedicineStore = payload.data;
            }
            else if (payload.type == "ADD_TO_FAVOURITE_MERCHANT_LIST") {
                let newState = [];

                if (payload?.data?.merchantType === 0) {

                    const existingIndex = state.favouriteGroceryStore.findIndex((info) => info.storeId === payload.data.storeId);
                    if (existingIndex > -1) {
                        newState = [...state.favouriteGroceryStore];
                    } else {
                        newState = [...state.favouriteGroceryStore, payload.data];
                    }
                    state.favouriteGroceryStore = newState;

                } else if (payload?.data?.merchantType === 1) {

                    const existingIndex = state.favouriteMedicineItems.findIndex((info) => info.storeId === payload.data.storeId);
                    if (existingIndex > -1) {
                        newState = [...state.favouriteMedicineItems];
                    } else {
                        newState = [...state.favouriteMedicineItems, payload.data];
                    }
                    state.favouriteMedicineItems = newState;

                } else {

                    const existingIndex = state.favouriteFoodShop.findIndex((info) => info.storeId === payload.data.storeId);
                    if (existingIndex > -1) {
                        newState = [...state.favouriteFoodShop];
                    } else {
                        newState = [...state.favouriteFoodShop, payload.data];
                    }
                    state.favouriteFoodShop = newState;

                }
            }
            else if (payload.type == "REMOVE_FROM_FAVOURITE_MERCHANT_LIST") {
                let newState = [];
                if (payload?.data?.merchantType === 0) {

                    newState = [...state.favouriteGroceryStore];
                    newState = state.favouriteGroceryStore.filter((info) => info.storeId !== payload.data.storeId);
                    state.favouriteGroceryStore = newState;

                } else if (payload?.data?.merchantType === 1) {

                    newState = [...state.favouriteMedicineItems];
                    newState = state.favouriteMedicineItems.filter((info) => info.storeId !== payload.data.storeId);
                    state.favouriteMedicineItems = newState;

                } else {

                    newState = [...state.favouriteFoodShop];
                    newState = state.favouriteFoodShop.filter((info) => info.storeId !== payload.data.storeId);
                    state.favouriteFoodShop = newState;

                }
            }
            else if (payload.type == "ADD_TO_FAVOURITE_ITEM_LIST") {
                let newState = [];
                if (payload?.data?.merchantType === 'grocery') {

                } else if (payload?.data?.merchantType === 'medicine') {

                } else {

                }
            }
            else if (payload.type == "REMOVE_FROM_FAVOURITE_ITEM_LIST") {
                let newState = [];
                if (payload?.data?.merchantType === 'grocery') {

                } else if (payload?.data?.merchantType === 'medicine') {

                } else {

                }
            }
            else if (payload.type == "RESET_USER_CHOICE") {
                return {
                    ...state,
                    defaultGroceryStore: {},
                    defaultMedicineStore: {},
                    currentGroceryStore: {},
                    currentMedicineStore: {},
                    currentFoodShop: {},
                    favouriteGroceryStore: [],
                    favouriteMedicineStore: [],
                    favouriteFoodShop: [],
                    favouriteGroceryItems: [],
                    favouriteMedicineItems: [],
                    favouriteFoodItems: [],
                    favouriteDoctors: [],
                    kownNurse: [],
                    favouriteHospital: [],
                    favouriteDiagnosticCentre: [],
                    kownAmbulanceProvider: [],
                }
            } else {
                return {
                    ...state
                }
            }
        }
    }
});

export const { handleUserChoiceReducer } = userChoiceReducer.actions;

export default userChoiceReducer.reducer;