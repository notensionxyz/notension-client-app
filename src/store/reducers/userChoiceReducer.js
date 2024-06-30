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
        favouriteConsultationCentre: [],
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

                if (payload?.data?.merchantType === 0) {

                    state.favouriteGroceryStore = [...state.favouriteGroceryStore, ...payload.data.storeInfo];

                } else if (payload?.data?.merchantType === 1) {

                    state.favouriteMedicineStore = [...state.favouriteMedicineStore, ...payload.data.storeInfo];

                } else if (payload?.data?.merchantType === 2) {

                    state.favouriteFoodShop = [...state.favouriteFoodShop, ...payload.data.storeInfo];

                }
                else if (payload?.data?.merchantType === 3) {

                    state.favouriteConsultationCentre = [...state.favouriteConsultationCentre, ...payload.data.favouriteList];

                }
                else if (payload?.data?.merchantType === 4) {

                    state.favouriteDoctors = [...state.favouriteDoctors, ...payload.data.favouriteList];

                }
            }
            else if (payload.type == "REMOVE_FROM_FAVOURITE_MERCHANT_LIST") {
                let newState = [];

                if (payload?.data?.merchantType === 0) {

                    newState = state.favouriteGroceryStore.filter((info) => info?.storeId !== payload?.data?.storeId);
                    state.favouriteGroceryStore = newState;

                } else if (payload?.data?.merchantType === 1) {

                    newState = state.favouriteMedicineStore.filter((info) => info?.storeId !== payload?.data?.storeId);
                    state.favouriteMedicineStore = newState;

                } else if (payload?.data?.merchantType === 2) {

                    newState = state.favouriteFoodShop.filter((info) => info?.storeId !== payload?.data?.storeId);
                    state.favouriteFoodShop = newState;

                }
                else if (payload?.data?.merchantType === 3) {

                    newState = state.favouriteConsultationCentre.filter((info) => info?.mongodbId !== payload?.data?.mongodbId);
                    state.favouriteConsultationCentre = newState;

                }
                else if (payload?.data?.merchantType === 4) {

                    newState = state.favouriteDoctors.filter((info) => info?.mongodbId !== payload?.data?.mongodbId);
                    state.favouriteDoctors = newState;

                }
            }
            else if (payload.type == "ADD_TO_FAVOURITE_ITEM_LIST") {
                if (payload?.data?.merchantType === 0) {

                    state.favouriteGroceryItems = [...state.favouriteGroceryItems, ...payload.data.itemInfo];

                } else if (payload?.data?.merchantType === 1) {

                    state.favouriteMedicineItems = [...state.favouriteMedicineItems, ...payload.data.itemInfo];

                }
            }
            else if (payload.type == "REMOVE_FROM_FAVOURITE_ITEM_LIST") {
                let newState = [];

                if (payload?.data?.merchantType === 0) {

                    newState = state.favouriteGroceryItems.filter((info) => info?.productId !== payload?.data?.productId);
                    state.favouriteGroceryItems = newState;

                } else {

                    newState = state.favouriteMedicineItems.filter((info) => info?.productId !== payload?.data?.productId);
                    state.favouriteMedicineItems = newState;

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
                    favouriteDoctors: [],
                    kownNurse: [],
                    favouriteConsultationCentre: [],
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