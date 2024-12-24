import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ALL_CARE_SERVICE_URL_LOCAL, ALL_CARE_SERVICE_URL } from "@env"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { EXPLORE_ALL_CARE_SERVICE, EXPLORE_CARE_PROVIDER } from '../../../helpers/Constants';
import { handleAllCareReducer } from '../../../store/reducers/all-care-service/allCareReducer';
import { handleDashboardReducer } from '../../../store/reducers/dashboardReducer';

axios.defaults.withCredentials = true;

export const useAllCareService = () => {
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
    const [banner, setBanner] = useState([]);
    const { userLatitude, userLongitude, districtId } = useSelector((state) => state.user);

    const Axios = axios.create({
        baseURL: ALL_CARE_SERVICE_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const AxiosTest = axios.create({
        baseURL: ALL_CARE_SERVICE_URL_LOCAL,
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

    const exploreAllCareService = () => {
        setCurrentModule();
        setProgressing(true);
        Axios
            .get(EXPLORE_ALL_CARE_SERVICE,
                {
                    params: {
                        district_id: districtId,
                    }
                }
            )
            .then((res) => {

                dispatch(
                    handleAllCareReducer({
                        type: 'SAVE_ALL_SERVICES_INFO',
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

    const exploreCareProvider = (serviceId, setPopularInfo, setNearestInfo, pageNo) => {

        setProgressing(true);
        const props = {
            longitude: userLongitude,
            latitude: userLatitude,
            district_id: districtId,
            service_id: serviceId,
            page: pageNo,
        };

        Axios
            .post(EXPLORE_CARE_PROVIDER, props)
            .then(response => {
                //console.log(response.data);
                if (response?.data?.result?.nearestCareProvider) {
                    setPopularInfo(response?.data?.result?.careProviderByDistrict);
                }

                if (response?.data?.result?.nearestCareProvider) {
                    setNearestInfo(response?.data?.result?.nearestCareProvider);
                }
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
        banner,
        setProgressing,
        setShowErrorMessage,
        setShowSuccessMessage,
        setLoadingMore,
        exploreAllCareService,
        exploreCareProvider
    };
};