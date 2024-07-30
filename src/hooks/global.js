import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../config/axios-admin/axiosWithoutCredential';
import { GET_DASHBOARD_INFO, GET_DISTRICT_INFO } from '../helpers/Constants';
import { handleDashboardReducer } from '../store/reducers/dashboardReducer';
import NetInfo from "@react-native-community/netinfo";
import { handleUserReducer } from '../store/reducers/userReducer';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import { openUrl } from '../helpers/imageUrl';
import { Alert, BackHandler } from 'react-native';
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

        //console.log('districtId', districtId, 'userLatitude', userLatitude);
        setTimeout(() => {
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

                    if (response?.data?.result?.allAppDashboard[0]) {
                        compareVersion(response?.data?.result?.allAppDashboard[0]);
                    }

                }).catch(error => {
                    console.log('Error getDasboardInfo : ', error?.response?.data)
                    setProgressing(false);
                });
        }, 600);

        setTimeout(() => {
            if (progressing) {
                setProgressing(false);
            }
        }, 10000);
    }

    const getDistrictInfo = () => {
        setProgressing(true);
        axiosInstance
            .get(GET_DISTRICT_INFO)
            .then(res => {
                dispatch(
                    handleUserReducer({
                        type: 'SAVE_DISTRICT_INFO',
                        data: res?.data?.result,
                    })
                );
                setProgressing(false);
            })
            .catch(error => {
                console.log('Error : Failed to district Info, ', error);
                setProgressing(false);
            });

        setTimeout(() => {
            if (progressing) {
                setProgressing(false);
            }
        }, 10000);
    }

    const compareVersion = (appDashboarddata) => {
        let currentAppVersion = appDashboarddata?.android_version;
        let playStoreUrl = appDashboarddata?.android_url;
        let installedAppVersion = DeviceInfo.getVersion();

        // console.log('currentAppVersion : ', typeof (currentAppVersion));
        // console.log('playStoreUrl : ', playStoreUrl);
        // console.log('appVersion : ', typeof (appVersion));

        if (playStoreUrl && currentAppVersion) {
            if (appDashboarddata?.is_android_user_force_to_update) {
                if (installedAppVersion !== currentAppVersion) {
                    Alert.alert("Update version available!!!", "Please update the app.", [
                        { text: "Update Now", onPress: () => { BackHandler.exitApp(); openUrl(playStoreUrl); } }
                    ]);
                }
            } else if (appDashboarddata?.is_android_user_optional_update) {
                if (installedAppVersion !== currentAppVersion) {
                    Alert.alert("Update version available!!!", "Please update the app.", [
                        {
                            text: "Update later",
                            onPress: () => null,
                            style: "cancel"
                        },
                        { text: "Update Now", onPress: () => { BackHandler.exitApp(); openUrl(playStoreUrl); } }
                    ]);
                }
            }
        }
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
