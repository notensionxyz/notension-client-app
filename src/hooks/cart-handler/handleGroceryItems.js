import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleCartReducer } from '../../store/reducers/cartReducer';
import { Alert } from 'react-native';
import { handleDashboardReducer } from '../../store/reducers/dashboardReducer';

export const handleGroceryItems = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [pendingItem, setPendingItem] = useState({});
    const [error, setError] = useState(false);
    const { visitedGroceryStore, showProductPrice, isGroceryCartCheck } = useSelector((state) => state.dashboard);
    const {
        groceryStoreInfo,
        groceryItems,
        totalAmountGrocery,
        groceryCartStartAt } = useSelector((state) => state.cartItems);

    const [showPrice, setShowPrice] = useState(true);

    const getQty = (_id) => {
        const existingItemIndex = groceryItems.findIndex(
            (item) => item?._id === _id
        );
        if (existingItemIndex > -1) {
            return groceryItems[existingItemIndex].quantity;
        } else {
            return 0;
        }
    };

    const isInCart = (productInfoTable) => {
        const existingItemIndex = groceryItems.findIndex(
            (item) => item?.productInfoTable === productInfoTable
        );
        if (existingItemIndex > -1) {
            return groceryItems[existingItemIndex].quantity;
        } else {
            return 0;
        }
    };

    const addToCart = (item) => {
        if (item?._id !== '' && item?.sale_price > -1) {
            let productId = item?.productInfoTable;
            if (item?.productInfoTable?._id) {  // When product add from favorite list then item?.productInfoTable work as object
                productId = item?.productInfoTable?._id;
            }
            //console.log(productId);
            let product = {
                _id: item?._id,
                productInfoTable: productId,
                product_title_eng: item?.product_title_eng || '',
                product_title_beng: item?.product_title_beng || '',
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

            if (!showProductPrice) {
                product.max_retail_price = 0;
                product.sale_price = 0;
            }

            if (groceryItems.length > 0) {
                // console.log('groceryStoreInfo : ', groceryStoreInfo);
                // console.log('visitedGroceryStore : ', visitedGroceryStore);
                if (groceryStoreInfo?._id && groceryStoreInfo?._id !== visitedGroceryStore?._id) {
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
                type: 'GROCERY_ORDER_PLACED',
                data: [],
            })
        );
        saveStoreAndProductInfo(product);
    };

    const saveStoreAndProductInfo = (product) => {
        addProduct(product);
        dispatch(
            handleCartReducer({
                type: 'SAVE_GROCERY_STORE_INFO',
                data: visitedGroceryStore,
            })
        );
    };

    const addProduct = (product) => {
        dispatch(
            handleCartReducer({
                type: 'ADD_TO_CART_GROCERY',
                data: product,
            })
        );
    };

    const removeFromCart = (_id) => {
        dispatch(
            handleCartReducer({
                type: 'REMOVE_FROM_CART_GROCERY',
                data: _id,
            })
        );
    };

    const increaseQty = (product) => {
        dispatch(
            handleCartReducer({
                type: 'ADD_TO_CART_GROCERY',
                data: product,
            })
        );
    };

    const deccreseQty = (_id) => {
        dispatch(
            handleCartReducer({
                type: 'DECREASE_QUANTITY_GROCERY',
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
        if (groceryItems?.length > 0 && groceryStoreInfo?._id && groceryStoreInfo?._id !== visitedGroceryStore?._id) {
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
        if (groceryItems?.length > 0 && groceryStoreInfo?._id && groceryStoreInfo?._id !== visitedGroceryStore?._id) {
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
                type: 'GROCERY_ORDER_PLACED',
                data: [],
            })
        );
    };

    const replaceStore = () => {
        dispatch(
            handleCartReducer({
                type: 'SAVE_GROCERY_STORE_INFO',
                data: visitedGroceryStore,
            })
        );
    }

    const checkCartItem = () => {
        // const existProductIds = groceryItems.map(obj => obj._id);
        // console.log('existProductIds : ', existProductIds);
        if (groceryItems?.length > 0) {
            const cartAge = ((((new Date().getTime()) / 1000)) - ((new Date(groceryCartStartAt)) / 1000)).toFixed(2);
            if (parseFloat(cartAge) > parseFloat(72000)) {
                claerAndSwitch();
            }
        }
    }

    useEffect(() => {

        if (error) {
            //userLogOut();
        }
    }, [error]);

    return {
        groceryItems,
        totalAmountGrocery,
        getQty,
        isInCart,
        addToCart,
        removeFromCart,
        deccreseQty,
        isInOutOfStockList,
        proceedToPlaceOrder,
        proceedToClaerAnyWay,
        checkCartItem
    };
};