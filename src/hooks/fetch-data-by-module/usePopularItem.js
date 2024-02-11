import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GROCERY_ADMIN_URL, MEDICINE_ADMIN_URL } from "@env"
import axios from 'axios';
import { handleItemsByStoreReducer } from '../../store/reducers/items-by-shop';
import { GROCERY_ITEMS_BY_CUSTOMTYPE, MEDICINE_ITEMS_BY_CUSTOMTYPE } from '../../helpers/Constants';
import { handleStateReducer } from '../../store/reducers/stateReducer';

axios.defaults.withCredentials = true;

export const usePopularItem = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    //const popularItem = useSelector((state) => state.itemsByStoreReducer.popularItem);

    //console.log(MEDICINE_ADMIN_URL);

    const AxiosGrocery = axios.create({
        baseURL: GROCERY_ADMIN_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const AxiosMedicine = axios.create({
        baseURL: MEDICINE_ADMIN_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const getPopularItems = (parameter, module, pageNo) => {
       
        let Axios = AxiosGrocery;
        let dataURL = GROCERY_ITEMS_BY_CUSTOMTYPE;
        if (module === 'from_medicine') {
            dataURL = MEDICINE_ITEMS_BY_CUSTOMTYPE;
            Axios = AxiosMedicine;
        }

        parameter.page = pageNo

        Axios
            .get(dataURL,
                {
                    params: parameter
                }
            )
            .then((res) => {

                if (res?.data?.result?.length > 0) {
                    saveItemsToReducer(res?.data?.result);
                }

                if (res?.data?.result?.length < 24) {
                    setAllLoaded(true);
                    //console.log('stop');
                }

                setLoadingMore(false);
            })
            .catch((error) => {
                setAllLoaded(true);
                setLoadingMore(false);
                //console.log('From grocery Items : ', error);
            });

    };

    const saveItemsToReducer = (items) => {
        dispatch(
            handleItemsByStoreReducer({
                type: 'SAVE_POPULAR_PRODUCT_INFO',
                data: items,
            })
        );
    };

    const setAllLoaded = (status) => {
        dispatch(
            handleStateReducer({
                type: 'SET_ALL_LAODED',
                data: status,
            })
        );
    };

    const setItemNotfound = (status) => {
        dispatch(
            handleStateReducer({
                type: 'SET_ITEM_NOT_FOUND',
                data: status,
            })
        );
    };

    const setLoadingMore = (status) => {
        dispatch(
            handleStateReducer({
                type: 'SET_LOADING_MORE',
                data: status,
            })
        );
    };

    const resetState = () => {
        //console.log('resetState')
        setItemNotfound(false);
        setAllLoaded(false);
        setLoadingMore(false);
    }

    useEffect(() => {
        if (error) {
            //userLogOut();
        }
    }, [error]);

    return {
        //popularItem,
        setLoadingMore,
        resetState,
        setLoadingMore,
        getPopularItems
    };
};