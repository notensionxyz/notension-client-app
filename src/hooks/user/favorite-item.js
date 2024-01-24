import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_ADMIN_URL } from "@env"
import { MEDICINE_ADMIN_URL, MEDICINE_ADMIN_URL_LOCAL, GROCERY_ADMIN_URL } from "@env"
import axios from 'axios';
import { FAVORITE_PRODUCT_ADD, FAVORITE_PRODUCT_PUSH, FAVORITE_PRODUCT_REMOVE, GROCERY_ITEM_DETAILS, MEDICINE_ITEM_DETAILS } from '../../helpers/Constants';
import { handleUserChoiceReducer } from '../../store/reducers/userChoiceReducer';
import { Alert } from 'react-native';
axios.defaults.withCredentials = true;

//console.log('USER_ADMIN_URL', USER_ADMIN_URL);

const Axios = axios.create({
    baseURL: USER_ADMIN_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

export const useFavouriteItem = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [visible, setVisible] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [message, setMessage] = useState('');
    const { merchantId, customstore_id } = useSelector((state) => state.itemsByStoreReducer);
    const loggedinUserInfo = useSelector((state) => state.user.userInfo);
    const { favouriteGroceryItems, favouriteMedicineItems } = useSelector((state) => state.userChoice);

    const isAddedToFavouriteItems = (productId, merchantType) => {
        let existingIndex;

        if (merchantType === 0) {
            existingIndex = favouriteGroceryItems.findIndex((shop) => shop?.productId === productId);
        } else {
            existingIndex = favouriteMedicineItems.findIndex((shop) => shop?.productId === productId);
        }

        if (existingIndex > -1) {
            return true;
        } else {
            return false;
        }
    };

    const addToFavouriteItems = (data, merchantType) => {

        let favouriteItems = 0;
        let favouriteInfo;
        if (data?._id !== '' && loggedinUserInfo?._id) {
            setVisible(true);
            if (merchantType === 0) {
                favouriteItems = favouriteGroceryItems.length;
                favouriteInfo = {
                    merchantType: merchantType,
                    customerInfo: loggedinUserInfo?._id,
                    custom_customer_id: loggedinUserInfo?.custom_id,
                    productId: data?.productInfoTable,
                    product_title_eng: data?.product_title_eng,
                    product_title_beng: data?.product_title_beng,
                    pack_size: data?.pack_size,
                    app_image: data?.app_image,
                };
            } else {
                favouriteInfo = {
                    merchantType: merchantType,
                    customerInfo: loggedinUserInfo?._id,
                    custom_customer_id: loggedinUserInfo?.custom_id,
                    productId: data?.medStoreProductInfo,
                    item_title_eng: data?.item_title_eng,
                    strength: data?.strength,
                    pack_size: data?.pack_size,
                    app_image: data?.app_image,
                };
                favouriteItems = favouriteMedicineItems.length;
            }

            if (favouriteItems < 1) {
                manageFavouriteStoreItems(FAVORITE_PRODUCT_ADD, favouriteInfo, 'add');
            } else {
                if (favouriteItems > 99) {
                    Alert.alert("Hold on!", "You can add up to hundred (100) Items to your Favorites list !!", [
                        {
                            text: "OK",
                            onPress: () => null,
                            style: 'default'
                        }
                    ]);
                } else {
                    manageFavouriteStoreItems(FAVORITE_PRODUCT_PUSH, favouriteInfo, 'push');
                }
            }
        }
    }

    const removeFromfavoriteItems = (data, merchantType) => {
        setVisible(true);
        let favouriteInfo = {
            merchantType: merchantType,
            customerInfo: loggedinUserInfo?._id,
            custom_customer_id: loggedinUserInfo?.custom_id,
            ...data
        }

        setTimeout(() => {
            manageFavouriteStoreItems(FAVORITE_PRODUCT_REMOVE, favouriteInfo, 'remove');
        }, 500);
    };

    const manageFavouriteStoreItems = (route, favouriteInfo, action) => {

        Axios
            .post(route, favouriteInfo)
            .then((res) => {
                manageReducer(favouriteInfo, action, res?.data?.result)

            })
            .catch((error) => {
                setVisible(false);
                console.log('Error.........+', error);
            });
    };

    const manageReducer = (favouriteInfo, action, response) => {

        if (action === 'remove') {

            removeFromReducer({ merchantType: favouriteInfo?.merchantType, productId: favouriteInfo?.productId })
        } else {

            addToReducer({ merchantType: favouriteInfo?.merchantType, itemInfo: response });
        }

        setVisible(false);
    }

    const addToReducer = (Info) => {
        dispatch(
            handleUserChoiceReducer({
                type: 'ADD_TO_FAVOURITE_ITEM_LIST',
                data: Info,
            })
        );
        Alert.alert("Done!!", "পণ্যটি আপনার ফেভারিট লিস্টের অন্তর্ভূক্ত করা হল", [
            {
                text: "OK",
                onPress: () => null,
                style: "OK"
            },
        ]);

    }

    const removeFromReducer = (Info) => {
        dispatch(
            handleUserChoiceReducer({
                type: 'REMOVE_FROM_FAVOURITE_ITEM_LIST',
                data: Info,
            })
        );
        Alert.alert("Done!!", "পণ্যটি আপনার ফেভারিট লিস্ট থেকে বাদ দেওয়া হল", [
            {
                text: "OK",
                onPress: () => null,
                style: "OK"
            },
        ]);

    }

    const AxiosGrocery = axios.create({
        baseURL: GROCERY_ADMIN_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const getGroceryProductDetails = (productInfoTable) => {
        setShowErrorMessage(false);
        setVisible(true);
        AxiosGrocery
            .get(GROCERY_ITEM_DETAILS,
                {
                    params: {
                        productInfoTable: productInfoTable,
                        groceryStoreId: merchantId,
                        custom_store_id: customstore_id,
                    }
                }
            ).then((res) => {
                //console.log(res?.data?.result);
                setVisible(false);
                if (res?.data?.success) {
                    navigation.navigate('GroceryProductDetails', { data: res?.data?.result });
                } else {
                    setMessage('এই মুহুর্তে পণ্যটি দোকানে নেই !!');
                    setShowErrorMessage(true);
                }
            })
            .catch((error) => {
                setVisible(false);
            });
    }

    const AxiosMedicine = axios.create({
        baseURL: MEDICINE_ADMIN_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const getMedicineProductDetails = (medStoreProductInfo) => {
        setShowErrorMessage(false);
        setVisible(true);
        AxiosMedicine
            .get(MEDICINE_ITEM_DETAILS,
                {
                    params: {
                        medStoreProductInfo: medStoreProductInfo,
                        merchantId: merchantId,
                        custom_store_id: customstore_id,
                    }
                }
            ).then((res) => {
                //console.log(res?.data?.result);
                setVisible(false);
                if (res?.data?.success) {
                    navigation.navigate('MedicineProductDetails', { data: res?.data?.result });
                } else {
                    setMessage('এই মুহুর্তে পণ্যটি দোকানে নেই !!');
                    setShowErrorMessage(true);
                }
            })
            .catch((error) => {
                setVisible(false);
            });
    }

    useEffect(() => {
        if (error) {
            //userLogOut();
        }
    }, [error]);

    return {
        visible,
        showErrorMessage,
        message,
        setShowErrorMessage,
        isAddedToFavouriteItems,
        addToFavouriteItems,
        removeFromfavoriteItems,
        getGroceryProductDetails,
        getMedicineProductDetails
    };
};