import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HEALTH_CARE_URL, HEALTH_CARE_URL_LOCAL } from "@env"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import { Alert } from 'react-native';
import { CONSULTATION_CENTER_BY_DISTRICT, EXPLORE_CONSULTATION_CENTER, EXPLORE_FIND_DOCTOR, FIND_DOCTOR_BY_DEPT, NEAREST_CONSULTATION_CENTER } from '../../../helpers/Constants';
import { handleDoctorReducer } from '../../../store/reducers/health-care/doctorReducer';

axios.defaults.withCredentials = true;

export const useCenter = () => {
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

    const Axios = axios.create({
        baseURL: HEALTH_CARE_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const AxiosTest = axios.create({
        baseURL: HEALTH_CARE_URL_LOCAL,
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

    const getNearestCenterInfo = (centerType, setCenterInfo) => {

        setProgressing(true);
        const props = {
            longitude: userLongitude,
            latitude: userLatitude,
            districtId: districtId,
            centerType: centerType       ////'Hospital' 'Diagnostic Centre'
        };

        AxiosTest
            .post(NEAREST_CONSULTATION_CENTER, props)
            .then(response => {
                //console.log(response.data);
                setCenterInfo(response.data.result);
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

    const getCenterInfoByDistrict = (centerType, setCenterInfo, pageNo, setPageNo) => {

        //setProgressing(true);
        const props = {
            page: pageNo,
            centerType: centerType,
            districtId: districtId
        };

        AxiosTest
            .post(CONSULTATION_CENTER_BY_DISTRICT, props)
            .then(response => {
                if (response?.data?.result?.consultationCenterInfo.length > 0) {
                    setPageNo(pageNo + 1);
                    setCenterInfo((prevInfo) => [...prevInfo, ...response?.data?.result?.consultationCenterInfo]);
                }

                if (response?.data?.result?.consultationCenterInfo.length < 20) {
                    setAllLoaded(true);
                }

                //console.log('response?.data?.result?.consultationCenterInfo.length : ', response?.data?.result?.consultationCenterInfo.length);
                if (pageNo === 1 && response?.data?.result?.consultationCenterInfo.length < 1) {
                    setItemNotfound(true);
                }

                setLoadingMore(false);
            })
            .catch(error => {
                console.log('Error : ', error.response.data)
                setProgressing(false);
                setAllLoaded(true);
            })
        setTimeout(() => {
            if (progressing) {
                setProgressing(false);
                setAllLoaded(true);
            }
        }, 10000);
    }

    const exploreConsultationCenter = (centerID, setExploreInfo) => {
        //console.log('exploreFindDoctor');
        // resetReducer();
        setProgressing(true);
        AxiosTest
            .get(EXPLORE_CONSULTATION_CENTER,
                {
                    params: {
                        CenterID: centerID,
                    }
                }
            )
            .then((res) => {
                setExploreInfo(res?.data?.result);
                // dispatch(
                //     handleDoctorReducer({
                //         type: 'SAVE_DEPT_INFO',
                //         data: res?.data?.result,
                //     })
                // );
                setProgressing(false);
            })
            .catch((error) => {
                setProgressing(false);
                console.log(error);
            });
        setTimeout(() => {
            if (progressing) {
                setProgressing(false);
            }
        }, 10000);
    };


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
        setProgressing,
        setShowErrorMessage,
        setShowSuccessMessage,
        setLoadingMore,
        // saveItemsToReducer,
        // getNearestGroceryStoreInfo,
        // handleSearchStore,
        exploreConsultationCenter,
        getNearestCenterInfo,
        getCenterInfoByDistrict
        // resetLoadingStatus,
        // resetReducer,
        // setCurrentModule
    };
};