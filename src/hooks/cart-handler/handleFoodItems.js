import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleCartReducer } from '../../store/reducers/cartReducer';
import { Alert } from 'react-native';

export const handleFoodItems = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const visitedFoodStore = useSelector((state) => state.dashboard.visitedFoodStore);
    const {
        foodItems,
        foodStoreInfo } = useSelector((state) => state.cartItems);

    const getQty = (_id) => {
        const existingItemIndex = foodItems.findIndex(
            (item) => item?._id === _id
        );
        if (existingItemIndex > -1) {
            return foodItems[existingItemIndex].quantity;
        } else {
            return 0;
        }
    };

    const addToCart = (item) => {
        // dispatch(
        //     handleCartReducer({
        //         type: 'CLEAR_ALL',
        //         data: true,
        //     })
        // );

        if (item?._id !== '' && item?.sale_price > -1) {
            let product = {
                _id: item?._id,
                productCategory: item?.productCategory,
                product_title_eng: item?.product_title_eng || '',
                product_title_beng: item?.product_title_beng || '',
                pack_size: item?.pack_size || '',
                max_retail_price: item?.max_retail_price || 0,
                sale_price: item?.sale_price || 0,
                unit_symbol: item?.unit_symbol || '',
                max_allowed: item?.max_allowed || 0,
                quantity: 1,
                delivered_qty: 0,
                inc_qty: 1,
                app_image: item?.app_image,
            }

            if (foodItems.length > 0) {
                // console.log('foodStoreInfo : ', foodStoreInfo);
                // console.log('visitedFoodStore : ', visitedFoodStore);
                if (foodStoreInfo?._id && foodStoreInfo?._id !== visitedFoodStore?._id) {
                    Alert.alert("Hold on! Adding this item will clear your bag. Add any way?", "You already have items from another store in your bag !!", [
                        {
                            text: "Don't Add",
                            onPress: () => null,
                            style: 'cancel'
                        },
                        {
                            text: "Add Item",
                            onPress: () => emptyCartItems(product),
                            style: 'default'
                        },
                    ]);
                } else {
                    addProduct(product);
                }
            } else {
                saveStoreAndProductInfo(product);
            }

        }

    };

    const emptyCartItems = (product) => {
        dispatch(
            handleCartReducer({
                type: 'FOOD_ORDER_PLACED',
                data: [],
            })
        );
        saveStoreAndProductInfo(product);
    };

    const saveStoreAndProductInfo = (product) => {
        addProduct(product);
        dispatch(
            handleCartReducer({
                type: 'SAVE_FOOD_STORE_INFO',
                data: visitedFoodStore,
            })
        );
    };

    const addProduct = (product) => {
        dispatch(
            handleCartReducer({
                type: 'ADD_TO_CART_FOOD',
                data: product,
            })
        );
    };

    const removeFromCart = (_id) => {
        dispatch(
            handleCartReducer({
                type: 'REMOVE_FROM_CART_FOOD',
                data: _id,
            })
        );
    };

    const deccreseQty = (_id) => {
        dispatch(
            handleCartReducer({
                type: 'DECREASE_QUANTITY_FOOD',
                data: _id,
            })
        );
    };

    const isInOutOfStockList = (product_id) => {

        let isAvailable = 0;
        // if (outOfStockList[product_id]) {
        //     isAvailable = 1;
        // }

        return isAvailable;
    }

    const replaceStore = () => {
        if ((foodStoreInfo?._id && foodStoreInfo?._id === visitedFoodStore._id) || foodItems.length < 1 || !foodStoreInfo?._id) {
            dispatch(
                handleCartReducer({
                    type: 'SAVE_FOOD_STORE_INFO',
                    data: visitedFoodStore,
                })
            );
        }

        if (foodItems.length > 0) {
            if (foodStoreInfo?._id && foodStoreInfo?._id !== visitedFoodStore?._id) {
                Alert.alert("Hold on! Do you want to clear your bag. Clear any way?", "You already have items from another store in your bag !!", [
                    {
                        text: "No",
                        onPress: () => null,
                        style: 'cancel'
                    },
                    {
                        text: "Yes",
                        onPress: () => claerAndSwitch(),
                        style: 'default'
                    },
                ]);
            }
        }
    }

    const claerAndSwitch = () => {
        dispatch(
            handleCartReducer({
                type: 'FOOD_ORDER_PLACED',
                data: [],
            })
        );
        dispatch(
            handleCartReducer({
                type: 'SAVE_FOOD_STORE_INFO',
                data: visitedFoodStore,
            })
        );
    };

    useEffect(() => {
        if (error) {
            //userLogOut();
        }
    }, [error]);

    return {
        getQty,
        addToCart,
        removeFromCart,
        deccreseQty,
        replaceStore,
    };
};