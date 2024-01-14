import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../config/axios-admin/axiosWithoutCredential';
import { axiosInstanceGrocery } from '../config/axios-grocery/axiosWithoutCredential'
import { GET_DASHBOARD_INFO, GET_DISTRICT_INFO, NEAREST_GROCERY_STORE, POST_NEAREST_MEDICINE_STORE } from '../helpers/Constants';
import { handleDashboardReducer } from '../store/reducers/dashboardReducer';
import NetInfo from "@react-native-community/netinfo";
import { axiosInstanceMedicine } from '../config/axios-medicine/axiosWithoutCredential';
import { handleUserReducer } from '../store/reducers/userReducer';

export const useGlobal = () => {
    const dispatch = useDispatch();
    const { isFetchingFromStorage, isLoading, districtAreaInfo, districtSubAreaInfo } = useSelector(
        (state) => state.dashboard
    );
    const { userLatitude, userLongitude, districtInfo } = useSelector((state) => state.user);
    const user = useSelector((state) => state.user);
    const [error, setError] = useState(false);
    const [progressing, setProgressing] = useState(false);

    const getDasboardInfo = async () => {
        saveLoadingStatus(true);
        if (userLatitude === undefined) {
            dispatch(
                handleUserReducer({
                    type: 'RESET_USER',
                    data: [],
                })
            );
        }
        resetDasgboardReducer();
        if (districtInfo?.length < 1) {
            getDistrictInfo();
        }
        axiosInstance
            .get(GET_DASHBOARD_INFO)
            .then(response => {
                //console.log(response.data.result);
                dispatch(
                    handleDashboardReducer({
                        type: 'SAVE_DASHBOARD_INFO',
                        data: response.data.result,
                    })
                );
                saveLoadingStatus(false);
            })
            .catch(error => {

                saveLoadingStatus(false);
            })
        setTimeout(() => {
            if (isLoading) {
                saveLoadingStatus(false);
            }
        }, 10000);
    }

    const getDistrictInfo = async () => {
        setProgressing(true);
        axiosInstance
            .get(GET_DISTRICT_INFO)
            .then(res => {
                setProgressing(false);
                dispatch(
                    handleUserReducer({
                        type: 'SAVE_DISTRICT_INFO',
                        data: res?.data?.result,
                    })
                );
            })
            .catch(error => {
                setProgressing(false);
            })
    }

    const getMedicineStoreInfo = (setFetching, setNearestInfo, distance = 1000) => {
        const props = {
            shop_longitude: userLongitude,
            shop_latitude: userLatitude,
            max_distance: distance
        };
        //console.log(props);
        //saveLoadingStatus(true);
        axiosInstanceMedicine
            .post(POST_NEAREST_MEDICINE_STORE, props)
            .then(response => {
                //console.log(response.data);
                setNearestInfo(response.data.result);
                setFetching(false);
            })
            .catch(error => {
                console.log('Error : ', error.response)
                setFetching(false);
            })
        setTimeout(() => {
            if (isLoading) {
                setFetching(false);
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

    const resetDasgboardReducer = () => {
        dispatch(
            handleDashboardReducer({
                type: 'RESET_DASHBOARD_REDUCER',
                data: true,
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
        progressing,
        getDasboardInfo,
        getDistrictInfo,
        getMedicineStoreInfo,
        saveConnectionStatus,
        logout,
    }
}
