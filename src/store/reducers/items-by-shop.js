'use client';
import { createSlice } from '@reduxjs/toolkit';

const itemsByStoreReducer = createSlice({
    name: 'itemsByStore',
    initialState: {
        merchantId: '',
        customstore_id: '',
        typeName: '',
        subtypeByselectedType: [],
        productInfoByShop: [],
        specialOfferItem: [],
        dealOfTheDay: [],
        popularItem: [],
        productCategory: [],
        pageNoForPopular: 2,
    },
    reducers: {
        handleItemsByStoreReducer: (state = initialState, { payload }) => {
            if (payload.type == 'CLEAR_ALL') {
                return {
                    ...state,
                    merchantId: '',
                    customstore_id: '',
                    typeName: '',
                    subtypeByselectedType: [],
                    productInfoByShop: [],
                    specialOfferItem: [],
                    dealOfTheDay: [],
                    popularItem: [],
                    pageNoForPopular: 2,
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
            else if (payload.type == 'EXPLORE_STORE_ITEMS') {
                return {
                    ...state,
                    isLoading: false,
                    specialOfferItem: payload?.data?.specialOfferItem || [],
                    dealOfTheDay: payload?.data?.dealOfTheDay || [],
                    popularItem: payload?.data?.popularItem || [],
                    merchantId: payload?.data?.storeId || '',
                    customstore_id: payload?.data?.customstoreId || '',
                    pageNoForPopular: 2,
                };
            }
            else if (payload.type == 'EXPLORE_FOOD_STORE_ITEMS') {
                let productByCategory = [];
                payload?.data?.allProductCategory?.forEach((info, i) => {
                    productByCategory.push({
                        _id: info?.categoryInfo?._id,
                        catagory: info?.categoryName,
                        itemsInfo: payload?.data?.allProduct?.filter(
                            (item) => item?.productCategory === info?.categoryInfo?._id
                        )
                    });
                });
                return {
                    ...state,
                    isLoading: false,
                    productCategory: payload?.data?.allProductCategory || [],
                    productInfoByShop: productByCategory || [],
                    popularItem: payload?.data?.allProduct?.filter(p => p.is_popular === true) || [],
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
                state.popularItem = [...state.popularItem, ...payload.data];
                state.pageNoForPopular = parseFloat(state.pageNoForPopular) + 1
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
