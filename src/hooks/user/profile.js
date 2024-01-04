import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance, axiosInstanceFormData } from '../config/axios-admin/axiosWithoutCredential';
import { handleUserReducer } from '../../store/reducers/userReducer';


export const useUserProfile = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);

    let userInformation = {
        setManually: false,
        userLatitude: '00',
        userLongitude: '00',
        districtId: '00',
        districtName: '',
        districtAreaId: '00',
        districtAreaName: '',
        districtSubAreaId: '00',
        districtSubAreaName: '',
        isLoggedin: false,
        phoneNo: '',
        custName: '',
        custAdress: '',
        alternativeMobileNo: '',
        deliveryAddress: '',
        allAddress: [],
        fireBaseToken: '',
        apiKey: '',
        userPin: '',
        default_outlet_id: '00',
        default_outlet_name: '',
        default_outlet_address: '',
    };

    /// User Geolaction
    const saveUserCurrentGeolocation = (curLoc) => {
        userInformation.userLatitude = curLoc.latitude;
        userInformation.userLongitude = curLoc.longitude;
        //storeUserInfo();
        saveUserInfo();
    }

    const storeUserInfo = async () => {
        try {
            await AsyncStorage.setItem(
                'userInfo', JSON.stringify(userInformation)
            );
            saveUserInfo();
        }
        catch (error) {
        }
    }

    const saveUserInfo = () => {
      
        dispatch(
            handleUserReducer({
                type: 'SAVE_USER_INFO',
                data: userInformation,
            })
        );
        //console.log(userInformation);
        console.log('User Profile Saved')
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userInfo');
            // await AsyncStorage.removeItem('districtInfo');
            // await AsyncStorage.removeItem('dashboardInfo');
            // saveUserInfo(userInformation);
            // saveDistrictInfo(districtSelected);
            // saveDashboardInfo(dashboardData);
            console.log('Logout');
        } catch (error) {

        }
    }

    useEffect(() => {
        if (error) logout()
    }, [error])

    return {
        saveUserCurrentGeolocation,
        logout,
    }
}