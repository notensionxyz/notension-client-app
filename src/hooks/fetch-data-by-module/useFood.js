import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FOOD_ADMIN_URL } from "@env"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EXPLORE_FOOD_MODULE, EXPLORE_FOOD_STORE, NEAREST_FOOD_STORE } from '../../helpers/Constants';
import { handleItemsByStoreReducer } from '../../store/reducers/items-by-shop';
import { handleDashboardReducer } from '../../store/reducers/dashboardReducer';

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
    const { merchantId, customstore_id } = useSelector((state) => state.itemsByStoreReducer);
    const { specialOfferItem, dealOfTheDay } = useSelector((state) => state.itemsByStoreReducer);

    console.log('FOOD_ADMIN_URL', FOOD_ADMIN_URL);

    const Axios = axios.create({
        baseURL: FOOD_ADMIN_URL,
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
        console.log(props);
        
        Axios
            .post(NEAREST_FOOD_STORE, props)
            .then(response => {
                console.log("Nearest : ",response.data.result);
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

    const exploreStore = (data) => {
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
                //console.log(res?.data?.result);
                dispatch(
                    handleItemsByStoreReducer({
                        type: 'EXPLORE_STORE_ITEMS',
                        data: res?.data?.result,
                    })
                );

                dispatch(
                    handleDashboardReducer({
                        type: 'EXPLORE_MED_STORE',
                        data: res?.data?.result,
                    })
                );

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
        exploreStore,
        resetLoadingStatus,
    };
};