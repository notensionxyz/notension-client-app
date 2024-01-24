import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../config/axios-admin/axiosWithoutCredential';
import { GET_DASHBOARD_INFO, GET_DISTRICT_INFO } from '../helpers/Constants';
import { handleDashboardReducer } from '../store/reducers/dashboardReducer';
import NetInfo from "@react-native-community/netinfo";
import { handleUserReducer } from '../store/reducers/userReducer';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const useGlobal = () => {
    const dispatch = useDispatch();
    const { userLatitude, districtId, defaultUserLocation } = useSelector((state) => state.user);
    const [error, setError] = useState(false);
    const [progressing, setProgressing] = useState(false);

    const AxiosTest = axios.create({
        baseURL: 'http://localhost:5059',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const getDasboardInfo = () => {
        resetDashboardReducer();

        setProgressing(true);

        if (userLatitude === undefined) {
            dispatch(
                handleUserReducer({
                    type: 'RESET_USER',
                    data: [],
                })
            );
        }

        axiosInstance
            .get(GET_DASHBOARD_INFO,
                {
                    params: {
                        district_id: districtId
                    }
                }
            ).then(response => {
                //console.log(response.data.result);
                dispatch(
                    handleDashboardReducer({
                        type: 'SAVE_DASHBOARD_INFO',
                        data: response.data.result,
                    })
                );
                setProgressing(false);
            }).catch(error => {
                setProgressing(false);
            });

        setTimeout(() => {
            if (progressing) {
                setProgressing(false);
            }
        }, 10000);
    }

    const getDistrictInfo = (setFilteredInfo) => {
        setProgressing(true);
        axiosInstance
            .get(GET_DISTRICT_INFO)
            .then(res => {
                
                setFilteredInfo(res?.data?.result);
                dispatch(
                    handleUserReducer({
                        type: 'SAVE_DISTRICT_INFO',
                        data: res?.data?.result,
                    })
                );
                setProgressing(false);
            })
            .catch(error => {
                setProgressing(false);
            });

        setTimeout(() => {
            if (progressing) {
                setProgressing(false);
            }
        }, 10000);
    }

    const saveLoadingStatus = (status) => {
        dispatch(
            handleDashboardReducer({
                type: 'SAVE_LOADING_STATUS',
                data: status,
            })
        );
    }

    const saveConnectionStatus = (status) => {
        dispatch(
            handleDashboardReducer({
                type: 'SAVE_CONNECTION_STATUS',
                data: status,
            })
        );
    }

    const resetDashboardReducer = () => {
        dispatch(
            handleDashboardReducer({
                type: 'RESET_DASHBOARD_REDUCER',
                data: true,
            })
        );

        dispatch(
            handleUserReducer({
                type: 'SAVE_USER_CURRENT_LOCATION',
                data: defaultUserLocation,
            })
        );
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userInfo');
            console.log('Logout');
        } catch (error) {
            // Error saving data
        }
    }

    useEffect(() => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected || !state.isInternetReachable) {
                saveConnectionStatus(false);
            }
        });
        if (error) logout();
    }, [error])

    return {
        progressing,
        setProgressing,
        getDasboardInfo,
        getDistrictInfo,
        saveConnectionStatus,
        logout,
    }
}
