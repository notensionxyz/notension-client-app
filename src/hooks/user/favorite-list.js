import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_ADMIN_URL, USER_ADMIN_URL_LOCAL } from "@env"
import axios from 'axios';
import { handleUserChoiceReducer } from '../../store/reducers/userChoiceReducer';
import { Alert } from 'react-native';
import { handleDashboardReducer } from '../../store/reducers/dashboardReducer';
import { ADD_TO_FAVOURITE, PUSH_TO_FAVOURITE, REMOVE_FROM_FAVOURITE } from '../../helpers/Constants';
axios.defaults.withCredentials = true;

//console.log('USER_ADMIN_URL_Shop', USER_ADMIN_URL);

const Axios = axios.create({
    baseURL: USER_ADMIN_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

export const useFavouriteList = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [visible, setVisible] = useState(false);
    const loggedinUserInfo = useSelector((state) => state.user.userInfo);
    const {
        favouriteConsultationCentre,
        favouriteDoctors } = useSelector((state) => state.userChoice);

    const isAddedToFavouriteList = (_id, merchantType) => {
        let existingIndex;

        if (merchantType === 3) {
            existingIndex = favouriteConsultationCentre.findIndex((info) => info?.mongodbId === _id);
        } else if (merchantType === 4) {
            existingIndex = favouriteDoctors.findIndex((info) => info?.mongodbId === _id);
        }

        if (existingIndex > -1) {
            return true;
        } else {
            return false;
        }
    };

    const addToFavouriteList = (data, merchantType) => {
        let favouriteList = 0;
        let favouriteInfo = {};
        let isAllowed = true;
        if (data?._id !== '' && loggedinUserInfo?._id) {
            setVisible(true);

            if (merchantType === 3) {
                favouriteInfo = {
                    merchantType: merchantType,
                    customerInfo: loggedinUserInfo?._id,
                    custom_customer_id: loggedinUserInfo?.custom_id,
                    mongodbId: data?._id,
                    //custom_id: data?.custom_center_id,
                    center_name: data?.center_name,
                    address: data?.address,
                    medical_center_banner_app: data?.medical_center_banner_app
                };
                favouriteList = favouriteConsultationCentre.length;
                if (favouriteList > 24) {
                    isAllowed = false;
                    Alert.alert("Hold on!", "You can add up to twenty five (25) Center to your Favorites list !!", [
                        {
                            text: "OK",
                            onPress: () => null,
                            style: 'default'
                        }
                    ]);
                }
            } else if (merchantType === 4) {
                favouriteInfo = {
                    merchantType: merchantType,
                    customerInfo: loggedinUserInfo?._id,
                    custom_customer_id: loggedinUserInfo?.custom_id,
                    mongodbId: data?._id,
                    doctor_name: data?.doctor_name,
                    qualifications: data?.qualifications,
                    speciality: data?.speciality,
                    gender: data?.gender,
                    profile_pic: data?.profile_pic
                };
                favouriteList = favouriteDoctors.length;
                if (favouriteList > 24) {
                    isAllowed = false;
                    Alert.alert("Hold on!", "You can add up to twenty five (25) Doctors to your Favorites list !!", [
                        {
                            text: "OK",
                            onPress: () => null,
                            style: 'default'
                        }
                    ]);
                }
            }

            if (favouriteList < 1) {
                manageFavouriteStoreList(ADD_TO_FAVOURITE, favouriteInfo, 'add');
            } else {
                if (isAllowed) {
                    manageFavouriteStoreList(PUSH_TO_FAVOURITE, favouriteInfo, 'push');
                } else {
                    setVisible(false);
                }
            }
        }
    }

    const removeFromfavoriteList = (data, merchantType) => {
        setVisible(true);
        const favouriteInfo = {
            merchantType: merchantType,
            customerInfo: loggedinUserInfo?._id,
            custom_customer_id: loggedinUserInfo?.custom_id,
            mongodbId: data?.mongodbId,
        };
        manageFavouriteStoreList(REMOVE_FROM_FAVOURITE, favouriteInfo, 'remove');
    };

    const manageFavouriteStoreList = (route, favouriteInfo, action) => {

        Axios
            .post(route, favouriteInfo)
            .then((res) => {
                manageReducer(favouriteInfo, action, res?.data?.result)
            })
            .catch((error) => {
                setVisible(false);
                console.log('Error.........+', error);
            });
    };

    const manageReducer = (favouriteInfo, action, response) => {

        if (action === 'remove') {
            removeFromReducer({ merchantType: favouriteInfo?.merchantType, mongodbId: favouriteInfo?.mongodbId })
        } else {
            addToReducer({ merchantType: favouriteInfo?.merchantType, favouriteList: response });
        }
        setVisible(false);
    }

    const addToReducer = (Info) => {
        dispatch(
            handleUserChoiceReducer({
                type: 'ADD_TO_FAVOURITE_MERCHANT_LIST',
                data: Info,
            })
        );
        Alert.alert("Success !", "Added to your Favorites list !!", [
            {
                text: "OK",
                onPress: () => null,
                style: 'default'
            }
        ]);

    }

    const removeFromReducer = (Info) => {
        dispatch(
            handleUserChoiceReducer({
                type: 'REMOVE_FROM_FAVOURITE_MERCHANT_LIST',
                data: Info,
            })
        );
        Alert.alert("Success !", "Removed from your Favorites list !!", [
            {
                text: "OK",
                onPress: () => null,
                style: 'default'
            }
        ]);

    }



    const setCurrentModule = () => {
        dispatch(
            handleDashboardReducer({
                type: 'SET_CURRENT_MODULE',
                data: 'dashboard',
            })
        );
    };

    useEffect(() => {
        if (error) {
            //userLogOut();
        }
    }, [error]);

    return {
        visible,
        isAddedToFavouriteList,
        addToFavouriteList,
        removeFromfavoriteList,
        setCurrentModule
    };
};