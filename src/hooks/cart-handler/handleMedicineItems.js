import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleCartReducer } from '../../store/reducers/cartReducer';

export const handleMedicineItems = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [error, setError] = useState(false);

    const medicineItems = useSelector((state) => state.cartItems.medicineItems);

    const getQty = (_id) => {
        let newState = [];
        const existingItemIndex = medicineItems.findIndex(
            (item) => item?._id === _id
        );
        if (existingItemIndex > -1) {
            newState = [...medicineItems];
            return medicineItems[existingItemIndex].quantity;
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
            console.log('product groceryItems : ', product);
            dispatch(
                handleCartReducer({
                    type: 'ADD_TO_CART_MEDICINE',
                    data: product,
                })
            );
        }
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
        isInOutOfStockList
    };
};