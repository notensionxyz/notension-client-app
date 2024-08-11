import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HEALTH_CARE_URL, HEALTH_CARE_URL_LOCAL } from "@env"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import { Alert } from 'react-native';
import { EXPLORE_FIND_DOCTOR, FIND_DOCTOR_BY_CONSULTATION_CENTER, FIND_DOCTOR_BY_DEPT, FIND_NEAREST_DOCTOR, GET_DOCTOR_PROFILE } from '../../../helpers/Constants';
import { handleDoctorReducer } from '../../../store/reducers/health-care/doctorReducer';

axios.defaults.withCredentials = true;

export const useDoctor = () => {
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

    const exploreFindDoctor = () => {
        //console.log('exploreFindDoctor');
        // resetReducer();
        setProgressing(true);
        AxiosTest
            .get(EXPLORE_FIND_DOCTOR,
                {
                    params: {
                        district_id: districtId,
                    }
                }
            )
            .then((res) => {

                dispatch(
                    handleDoctorReducer({
                        type: 'SAVE_DEPT_INFO',
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

    const getNearestDoctorsInfo = (setDoctorsInfo) => {

        setProgressing(true);
        const props = {
            longitude: userLongitude,
            latitude: userLatitude,
            districtId: districtId
        };

        Axios
            .post(FIND_NEAREST_DOCTOR, props)
            .then(response => {
                //console.log(response.data);
                setDoctorsInfo(response.data.result);
                setProgressing(false);
                setAllLoaded(true);
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

    const getDoctorsInfoByDistrict = (deptId, setDoctorsInfo, pageNo, setPageNo) => {

        //setProgressing(true);
        const props = {
            page: pageNo,
            deptId: deptId,
            districtId: districtId
        };

        Axios
            .post(FIND_DOCTOR_BY_DEPT, props)
            .then(response => {
                if (response?.data?.result.length > 0) {
                    setPageNo(pageNo + 1);
                    setDoctorsInfo((prevInfo) => [...prevInfo, ...response?.data?.result]);
                }

                if (response?.data?.result.length < 20) {
                    setAllLoaded(true);
                }

                //console.log('response?.data?.result.length : ', response?.data?.result.length);
                if (pageNo === 1 && response?.data?.result.length < 1) {
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

    const getDoctorsInfoByCenter = (centerId, deptId, setDoctorsInfo, pageNo, setPageNo) => {

        //setProgressing(true);
        const props = {
            page: pageNo,
            deptId: deptId,
            centerId: centerId
        };

        AxiosTest
            .post(FIND_DOCTOR_BY_CONSULTATION_CENTER, props)
            .then(response => {
                if (response?.data?.result.length > 0) {
                    setPageNo(pageNo + 1);
                    setDoctorsInfo((prevInfo) => [...prevInfo, ...response?.data?.result]);
                }

                if (response?.data?.result.length < 20) {
                    setAllLoaded(true);
                }

                //console.log('response?.data?.result.length : ', response?.data?.result.length);
                if (pageNo === 1 && response?.data?.result.length < 1) {
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

    const getProfileOfDoctor = (doctorId, setProfileInfo) => {

        setProgressing(true);
        Axios
            .get(GET_DOCTOR_PROFILE,
                {
                    params: {
                        doctorId: doctorId,
                    }
                }
            )
            .then((res) => {
                //console.log(res?.data?.result.length);
                setProfileInfo(res?.data?.result);
                setProgressing(false);
            })
            .catch((error) => {
                setProgressing(false);
                console.log(error);
            });
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
        exploreFindDoctor,
        getNearestDoctorsInfo,
        getDoctorsInfoByDistrict,
        getDoctorsInfoByCenter,
        getProfileOfDoctor
        // resetReducer,
        // setCurrentModule
    };
};