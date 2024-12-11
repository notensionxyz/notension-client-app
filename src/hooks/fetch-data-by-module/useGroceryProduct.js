import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GROCERY_ADMIN_URL } from "@env"
import axios from 'axios';
import { GROCERY_ITEMS_BY_CUSTOMTYPE, GROCERY_ITEMS_BY_SUBTYPE, SEARCH_GROCERY_ITEMS } from '../../helpers/Constants';


axios.defaults.withCredentials = true;

export const useGroceryProduct = () => {

    const [error, setError] = useState(false);
    const [productInfo, setProductInfo] = useState([]);
    const [allLoaded, setAllLoaded] = useState(false);
    const [itemNotfound, setItemNotfound] = useState(false);
    const [loadingMore, setLoadingMore] = useState(true);
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);
    const [progressing, setProgressing] = useState(false);

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
        if (items.length < 1) {
            setProductInfo([]);
        } else {
            //setProductInfo(items);
            setProductInfo((prevInfo) => [...prevInfo, ...items]);
        }

        // dispatch(
        //     handleItemsByStoreReducer({
        //         type: 'SAVE_PRODUCT_INFO',
        //         data: items,
        //     })
        // );
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
                    setPageNo(pageNo + 1);
                    if (res?.data?.result.length > 0) {
                        saveItemsToReducer(res?.data?.result);
                    }
                    
                    if (res?.data?.result.length < 24) {
                        setAllLoaded(true);
                        //setShowActivityIndicator(false);
                    }

                    if (pageNo === 1 && res?.data?.result.length < 1) {
                        setItemNotfound(true);
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
        //let goForSearch = false;
        let dataURL = GROCERY_ITEMS_BY_SUBTYPE;

        let parameter = {
            groceryStoreId: merchantId,
            custom_store_id: customstore_id,
            page: pageNo,
        }

        if (options.productSubtype !== '') {
            parameter.productSubtype = options.productSubtype;
            //goForSearch = true;
        }

        if (options.customType !== '') {
            parameter.customType = options.customType;
            dataURL = GROCERY_ITEMS_BY_CUSTOMTYPE;
        }

        if (pageNo === 1) {
            resetLoadingStatus();
        }

        console.log('parameter', parameter);

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

                }

                if (pageNo === 1 && res?.data?.result?.length < 1) {
                    setItemNotfound(true);
                }

                if (res?.data?.result?.length < 24) {
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

    // useEffect(() => {
    //     if (error) {
    //         //userLogOut();
    //     }
    // }, []);

    return {
        showActivityIndicator,
        loadingMore,
        allLoaded,
        itemNotfound,
        progressing,
        setLoadingMore,
        handleSearch,
        getItemsOnPress,
        reloadCustomTypeData,
        resetLoadingStatus,
        productInfo
    };
};