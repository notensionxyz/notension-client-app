'use client';
import { createSlice } from '@reduxjs/toolkit';

const itemsByStoreReducer = createSlice({
    name: 'itemsByStore',
    initialState: {
        merchantId: '',
        customstore_id: '',
        typeInfoByShop: [],
        subtypeInfoByShop: [],
        typeName: '',
        subtypeByselectedType: [],
        categoryInfo: [],
        productInfoByShop: [],
        specialOfferItem: [],
        dealOfTheDay: [],
        popularItem: [],
    },
    reducers: {
        handleItemsByStoreReducer: (state = initialState, { payload }) => {
            if (payload.type == 'CLEAR_ALL') {
                return {
                    ...state,
                    merchantId: '',
                    customstore_id: '',
                    typeInfoByShop: [],
                    subtypeInfoByShop: [],
                    typeName: '',
                    subtypeByselectedType: [],
                    categoryInfo: [],
                    productInfoByShop: [],
                    specialOfferItem: [],
                    dealOfTheDay: [],
                    popularItem: [],
                };
            }
            else if (payload.type == 'SAVE_PRODUCT_INFO') {
                let itemsInfo = [];
                if (payload?.data?.length > 0) {
                    itemsInfo = [...state.productInfoByShop, ...payload.data];
                }
                return {
                    ...state,
                    productInfoByShop: itemsInfo,
                    isLoading: false,
                };
            }
            else if (payload.type == 'SAVE_TYPE_SUBTYPE_INFO_BY_SHOP') {
                return {
                    ...state,
                    isLoading: false,
                    typeInfoByShop: payload.data.typeInfoByShop,
                    subtypeInfoByShop: payload.data.subtypeInfoByShop,
                };
            }
            else if (payload.type == 'EXPLORE_GROCERY_STORE') {
                return {
                    ...state,
                    isLoading: false,
                    typeInfoByShop: payload?.data?.ProductTypeByShop,
                    subtypeInfoByShop: payload?.data?.ProductSubTypeByShop,
                    DashboardSlider: payload?.data?.DashboardSlider || [],
                    specialOfferItem: payload?.data?.specialOfferItem || [],
                    dealOfTheDay: payload?.data?.dealOfTheDay || [],
                    popularItem: payload?.data?.popularItem || [],
                    merchantId: payload?.data?.storeId || '',
                    customstore_id: payload?.data?.customstoreId || '',
                };
            }
            else if (payload.type == 'SAVE_SUBTYPE_INFO_BY_TYPE') {
                return {
                    ...state,
                    typeName: payload?.data?.typeName,
                    subtypeByselectedType: payload?.data?.subtype || [],
                };
            }
            else if (payload.type == 'SAVE_POPULAR_PRODUCT_INFO') {
                let itemsInfo = [];
                if (payload?.data?.length > 0) {
                    itemsInfo = [...state.popularItem, ...payload.data];
                }
                return {
                    ...state,
                    popularItem: itemsInfo,
                    isLoading: false,
                };
            }
            else {
                return {
                    ...state,
                };
            }
        },
    },
});

export const { handleItemsByStoreReducer } = itemsByStoreReducer.actions;

export default itemsByStoreReducer.reducer;
