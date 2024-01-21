import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleCartReducer } from '../../store/reducers/cartReducer';

export const handleGroceryItems = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const loggedinUserInfo = useSelector((state) => state.user.userInfo);
    const { defaultGroceryStore,
        defaultMedicineStore,
        currentGroceryStore,
        currentMedicineStore,
        currentFoodShop,
        favouriteGroceryStore,
        favouriteMedicineStore,
        favouriteFoodShop } = useSelector((state) => state.userChoice);

    const isAddedToFavouriteList = (_id, merchantType) => {
        let existingIndex;

        if (merchantType === 0) {
            existingIndex = favouriteGroceryStore.findIndex((store) => store?.storeId === _id);
        } else if (merchantType === 1) {
            existingIndex = favouriteMedicineStore.findIndex((store) => store?.storeId === _id);
        } else {
            existingIndex = favouriteFoodShop.findIndex((shop) => shop?.storeId === _id);
        }

        if (existingIndex > -1) {
            return true;
        } else {
            return false;
        }
    };

    const addToFavouriteList = (data, merchantType) => {
        if (data?._id !== '' && data?.custom_store_id !== '' && loggedinUserInfo?._id) {
            const favouriteInfo = {
                merchantType: merchantType,
                customerInfo: loggedinUserInfo?._id,
                custome_custom_id: loggedinUserInfo?.custom_id,
                storeId: data?._id,
                custom_store_id: data?.custom_store_id,
                shop_name: data?.shop_name,
                shop_address: data?.shop_address,
                shop_banner_app: data?.shop_banner_app,
                contact_no: data?.contact_no,
                alternative_contact_no: data?.alternative_contact_no,
            };
            addToReducer(favouriteInfo);
        }
    }

    const addToReducer = (favouriteInfo) => {
        dispatch(
            handleCartReducer({
                type: 'ADD_TO_FAVOURITE_MERCHANT_LIST',
                data: favouriteInfo,
            })
        );
    }

    const removeFromfavoriteList = (favouriteInfo) => {
        removeFromReducer(favouriteInfo);
    };

    const removeFromReducer = (favouriteInfo) => {
        dispatch(
            handleCartReducer({
                type: 'REMOVE_FROM_FAVOURITE_MERCHANT_LIST',
                data: favouriteInfo,
            })
        );
    }

    useEffect(() => {
        if (error) {
            //userLogOut();
        }
    }, [error]);

    return {
        isAddedToFavouriteList,
        addToFavouriteList,
        removeFromfavoriteList
    };
};