import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HEALTH_CARE_URL, HEALTH_CARE_URL_LOCAL } from "@env"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { BOOK_APPOINTMENT, GET_PATIENTS, MANAGE_PATIENT, REGISTER_PATIENT } from '../../../helpers/Constants';
import { handleUserReducer } from '../../../store/reducers/userReducer';
axios.defaults.withCredentials = true;

export const useAppointment = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);
    const [itemNotfound, setItemNotfound] = useState(false);
    const [loadingMore, setLoadingMore] = useState(true);
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);
    const [isAppointmentBooked, setIsAppointmentBooked] = useState(false);

    const [progressing, setProgressing] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [message, setMessage] = useState('');
    const { userInfo, patientInfo } = useSelector((state) => state.user);

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

    const bookAppointment = (bookAppoinmentData) => {
        setProgressing(true);
        const {
            doctor_name,
            doctor_speciality,
            consultation_center_name,
            appointment_day,
            ...bookAppoinmentInfo
        } = bookAppoinmentData;

        bookAppoinmentInfo.createdBy = {
            user_id: userInfo?._id,
            user: userInfo?.contact_no.slice(-11),
            user_type: 'Customer',
        };

        //console.log(patientData);

        AxiosTest
            .post(BOOK_APPOINTMENT, bookAppoinmentInfo)
            .then(response => {

                if (response?.data?.success) {
                    setShowSuccessMessage(true);
                    saveAppoinmentInfo('add', { ...response?.data?.result, ...bookAppoinmentData });
                    // navigation.navigate('BookedAppointmentInfo');
                } else {
                    setShowErrorMessage(true);
                    //navigation.navigate('BookedAppointmentInfo');
                }
                setIsAppointmentBooked(response?.data?.isBooked)
                setMessage(response?.data?.message);

                //navigation.goBack();
                setProgressing(false);
            })
            .catch(error => {
                console.log('Error :: ', error?.response?.data)
                setProgressing(false);
                Alert.alert("কিছু একটা ভুল হয়েছে!", "পরে আবার চেষ্টা করুন!!!!", [
                    {
                        text: "OK",
                        onPress: () => null,
                        style: "OK"
                    },
                ]);
            })

        setTimeout(() => {
            if (progressing) {
                setProgressing(false);
            }
        }, 10000);
    }

    const saveAppoinmentInfo = (task, bookAppoinmentData) => {
        dispatch(
            handleUserReducer({
                type: 'UPDATE_BOOKED_APPOINTMENT_INFO',
                data: { action: task, appoinmentData: bookAppoinmentData },
            })
        );
    }

    useEffect(() => {
        if (error) {
            //userLogOut();
        }
    }, [error]);

    return {
        progressing,
        setProgressing,
        message,
        showErrorMessage,
        showSuccessMessage,
        setShowErrorMessage,
        setShowSuccessMessage,
        isAppointmentBooked,
        bookAppointment,
    };
};