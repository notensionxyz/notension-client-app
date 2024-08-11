import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HEALTH_CARE_URL, HEALTH_CARE_URL_LOCAL } from "@env"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { GET_PATIENTS, MANAGE_PATIENT, REGISTER_PATIENT } from '../../../helpers/Constants';
import { handleUserReducer } from '../../../store/reducers/userReducer';
axios.defaults.withCredentials = true;

export const usePatient = () => {
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

    const registerPatient = (patientData) => {
        setProgressing(true);
        patientData.createdBy = {
            user_id: userInfo?._id,
            user: userInfo?.contact_no.slice(-11),
            user_type: 'Customer',
        };

        //console.log(patientData);

        AxiosTest
            .post(REGISTER_PATIENT, patientData)
            .then(response => {
                //console.log([...patientInfo, response?.data?.result]);
                savePatientInfo('add', response?.data?.result);
                navigation.goBack();
                setProgressing(false);
            })
            .catch(error => {
                console.log('Error :: ', error?.response?.data)
                setProgressing(false);
            })

        setTimeout(() => {
            if (progressing) {
                setProgressing(false);
            }
        }, 10000);
    }

    const updatePatientProfile = (patientData) => {
        let updInfo = patientData;
        setProgressing(true);
        patientData.updatedBy = {
            user_id: userInfo?._id,
            user: userInfo?.contact_no.slice(-11),
            user_type: 'Customer',
        };

        //console.log(patientData);

        AxiosTest
            .put(MANAGE_PATIENT, patientData)
            .then(response => {
                console.log(response?.data?.message);
              
                if (response?.data?.message === 'delete') {
                    //console.log('response?.data?.result', response?.data?.result);
                    savePatientInfo('delete', updInfo); // First delete existing data
                    setTimeout(() => {
                        savePatientInfo('add', response?.data?.result); // Then Save New One
                    }, 500);
                }
                else if (response?.data?.message === 'update') {
                    savePatientInfo('update', updInfo);
                }
                navigation.goBack();
                setProgressing(false);
            })
            .catch(error => {
                console.log('Error :: ', error?.response?.data)
                setProgressing(false);
            })

        setTimeout(() => {
            if (progressing) {
                setProgressing(false);
            }
        }, 10000);
    }

    const getPatientInfo = () => {
        savePatientInfo('save_all', []);
        setProgressing(true);
        AxiosTest
            .get(GET_PATIENTS,
                {
                    params: {
                        userId: userInfo?._id,
                        contact: userInfo?.contact_no.slice(-11),
                    }
                }
            )
            .then((res) => {
                //console.log(res?.data?.result.length);
                if (res?.data?.result.length > 0) {
                    savePatientInfo('save_all', res?.data?.result);
                }
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

    const savePatientInfo = (task, patientInfo) => {

        if (task === 'save_all') {
            // console.log('console.log(task);', task);
            dispatch(
                handleUserReducer({
                    type: 'SAVE_PATIENT_INFO',
                    data: patientInfo,
                })
            );
        } else {
            //console.log('console.log;', task);
            dispatch(
                handleUserReducer({
                    type: 'UPDATE_PATIENT_INFO',
                    data: { action: task, patientData: patientInfo },
                })
            );
        }
    }

    useEffect(() => {
        if (error) {
            //userLogOut();
        }
    }, [error]);

    return {
        progressing,
        setProgressing,
        registerPatient,
        updatePatientProfile,
        getPatientInfo
    };
};