'use client';
import { createSlice } from '@reduxjs/toolkit';
let countTotal;
const calculateTotal = (items) =>
    items.reduce((total, item) => parseFloat(total) + (parseFloat(item.quantity) * parseFloat(item.sale_price)), 0);

const cartReducer = createSlice({
    name: 'cartItems',
    initialState: {
        groceryStoreInfo: {},
        groceryItems: [],
        totalAmountGrocery: 0,
        medicineStoreInfo: {},
        medicineItems: [],
        totalAmountMedicine: 0,
        foodStoreInfo: {},
        foodItems: [],
        totalAmountFood: 0,
    },
    reducers: {
        handleCartReducer: (state = initialState, { payload }) => {

            if (payload.type == 'CLEAR_ALL') {
                return {
                    ...state,
                    groceryItems: [],
                    totalAmountGrocery: 0,
                    medicineItems: [],
                    totalAmountMedicine: 0,
                    foodItems: [],
                    totalAmountFood: 0,
                };
            }
            else if (payload.type == 'ADD_TO_CART_GROCERY') {

                let newState = [];
                const existingItemIndex = state.groceryItems.findIndex(
                    (item) => item?._id === payload?.data?._id
                );

                if (existingItemIndex > -1) {
                    newState = [...state.groceryItems];
                    newState[existingItemIndex].quantity = parseFloat(newState[existingItemIndex].quantity) + parseFloat(newState[existingItemIndex].inc_qty);
                } else {
                    newState = [...state.groceryItems, payload.data];
                }

                state.groceryItems = newState;
                state.totalAmountGrocery = calculateTotal(newState);

            }
            else if (payload.type == 'DECREASE_QUANTITY_GROCERY') {

                let newState = [];
                const existingItemIndex = state.groceryItems.findIndex(
                    (item) => item?._id === payload?.data
                );

                if (existingItemIndex > -1) {
                    newState = [...state.groceryItems];
                    if (parseFloat(newState[existingItemIndex].quantity) > 1) {
                        newState[existingItemIndex].quantity = parseFloat(newState[existingItemIndex].quantity) - parseFloat(newState[existingItemIndex].inc_qty);
                    } else {
                        newState = state.groceryItems.filter(
                            (item) => item?._id !== payload?.data
                        );
                    }
                }

                state.groceryItems = newState;
                state.totalAmountGrocery = calculateTotal(newState);

            }
            else if (payload.type == 'REMOVE_FROM_CART_GROCERY') {

                let newState = [...state.groceryItems];
                newState = state.groceryItems.filter(
                    (item) => item?._id !== payload?.data
                );

                state.groceryItems = newState;
                state.totalAmountGrocery = calculateTotal(newState);

            }
            else if (payload.type == 'ADD_TO_CART_MEDICINE') {

                let newState = [];
                const existingItemIndex = state.medicineItems.findIndex(
                    (item) => item?._id === payload?.data?._id
                );

                if (existingItemIndex > -1) {
                    newState = [...state.medicineItems];
                    newState[existingItemIndex].quantity = parseFloat(newState[existingItemIndex].quantity) + parseFloat(newState[existingItemIndex].inc_qty);
                } else {
                    newState = [...state.medicineItems, payload.data];
                }

                state.medicineItems = newState;
                state.totalAmountMedicine = calculateTotal(newState);

            }
            else if (payload.type == 'DECREASE_QUANTITY_MEDICINE') {

                let newState = [];
                const existingItemIndex = state.medicineItems.findIndex(
                    (item) => item?._id === payload?.data
                );

                if (existingItemIndex > -1) {
                    newState = [...state.medicineItems];
                    if (parseFloat(newState[existingItemIndex].quantity) > 1) {
                        newState[existingItemIndex].quantity = parseFloat(newState[existingItemIndex].quantity) - parseFloat(newState[existingItemIndex].inc_qty);
                    } else {
                        newState = state.medicineItems.filter(
                            (item) => item?._id !== payload?.data
                        );
                    }
                }

                state.medicineItems = newState;
                state.totalAmountMedicine = calculateTotal(newState);

            }
            else if (payload.type == 'REMOVE_FROM_CART_MEDICINE') {

                let newState = [...state.medicineItems];
                newState = state.medicineItems.filter(
                    (item) => item?._id !== payload?.data
                );

                state.medicineItems = newState;
                state.totalAmountMedicine = calculateTotal(newState);

            }
            else if (payload.type == 'ADD_TO_CART_FOOD') {

                let newState = [];
                const existingItemIndex = state.foodItems.findIndex(
                    (item) => item?._id === payload?.data?._id
                );

                if (existingItemIndex > -1) {
                    newState = [...state.foodItems];
                    newState[existingItemIndex].quantity = parseFloat(newState[existingItemIndex].quantity) + parseFloat(newState[existingItemIndex].inc_qty);
                } else {
                    newState = [...state.foodItems, payload.data];
                }

                state.foodItems = newState;
                state.totalAmountFood = calculateTotal(newState);

            }
            else if (payload.type == 'DECREASE_QUANTITY_FOOD') {

                let newState = [...state.foodItems];
                const existingItemIndex = state.foodItems.findIndex(
                    (item) => item?._id === payload?.data
                );

                if (existingItemIndex > -1) {
                    if (parseFloat(newState[existingItemIndex].quantity) > 1) {
                        newState[existingItemIndex].quantity = parseFloat(newState[existingItemIndex].quantity) - parseFloat(newState[existingItemIndex].inc_qty);
                    } else {
                        newState = state.foodItems.filter(
                            (item) => item?._id !== payload?.data
                        );
                    }
                }

                state.foodItems = newState;
                state.totalAmountFood = calculateTotal(newState);

            }
            else if (payload.type == 'REMOVE_FROM_CART_FOOD') {

                let newState = [...state.foodItems];
                newState = state.foodItems.filter(
                    (item) => item?._id !== payload?.data
                );

                state.foodItems = newState;
                state.totalAmountFood = calculateTotal(newState);

            }
            else if (payload.type == 'GROCERY_ORDER_PLACED') {
                state.groceryItems = [];
                state.totalAmountGrocery = 0;
            }
            else if (payload.type == 'MEDICINE_ORDER_PLACED') {
                state.medicineItems = [];
                state.totalAmountMedicine = 0;
            }
            else if (payload.type == 'FOOD_ORDER_PLACED') {
                state.foodItems = [];
                state.totalAmountFood = 0;
            }
            else if (payload.type == 'SAVE_GROCERY_STORE_INFO') {
                state.groceryStoreInfo = payload?.data
            } else if (payload.type == 'SAVE_MEDICINE_STORE_INFO') {
                state.medicineStoreInfo = payload?.data
            } else if (payload.type == 'SAVE_FOOD_STORE_INFO') {
                state.foodStoreInfo = payload?.data
            }
        },
    },
});

export const { handleCartReducer } = cartReducer.actions;

export default cartReducer.reducer;