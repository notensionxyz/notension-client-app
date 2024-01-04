import axios from 'axios';
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../config/axios-admin/axiosWithoutCredential';
import { GET_DASHBOARD_INFO } from '../helpers/Constants';
import { handleUserReducer } from '../store/reducers/userReducer';
import { handleDashboardReducer } from '../store/reducers/dashboardReducer';
import NetInfo from "@react-native-community/netinfo";

export const useDashboard = () => {
    const dispatch = useDispatch();
    const { isFetchingFromStorage, internetConnectionAvailable, isLoading, isLoggedin, isDistrictSelected } = useSelector(
        (state) => state.dashboard
    );
    const [error, setError] = useState(false);

    let districtSelected = {
        isDistrictSelected: false,
        districtId: '',
        districtName: '',
        districtInfo: [],
    };

    const saveConnectionStatus = (status) => {
        dispatch(
            handleDashboardReducer({
                type: 'SAVE_CONNECTION_STATUS',
                data: status,
            })
        );
    }

    const saveLoadingStatus = (status) => {
        dispatch(
            handleDashboardReducer({
                type: 'SAVE_LOADING_STATUS',
                data: status,
            })
        );
    }

    const getDasboardInfo = async () => {
     
        saveLoadingStatus(true);
        axiosInstance
            .get(GET_DASHBOARD_INFO)
            .then(response => {
        
                dispatch(
                    handleDashboardReducer({
                        type: 'SAVE_DASHBOARD_INFO',
                        data: response.data.result,
                    })
                );
                saveLoadingStatus(false);
            })
            .catch(error => {
                console.log('getDasboardInfo Failed',error);
                saveLoadingStatus(false);
            })

        setTimeout(() => {
            if (isLoading) {
                saveLoadingStatus(false);
            }
        }, 10000);
    }

    const getDistrictInfo = async (setFetching) => {
        setFetching(true)
        axios
            .get('https://admin-api.notension.xyz/api/v1/public/all-district',
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                },
            )
            .then(response => {
                //console.log(response.data.result);
                districtSelected = {
                    isDistrictSelected: false,
                    districtId: '',
                    districtName: '',
                    districtInfo: response?.data?.result,
                };
                setFetching(false);
                storeDistrictInfo(districtSelected);
            })
            .catch(error => {
                setFetching(false);
            })
    }

    const storeDistrictInfo = async (districtSelected) => {
        try {
            await AsyncStorage.setItem(
                'districtInfo', JSON.stringify(districtSelected)
            );
            saveDistrictInfo(districtSelected);
            console.log('saved District')
        }
        catch (error) {
        }
    }

    const getDistrictAreaInfo = async (setFetching) => {

        setFetching(true)
        axios
            .get('https://admin-api.notension.xyz/api/v1/public/all-district',
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                },
            )
            .then(response => {
                //console.log(response.data.result);
                districtSelected = {
                    isDistrictSelected: false,
                    districtId: '',
                    districtName: '',
                    districtInfo: response?.data?.result,
                };
                setFetching(false);
                storeDistrictInfo(districtSelected);
            })
            .catch(error => {
                setFetching(false);
            })
    }


    const getDistrictSubAreaInfo = async (setFetching) => {

        setFetching(true)
        axios
            .get('https://admin-api.notension.xyz/api/v1/public/all-district',
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                },
            )
            .then(response => {
                //console.log(response.data.result);
                districtSelected = {
                    isDistrictSelected: false,
                    districtId: '',
                    districtName: '',
                    districtInfo: response?.data?.result,
                };
                setFetching(false);
                storeDistrictInfo(districtSelected);
            })
            .catch(error => {
                setFetching(false);
            })
    }

    const getStorageInfo = async () => {
        try {
            let district_info = await AsyncStorage.getItem('districtInfo');
            let districtInfo = JSON.parse(district_info);
            if (districtInfo !== null) {
                saveDistrictInfo(districtInfo);
            } else {
                saveDistrictInfo(districtSelected);
            }

            // await AsyncStorage.removeItem('districtInfo');
            setTimeout(() => {
                dispatch(
                    handleUserReducer({
                        type: 'SET_FETCHING_FROM_STORAGE_STATUS',
                        data: false,
                    })
                );
            }, 1000);
        }
        catch (error) {
        }
    }

    const saveUserInfo = (userInformation) => {
        dispatch(
            handleUserReducer({
                type: 'SAVE_USER_INFO',
                data: userInformation,
            })
        );
    }

    const saveDistrictInfo = (districtInfo) => {
        dispatch(
            handleUserReducer({
                type: 'SAVE_SELECTED_DISTRICT_INFO',
                data: districtInfo,
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
        if (error) logout()
    }, [error])

    return {
        saveConnectionStatus,
        saveLoadingStatus,
        getDasboardInfo,
        getDistrictInfo,
        storeDistrictInfo,
        getDistrictAreaInfo,
        getDistrictSubAreaInfo,
        getStorageInfo,
        logout,
    }
}
