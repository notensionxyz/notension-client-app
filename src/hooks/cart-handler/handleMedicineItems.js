import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleCartReducer } from '../../store/reducers/cartReducer';
import { Alert } from 'react-native';

export const handleMedicineItems = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const visitedMedicineStore = useSelector((state) => state.dashboard.visitedMedicineStore);
    const { medicineStoreInfo, medicineItems } = useSelector((state) => state.cartItems);

    const getQty = (_id) => {
        const existingItemIndex = medicineItems.findIndex(
            (item) => item?._id === _id
        );
        if (existingItemIndex > -1) {
            return medicineItems[existingItemIndex].quantity;
        } else {
            return 0;
        }
    };

    const isInCart = (medStoreProductInfo) => {
        const existingItemIndex = medicineItems.findIndex(
            (item) => item?.medStoreProductInfo === medStoreProductInfo
        );
        if (existingItemIndex > -1) {
            return medicineItems[existingItemIndex].quantity;
        } else {
            return 0;
        }
    }

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
                medStoreProductInfo: item?.medStoreProductInfo,
                item_title_eng: item?.item_title_eng || '',
                item_title_beng: item?.item_title_beng || '',
                pack_size: item?.pack_size || '',
                purchase_price: item?.purchase_price || 0,
                max_retail_price: item?.max_retail_price || 0,
                sale_price: item?.sale_price || 0,
                unit_symbol: item?.unit_symbol || '',
                max_allowed: item?.max_allowed || 0,
                quantity: 1,
                delivered_qty: 0,
                inc_qty: 1,
                app_image: item?.app_image,
            }

            if (medicineItems.length > 0) {
                if (medicineStoreInfo?._id && medicineStoreInfo?._id !== visitedMedicineStore?._id) {
                    Alert.alert("Hold on! Adding this item will clear your cart. Add any way?", "You already have items from another store in your bag !!", [
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
                type: 'MEDICINE_ORDER_PLACED',
                data: [],
            })
        );
        saveStoreAndProductInfo(product);
    };

    const saveStoreAndProductInfo = (product) => {
        addProduct(product);
        dispatch(
            handleCartReducer({
                type: 'SAVE_MEDICINE_STORE_INFO',
                data: visitedMedicineStore,
            })
        );
    };

    const addProduct = (product) => {
        dispatch(
            handleCartReducer({
                type: 'ADD_TO_CART_MEDICINE',
                data: product,
            })
        );
    };

    const removeFromCart = (_id) => {
        dispatch(
            handleCartReducer({
                type: 'REMOVE_FROM_CART_MEDICINE',
                data: _id,
            })
        );
    };

    const deccreseQty = (_id) => {
        dispatch(
            handleCartReducer({
                type: 'DECREASE_QUANTITY_MEDICINE',
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

    const proceedToPlaceOrder = () => {

        if (medicineItems.length > 0 && medicineStoreInfo?._id && medicineStoreInfo?._id !== visitedMedicineStore?._id) {
            Alert.alert("Hold on! Proceeding to place order will clear your bag. Proceed any way?", "You already have items from another store in your bag !!", [
                {
                    text: "Cancel",
                    onPress: () => navigation.goBack(),
                    style: 'cancel'
                },
                {
                    text: "Proceed",
                    onPress: () => claerAndSwitch(),
                    style: 'default'
                },
            ]);

        } else {
            replaceStore();
        }
    }

    const proceedToClaerAnyWay = () => {
        if (medicineItems.length > 0 && medicineStoreInfo?._id && medicineStoreInfo?._id !== visitedMedicineStore?._id) {
            Alert.alert("Hold on! Do you want to clear your bag. Clear any way?", "You already have items from another store in your bag !!", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: 'cancel'
                },
                {
                    text: "OK",
                    onPress: () => claerAndSwitch(),
                    style: 'default'
                },
            ]);
        } else {
            replaceStore();
        }
    }

    const claerAndSwitch = () => {
        replaceStore();
        dispatch(
            handleCartReducer({
                type: 'MEDICINE_ORDER_PLACED',
                data: [],
            })
        );
    };

    const replaceStore = () => {
        dispatch(
            handleCartReducer({
                type: 'SAVE_MEDICINE_STORE_INFO',
                data: visitedMedicineStore,
            })
        );
    }

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
        isInOutOfStockList,
        isInCart,
        proceedToClaerAnyWay,
        proceedToPlaceOrder
    };
};