import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GROCERY_ADMIN_URL } from "@env"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EXPLORE_GROCERY_STORE, GROCERY_ITEMS_BY_CUSTOMTYPE, GROCERY_ITEMS_BY_SUBTYPE, GROCERY_ITEM_DETAILS, NEAREST_GROCERY_STORE, SEARCH_GROCERY_ITEMS, SEARCH_GROCERY_STORE } from '../../helpers/Constants';
import { handleItemsByStoreReducer } from '../../store/reducers/items-by-shop';
import { handleDashboardReducer } from '../../store/reducers/dashboardReducer';
import { handleCartReducer } from '../../store/reducers/cartReducer';

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
    const { merchantId, customstore_id } = useSelector((state) => state.itemsByStoreReducer);
    const { specialOfferItem, dealOfTheDay } = useSelector((state) => state.itemsByStoreReducer);

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

                setProgressing(false);
                
            })
            .catch((error) => {
                setProgressing(false);
                console.log(error);
            });

    };

    const handleSearch = (searchText, pageNo, setPageNo) => {
        if (searchText.length > 1) {
            if (pageNo === 1) {
                resetLoadingStatus();
            }

            Axios
                .get(SEARCH_GROCERY_ITEMS,
                    {
                        params: {
                            search: searchText,
                            groceryStoreId: merchantId,
                            custom_store_id: customstore_id,
                            page: pageNo,
                        }
                    }
                ).then((res) => {

                    if (res?.data?.result.length > 0) {
                        setPageNo(pageNo + 1);
                        saveItemsToReducer(res?.data?.result);
                        if (res?.data?.result.length < 24) {
                            setAllLoaded(true);
                        }
                    }

                    if (pageNo === 1 && res?.data?.result.length < 1) {
                        setItemNotfound(true);
                        setAllLoaded(true);
                    }

                    setLoadingMore(false);
                })
                .catch((error) => {
                    setAllLoaded(true);
                    setLoadingMore(false);

                });
        }
    }

    const getItemsOnPress = (options, pageNo, setPageNo) => {
        let goForSearch = false;
        let dataURL = GROCERY_ITEMS_BY_SUBTYPE;

        let parameter = {
            groceryStoreId: merchantId,
            custom_store_id: customstore_id,
            page: pageNo,
        }

        if (options.productSubtype !== '') {
            parameter.productSubtype = options.productSubtype;
            goForSearch = true;
        }

        if (options.customType !== '') {
            parameter.customType = options.customType;
            dataURL = GROCERY_ITEMS_BY_CUSTOMTYPE;
        }

        // if (pageNo === 1) {
        //     resetLoadingStatus();
        // }

        //console.log('parameter', parameter);

        Axios
            .get(dataURL,
                {
                    params: parameter
                }
            )
            .then((res) => {
                //console.log(res?.data?.result);

                if (res?.data?.result?.length > 0) {
                    setPageNo(pageNo + 1);
                    saveItemsToReducer(res?.data?.result);
                    if (res?.data?.result?.length < 24) {
                        setAllLoaded(true);
                    }
                }

                if (pageNo === 1 && res?.data?.result?.length < 1) {
                    setItemNotfound(true);
                    setAllLoaded(true);
                }

                setLoadingMore(false);
            })
            .catch((error) => {
                setAllLoaded(true);
                setLoadingMore(false);
            });

    };

    const reloadCustomTypeData = (options, setPageNo) => {
        setTimeout(() => {
            if (options.customType === "64f5a306baa57a4707524d6e") { // this is "64f5a306baa57a4707524d6e" Offer Items ID

                if (specialOfferItem.length < 24) {
                    setAllLoaded(true);
                }
                saveItemsToReducer(specialOfferItem);

            } else {
                if (dealOfTheDay.length < 24) {
                    setAllLoaded(true);
                }
                saveItemsToReducer(dealOfTheDay);
            }
            setLoadingMore(false);
            setPageNo(2);
        }, 500);
    }

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
        handleSearch,
        getItemsOnPress,
        getNearestGroceryStoreInfo,
        handleSearchStore,
        exploreStore,
        reloadCustomTypeData,
        resetLoadingStatus,
        resetReducer
    };
};