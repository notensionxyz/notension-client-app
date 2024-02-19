import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FOOD_ADMIN_URL } from "@env"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EXPLORE_FOOD_MODULE, EXPLORE_FOOD_STORE, NEAREST_FOOD_STORE, SEARCH_FOOD_STORE } from '../../helpers/Constants';
import { handleItemsByStoreReducer } from '../../store/reducers/items-by-shop';
import { handleDashboardReducer } from '../../store/reducers/dashboardReducer';
import { Alert } from 'react-native';

axios.defaults.withCredentials = true;

export const useFood = () => {
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

    //console.log('FOOD_ADMIN_URL', FOOD_ADMIN_URL);

    const Axios = axios.create({
        baseURL: FOOD_ADMIN_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const AxiosTest = axios.create({
        baseURL: 'http://localhost:6013',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

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
                data: 'Food',
            })
        );
    };

    const exploreFoodModule = () => {
        resetReducer();
        setProgressing(true);

        Axios
            .get(EXPLORE_FOOD_MODULE, {
                params: {
                    district_id: districtId
                }
            })
            .then(res => {
                //console.log('res.data.result : ', res.data.result);
                dispatch(
                    handleDashboardReducer({
                        type: 'EXPLORE_FOOD_MODULE',
                        data: res?.data?.result,
                    })
                );
                setProgressing(false);
            })
            .catch(error => {
                //console.log('Error : ', error.response)
                setProgressing(false);
            })
        setTimeout(() => {
            if (progressing) {
                setProgressing(false);
            }
        }, 10000);
    }

    const getNearestFoodStoreInfo = (setNearestInfo, data) => {
        setProgressing(true);
        const props = {
            shop_longitude: userLongitude,
            shop_latitude: userLatitude,
            max_distance: data.regularDistance,
            StoreCategory: data._id,
            district_id: districtId
        };
        //console.log(props);

        Axios
            .post(NEAREST_FOOD_STORE, props)
            .then(response => {
                //console.log("Nearest : ",response.data.result);
                setNearestInfo(response.data.result);
                setProgressing(false);
            })
            .catch(error => {
                //console.log('Error : ', error.response)
                setProgressing(false);
            })
        setTimeout(() => {
            if (progressing) {
                setProgressing(false);
            }
        }, 10000);
    }

    const handleSearchStore = (searchText, setNearestInfo, data) => {
        if (searchText.length > 1) {
            setProgressing(true);
            Axios
                .get(SEARCH_FOOD_STORE,
                    {
                        params: {
                            search: searchText,
                            StoreCategory: data._id,
                        }
                    }
                ).then((res) => {
                    setNearestInfo(res.data.result);
                    setProgressing(false);
                })
                .catch((error) => {
                    //console.log()
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
        //console.log(data?._id);
        setProgressing(true);
        Axios
            .get(EXPLORE_FOOD_STORE,
                {
                    params: {
                        storeId: data?._id,
                        custom_store_id: data?.custom_store_id,
                    }
                }
            )
            .then((res) => {

                if (res?.data?.result?.shopDetails[0]?.is_closed || !res?.data?.result?.shopDetails[0]?.is_active || res?.data?.result?.shopDetails[0]?.is_banned) {
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
                            type: 'EXPLORE_FOOD_STORE_ITEMS',
                            data: res?.data?.result,
                        })
                    );

                    dispatch(
                        handleDashboardReducer({
                            type: 'VISITED_FOOD_STORE',
                            data: res?.data?.result?.shopDetails[0] || {},
                        })
                    );
                }

                //console.log('res?.data?.result?.shopDetails : ', res?.data?.result?.shopDetails);

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
        exploreFoodModule,
        getNearestFoodStoreInfo,
        handleSearchStore,
        exploreStore,
        resetLoadingStatus,
        resetReducer
    };
};