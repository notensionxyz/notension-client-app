'use client';
import { createSlice } from '@reduxjs/toolkit';

const stateReducer = createSlice({
    name: 'appState',
    initialState: {
        loadingMore: false,
        itemNotfound: false,
        allLoaded: false,
        isGroceryCartItemsChecked: false,
        isMedicineCartItemsChecked: false,
        isFoodCartItemsChecked: false,
    },
    reducers: {
        handleStateReducer: (state = initialState, { payload }) => {
            if (payload.type == 'CLEAR_ALL') {
                return {
                    ...state,
                    loadingMore: false,
                    itemNotfound: false,
                    allLoaded: false,
                    isGroceryCartItemsChecked: false,
                    isMedicineCartItemsChecked: false,
                    isFoodCartItemsChecked: false,
                };
            }
            else if (payload.type == 'SET_LOADING_MORE') {
                state.loadingMore = payload?.data
            }
            else if (payload.type == 'SET_ITEM_NOT_FOUND') {
                state.itemNotfound = payload?.data
            }
            else if (payload.type == 'SET_ALL_LAODED') {
                state.allLoaded = payload?.data
            }
            else if (payload.type == 'SET_GroceryCartItemsChecked_STATUS') {
                state.isGroceryCartItemsChecked = payload?.data
            }
            else if (payload.type == 'SET_MedicineCartItemsChecked_STATUS') {
                state.isMedicineCartItemsChecked = payload?.data
            }
            else if (payload.type == 'SET_FoodCartItemsChecked_STATUS') {
                state.isFoodCartItemsChecked = payload?.data
            }
            else {
                return {
                    ...state,
                };
            }
        },
    },
});

export const { handleStateReducer } = stateReducer.actions;

export default stateReducer.reducer;