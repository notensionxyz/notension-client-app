import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../config/axios-admin/axiosWithoutCredential';
import {
    GET_DISTRICT_AREA_INFO,
    GET_DISTRICT_INFO,
    GET_DISTRICT_SUB_AREA_INFO,
    OTP_FOR_REGISTARTION,
    USER_REGISTARTION,
} from '../helpers/Constants';

import { useNavigation } from '@react-navigation/native';
import { handleUserReducer } from '../store/reducers/userReducer';
import { handleDashboardReducer } from '../store/reducers/dashboardReducer';
import { USER_ADMIN_URL } from "@env"
import axios from 'axios';
import { Alert } from 'react-native';
axios.defaults.withCredentials = true;

console.log('USER_ADMIN_URL', USER_ADMIN_URL);

const Axios = axios.create({
    baseURL: USER_ADMIN_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

export const useUser = () => {
    const navigation = useNavigation();
    const loggedinUserInfo = useSelector((state) => state.user.userInfo);
    const { userLatitude, userLongitude, districtId } = useSelector((state) => state.user);
    const currentModule = useSelector((state) => state.dashboard.currentModule);
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [progressing, setProgressing] = React.useState(false);
    const [userInfo, setUserInfo] = useState({
        _id: loggedinUserInfo?._id || '',
        custom_id: loggedinUserInfo?.custom_id || '',
        customer_name: loggedinUserInfo?.customer_name || '',
        customer_address: loggedinUserInfo?.customer_address || '',
        email: loggedinUserInfo?.email || '',
        contact_no: loggedinUserInfo?.contact_no || '',
        alternative_contact_no: loggedinUserInfo?.alternative_contact_no || '',
        longitude: userLatitude,
        latitude: userLongitude,
        district_name_by_location: '',
        district_id: districtId,
        district_area_id: '303030303030303030303030',
        district_subarea_id: '303030303030303030303030',
    });

    let userInformation = {
        isUserLocationAvailable: false,
        userLatitude: '',
        userLongitude: '',
        isLoggedin: false,
        phoneNo: '',
        custName: '',
        custAdress: '',
        alternativeMobileNo: '',
        deliveryAddress: '',
    };

    let userLocation = {
        isSetManually: false,
        userLatitude: '00',
        userLongitude: '00',
        districtId: '00',
        districtName: '',
        districtAreaId: '00',
        districtAreaName: '',
        districtSubAreaId: '00',
        districtSubAreaName: '',
    };

    let areaSelected = {
        districtAreaId: '',
        districtAreaName: '',
        districtSubAreaInfo: [],
        districtSubAreaId: '',
        districtSubAreaName: '',
    };

    let dashboardData = {
        starting_slider: [],
        business_type_banner: [],
        medical_services_banner: [],
    }

    /// User Geolaction
    const saveUserCurrentGeolocation = (curLoc) => {
        userInformation.isUserLocationAvailable = true;
        userInformation.userLatitude = curLoc.latitude;
        userInformation.userLongitude = curLoc.longitude;
    }

    const saveConnectionStatus = (status) => {
        dispatch(
            handleUserReducer({
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

    const changeDistrictInfo = (districtInfo) => {
        dispatch(
            handleUserReducer({
                type: 'SAVE_SELECTED_DISTRICT_INFO',
                data: districtInfo,
            })
        );
    }

    const getDistrictAreaInfo = async (setFetching, districtSelected) => {
        setFetching(true)
        axiosInstance
            .get(`${GET_DISTRICT_AREA_INFO}/${districtSelected.districtId}`)
            .then(response => {
                const AREA_INFO = response?.data?.result;
                districtSelected.districtAreaInfo = AREA_INFO;
                if (AREA_INFO.length < 1) {
                    areaSelected.districtAreaId = areaSelected.districtSubAreaId = 'Not Found'
                    saveSlectedAreaInfo(areaSelected);
                }
                storeDistrictInfo(districtSelected);
                setFetching(false);
            })
            .catch(error => {
                setFetching(false);
                console.log('Error : ', error.response.status)
            })
    }

    const saveSelectedInfo = (userLocation) => {
        dispatch(
            handleUserReducer({
                type: 'SAVE_USER_DEFAULT_LOCATION',
                data: userLocation,
            })
        );
        saveCurrentInfo(userLocation);
    }

    const saveCurrentInfo = (userLocation) => {
        dispatch(
            handleUserReducer({
                type: 'SAVE_USER_CURRENT_LOCATION',
                data: userLocation,
            })
        );
    }

    const filterDistrictInfo = (text) => {
        dispatch(
            handleUserReducer({
                type: 'SEACH_DISTRICT_INFO',
                data: text,
            })
        );
    }

    const getDistrictSubAreaInfo = async (seletedArea, setIsLoading) => {
        setIsLoading(true)
        axiosInstance
            .get(`${GET_DISTRICT_SUB_AREA_INFO}/${seletedArea._id}`)
            .then(response => {
                const SUB_AREA_INFO = response?.data?.result;
                //console.log(SUB_AREA_INFO.length);
                areaSelected.districtAreaId = seletedArea._id;
                areaSelected.districtAreaName = seletedArea.area_name;
                areaSelected.districtSubAreaInfo = SUB_AREA_INFO;
                if (SUB_AREA_INFO.length < 1) {
                    areaSelected.districtSubAreaId = 'Not Found'
                }
                saveSlectedAreaInfo(areaSelected);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
            })
    }

    const saveSlectedAreaInfo = (areaSelected) => {
        dispatch(
            handleUserReducer({
                type: 'SAVE_SELECTED_AREA_INFO',
                data: areaSelected,
            })
        );
    }

    const resetUserLocation = () => {
        
        dispatch(
            handleUserReducer({
                type: 'RESET_USER_LOCATION',
                data: {},
            })
        );
        navigation.navigate('Dashboard');
    }



    const getOtp = (props) => {
        console.log('props : ', props);
        handleDataChange(props.contact_no, 'contact_no');
        setProgressing(true);

        Axios
            .post(OTP_FOR_REGISTARTION, props)
            .then((res) => {
                //console.log('res?.result?.data', res?.data);
                if (res?.data?.user_exist) {
                    setUserData(res?.data?.result);
                }
                setProgressing(false);
            })
            .catch((error) => {
                setProgressing(false);
                console.log('error.errors', error);
                console.log('result =', error?.response?.data?.errors);

                console.log('result =', error?.response);
                Alert.alert("Hold on!", "Something went wrong. Please Try Again!", [
                    {
                        text: "OK",
                        onPress: () => null,
                        style: "OK"
                    },
                ]);
                navigation.navigate('Login');
            });
        setTimeout(() => {
            isConnectionLost();
        }, 20000);
    }

    const handleDataChange = (value, name) => {
        setUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const setUserData = (user) => {
        setUserInfo((prev) => ({
            ...prev,
            _id: user?._id || '',
            custom_id: user?.custom_id || '',
            customer_name: user?.customer_name || '',
            customer_address: user?.customer_address || '',
            email: user?.email || '',
            contact_no: user?.contact_no || '',
            alternative_contact_no: user?.alternative_contact_no || '',
        }));
    }

    const registerUser = () => {
        setProgressing(true);
        Axios
            .post(USER_REGISTARTION, userInfo)
            .then((res) => {
                saveLoggedInUserInfo(res?.data?.result);
                goBackTo();
                setProgressing(false);
            })
            .catch((error) => {
                setProgressing(false);
                navigation.navigate('Login');
                console.log('result =', error?.response?.data?.errors);
                // const errorMsg = formatServerError(error?.response?.data?.errors);
            });
        setTimeout(() => {
            isConnectionLost();
        }, 20000);
    };

    const saveLoggedInUserInfo = (user) => {
        dispatch(
            handleUserReducer({
                type: 'SAVE_LOGGEDIN_INFO',
                data: user,
            })
        );
    }

    const isConnectionLost = () => {
        if (progressing) {
            setProgressing(false);
            Alert.alert("Hold on!", "Internet Connection Lost, Please Try again.", [
                {
                    text: "OK",
                    onPress: () => null,
                    style: "OK"
                },
            ]);
            navigation.navigate('Login');
        }
    }

    const goBackTo = () => {
        if (currentModule === 'Grocery') {
            navigation.navigate('ExploreGroceryShop');
        } else if (currentModule === 'Food') {
            navigation.navigate('ExploreFoodModule');
        } else if (currentModule === 'Medicine') {
            navigation.navigate('ExploreMedicineShop');
        } else {
            navigation.navigate('Dashboard');
        }
    }

    const logout = async () => {
        try {
            console.log('Logout');
        } catch (error) {

        }
    }

    useEffect(() => {
        if (error) logout()
    }, [error])

    return {
        progressing,
        setProgressing,
        saveUserCurrentGeolocation,
        saveConnectionStatus,
        saveLoadingStatus,
        filterDistrictInfo,
        getDistrictAreaInfo,
        getDistrictSubAreaInfo,
        saveSlectedAreaInfo,
        saveCurrentInfo,
        saveSelectedInfo,
        changeDistrictInfo,
        logout,
        handleDataChange,
        getOtp,
        userInfo,
        registerUser,
        resetUserLocation
    }
}
