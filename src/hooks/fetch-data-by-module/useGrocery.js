import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GROCERY_ADMIN_URL } from "@env"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EXPLORE_GROCERY_STORE, GROCERY_ITEMS_BY_CUSTOMTYPE, GROCERY_ITEMS_BY_SUBTYPE, GROCERY_ITEM_DETAILS, NEAREST_GROCERY_STORE, SEARCH_GROCERY_ITEMS, SEARCH_GROCERY_STORE } from '../../helpers/Constants';
import { handleItemsByStoreReducer } from '../../store/reducers/items-by-shop';
import { handleDashboardReducer } from '../../store/reducers/dashboardReducer';
import { Alert } from 'react-native';

axios.defaults.withCredentials = true;

export const useGrocery = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);
    const [itemNotfound, setItemNotfound] = useState(false);
    const [loadingMore, setLoadingMore] = useState(true);
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);
    const [progressing, setProgressing] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [message, setMessage] = useState('');
    const { userLatitude, userLongitude, districtId } = useSelector((state) => state.user);
    //const { merchantId, customstore_id } = useSelector((state) => state.itemsByStoreReducer);
    //const { specialOfferItem, dealOfTheDay } = useSelector((state) => state.itemsByStoreReducer);
    
    //console.log('GROCERY_ADMIN_URL', GROCERY_ADMIN_URL);

    const Axios = axios.create({
        baseURL: GROCERY_ADMIN_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const AxiosTest = axios.create({
        baseURL: 'http://localhost:6012',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const setCurrentModule = () => {
        dispatch(
            handleDashboardReducer({
                type: 'SET_CURRENT_MODULE',
                data: 'dashboard',
            })
        );
    };

    const saveItemsToReducer = (items) => {
        dispatch(
            handleItemsByStoreReducer({
                type: 'SAVE_PRODUCT_INFO',
                data: items,
            })
        );
    };

    const resetReducer = () => {

        dispatch(
            handleItemsByStoreReducer({
                type: 'CLEAR_ALL',
                data: true,
            })
        );

        dispatch(
            handleDashboardReducer({
                type: 'SET_CURRENT_MODULE',
                data: 'Grocery',
            })
        );
    };

    const getNearestGroceryStoreInfo = (setNearestInfo, distance = 1000000) => {
        resetReducer();
        setProgressing(true);
        const props = {
            shop_longitude: userLongitude,
            shop_latitude: userLatitude,
            max_distance: distance,
            districtId: districtId
        };
        //console.log(props);
        //saveLoadingStatus(true);
        Axios
            .post(NEAREST_GROCERY_STORE, props)
            .then(response => {
                //console.log(response.data);
                setNearestInfo(response.data.result);
                setProgressing(false);
            })
            .catch(error => {
                console.log('Error : ', error.response.data)
                setProgressing(false);
            })
        setTimeout(() => {
            if (progressing) {
                setProgressing(false);
            }
        }, 10000);
    }

    const handleSearchStore = (searchText, setNearestInfo) => {
        if (searchText.length > 1) {
            setProgressing(true);
            Axios
                .get(SEARCH_GROCERY_STORE,
                    {
                        params: {
                            search: searchText,
                        }
                    }
                ).then((res) => {
                    setNearestInfo(res.data.result);
                    setProgressing(false);
                })
                .catch((error) => {
                    setProgressing(false);

                });

            setTimeout(() => {
                if (progressing) {
                    setProgressing(false);
                }
            }, 10000);
        }
    }

    const exploreStore = (data) => {
        resetReducer();
        setProgressing(true);
        Axios
            .get(EXPLORE_GROCERY_STORE,
                {
                    params: {
                        storeId: data?._id,
                        custom_store_id: data?.custom_store_id,
                    }
                }
            )
            .then((res) => {
                //console.log(res?.data?.result);
                if (res?.data?.result?.ShopDetails[0]?.is_closed || !res?.data?.result?.ShopDetails[0]?.is_active || res?.data?.result?.ShopDetails[0]?.is_banned) {
                    navigation.goBack();
                    Alert.alert("Sorry we're closed !!", "See you tomorrow !!", [
                        {
                            text: "Ok",
                            onPress: () => null,
                            style: 'default'
                        },
                    ]);
                } else {
                    dispatch(
                        handleItemsByStoreReducer({
                            type: 'EXPLORE_STORE_ITEMS',
                            data: res?.data?.result,
                        })
                    );

                    dispatch(
                        handleDashboardReducer({
                            type: 'EXPLORE_STORE',
                            data: res?.data?.result,
                        })
                    );
                }

                setProgressing(false);

            })
            .catch((error) => {
                setProgressing(false);
                console.log(error);
            });

    };

    const resetLoadingStatus = (status = false) => {
        saveItemsToReducer([]);
        setShowActivityIndicator(true);
        setItemNotfound(false);
        setAllLoaded(status);
        setLoadingMore(true);
    }

    useEffect(() => {
        if (error) {
            //userLogOut();
        }
    }, [error]);

    return {
        Axios,
        showActivityIndicator,
        loadingMore,
        itemNotfound,
        allLoaded,
        progressing,
        showErrorMessage,
        showSuccessMessage,
        message,
        setProgressing,
        setShowErrorMessage,
        setShowSuccessMessage,
        setLoadingMore,
        saveItemsToReducer,
        getNearestGroceryStoreInfo,
        handleSearchStore,
        exploreStore,
        resetLoadingStatus,
        resetReducer,
        setCurrentModule
    };
};