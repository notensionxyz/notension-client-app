'use client';
import { createSlice } from '@reduxjs/toolkit';
let countTotal;
const cartReducer = createSlice({
    name: 'cartItems',
    initialState: {
        groceryItems: [],
        totalAmountGrocery: 0,
        medicineItems: [],
        totalAmountMedicine: 0,
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
                countTotal = 'GROCERY';
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
                //console.log('newState[existingItemIndex].quantity', newState[existingItemIndex].quantity);
                state.groceryItems = newState;
                // return {
                //     ...state,
                //     groceryItems: newState,
                // };
            }
            else if (payload.type == 'DECREASE_QUANTITY_GROCERY') {
                countTotal = 'GROCERY';
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
                // return {
                //     ...state,
                //     groceryItems: newState,
                // };
            }
            else if (payload.type == 'REMOVE_FROM_CART_GROCERY') {
                countTotal = 'GROCERY';
                let newState = [...state.groceryItems];
                const existingItemIndex = state.groceryItems.findIndex(
                    (item) => item?._id === payload?.data
                );
                if (existingItemIndex > -1) {
                    // delete newState[existingItemIndex];
                    newState = state.groceryItems.filter(
                        (item) => item?._id !== payload?.data
                    );
                }

                state.groceryItems = newState;
                // return {
                //     ...state,
                //     groceryItems: newState,
                // };
            }

            if (countTotal === 'GROCERY') {
                console.log(state.groceryItems.length);
            }
        },
    },
});

export const { handleCartReducer } = cartReducer.actions;

export default cartReducer.reducer;