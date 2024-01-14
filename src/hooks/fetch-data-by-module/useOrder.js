import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MEDICINE_ADMIN_URL, GROCERY_ADMIN_URL, GROCERY_ADMIN_URL_LOCAL } from "@env"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { GROCERY_ORDER_INFO, GROCERY_PLACE_ORDER, MEDICINE_ORDER_INFO, MEDICINE_PLACE_ORDER } from '../../helpers/Constants';
import { handleCartReducer } from '../../store/reducers/cartReducer';
import { handleUserReducer } from '../../store/reducers/userReducer';

axios.defaults.withCredentials = true;

export const useOrder = () => {
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
    const currentModule = useSelector((state) => state.dashboard.currentModule);
    const { userLatitude, userLongitude, districtId, userInfo } = useSelector((state) => state.user);

    console.log('GROCERY_ADMIN_URL', GROCERY_ADMIN_URL);

    const AxiosGrocery = axios.create({
        baseURL: GROCERY_ADMIN_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const AxiosWithFormDataGrocery = axios.create({
        baseURL: GROCERY_ADMIN_URL,
        headers: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
        },
    });

    const AxiosMedicine = axios.create({
        baseURL: MEDICINE_ADMIN_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const AxiosWithFormDataMedicine = axios.create({
        baseURL: MEDICINE_ADMIN_URL,
        headers: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
        },
    });

    const AxiosTest = axios.create({
        baseURL: GROCERY_ADMIN_URL_LOCAL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const placceOrder = (formData) => {
        let AxiosWithFormData;
        let URL;

        if (currentModule === 'Grocery') {
            AxiosWithFormData = AxiosWithFormDataGrocery;
            URL = GROCERY_PLACE_ORDER;
        } else if (currentModule === 'Medicine') {
            AxiosWithFormData = AxiosWithFormDataMedicine;
            URL = MEDICINE_PLACE_ORDER;
        } else if (currentModule === 'Food') {

        }

        console.log('URL', formData);
        setProgressing(true);

        AxiosWithFormData
            .post(URL, formData)
            .then(response => {
                setProgressing(false);
                resetCartItems(response?.data?.result);
                navigation.navigate('OrderSuccessful');
            })
            .catch(error => {
                console.log('Error :: ', error?.response?.data)
                setProgressing(false);
            })
        setTimeout(() => {
            if (progressing) {
                setProgressing(false);
            }
        }, 10000);
    }

    const resetCartItems = (result) => {
        if (currentModule === 'Grocery') {
            dispatch(
                handleCartReducer({
                    type: 'GROCERY_ORDER_PLACED',
                    data: [],
                })
            );
        } else if (currentModule === 'Medicine') {
            //console.log(result);
            dispatch(
                handleCartReducer({
                    type: 'MEDICINE_ORDER_PLACED',
                    data: [],
                })
            );
        } else if (currentModule === 'Food') {
            dispatch(
                handleCartReducer({
                    type: 'FOOD_ORDER_PLACED',
                    data: [],
                })
            );
        }
    }

    const getOrderInfo = () => {
        let Axios;
        let URL;

        if (currentModule === 'Grocery') {
            Axios = AxiosGrocery;
            URL = GROCERY_ORDER_INFO;
        } else if (currentModule === 'Medicine') {
            Axios = AxiosMedicine;
            URL = MEDICINE_ORDER_INFO;
        } else if (currentModule === 'Food') {

        }
        //console.log('URL', URL);
        setProgressing(true);
        Axios
            .get(URL,
                {
                    params: {
                        customerId: userInfo?._id,
                        custom_customerId: userInfo?.custom_id,
                    }
                }
            ).then(response => {
                //console.log('response?.data?.result', response?.data?.result);
                setProgressing(false);
                saveOrderInfoToReducer(response?.data?.result);
            })
            .catch(error => {
                console.log('Error : ', error.response)
                setProgressing(false);
            })
        setTimeout(() => {
            if (progressing) {
                setProgressing(false);
            }
        }, 10000);
    }

    const saveOrderInfoToReducer = (response) => {
        if (currentModule === 'Grocery') {
            dispatch(
                handleUserReducer({
                    type: 'SAVE_GROCERY_ORDER_INFO',
                    data: response || [],
                })
            );
        } else if (currentModule === 'Medicine') {
            dispatch(
                handleUserReducer({
                    type: 'SAVE_MEDICINE_ORDER_INFO',
                    data: response || [],
                })
            );
        } else if (currentModule === 'Food') {
            dispatch(
                handleUserReducer({
                    type: 'SAVE_FOOD_ORDER_INFO',
                    data: response || [],
                })
            );
        }
    }

    useEffect(() => {
        if (error) {
            //userLogOut();
        }
    }, [error]);

    return {
        showActivityIndicator,
        loadingMore,
        itemNotfound,
        allLoaded,
        progressing,
        showErrorMessage,
        showSuccessMessage,
        message,
        setMessage,
        setProgressing,
        setShowErrorMessage,
        setShowSuccessMessage,
        setLoadingMore,
        placceOrder,
        getOrderInfo
    };
};