import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native';
import { GET_DISTRICT_AREA_INFO, GET_DISTRICT_INFO, GET_DISTRICT_SUB_AREA_INFO, GET_TUTORIAL_INFO, REQUEST_TO_ADD } from '../../helpers/Constants';
import { BASE_ADMIN_URL_LOCAL, BASE_ADMIN_URL } from "@env"
import axios from 'axios';
axios.defaults.withCredentials = true;

const Axios = axios.create({
    baseURL: BASE_ADMIN_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

const AxiosWithFormData = axios.create({
    baseURL: BASE_ADMIN_URL_LOCAL,
    headers: {
        'Accept': '*/*',
        'Content-Type': 'multipart/form-data',
    },
});

export const useRegistration = () => {
    const navigation = useNavigation();
    const [error, setError] = useState(false);
    const [progressing, setProgressing] = useState(false);

    const getDistrictInfo = (setFilteredInfo, setDistrictInfo) => {
        setProgressing(true);
        Axios
            .get(GET_DISTRICT_INFO)
            .then(res => {
                setFilteredInfo(res?.data?.result);
                setDistrictInfo(res?.data?.result);
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

    const getDistrictAreaInfo = (slectedDistrict, setInformation, setDistrictAreaInfo) => {

        setProgressing(true)
        Axios
            .get(`${GET_DISTRICT_AREA_INFO}/${slectedDistrict._id}`)
            .then(response => {
                if (response?.data?.result.length < 1) {
                    setInformation((prev) => ({
                        ...prev,
                        district_info: slectedDistrict._id,
                        districtName: slectedDistrict.district_name,
                        district_area_info: '303030303030303030303030',
                        districtAreaName: '',
                        district_subarea_info: '303030303030303030303030',
                        districtSubAreaName: '',
                    }));
                } else {
                    setDistrictAreaInfo(response?.data?.result);
                    setInformation((prev) => ({
                        ...prev,
                        district_info: slectedDistrict._id,
                        districtName: slectedDistrict.district_name,
                    }));
                }

                setProgressing(false);
            })
            .catch(error => {
                setProgressing(false);
                console.log('Error : ', error.response.status)
            })
    }

    const getDistrictSubAreaInfo = (slectedDistrictArea, setInformation, setSubAdminArea) => {
        setProgressing(true)
        Axios
            .get(`${GET_DISTRICT_SUB_AREA_INFO}/${slectedDistrictArea._id}`)
            .then(response => {
                if (response?.data?.result.length < 1) {
                    setInformation((prev) => ({
                        ...prev,
                        district_area_info: slectedDistrictArea._id,
                        districtAreaName: slectedDistrictArea.area_name,
                        district_subarea_info: '303030303030303030303030',
                        districtSubAreaName: '',
                    }));
                } else {
                    setSubAdminArea(response?.data?.result);
                    setInformation((prev) => ({
                        ...prev,
                        district_area_info: slectedDistrictArea._id,
                        districtAreaName: slectedDistrictArea.area_name,
                    }));
                }
                setProgressing(false);
            })
            .catch(error => {
                setProgressing(false);
            })
    }

    const requestToAdd = (formData) => {
        setProgressing(true);
        AxiosWithFormData
            .post(REQUEST_TO_ADD, formData)
            .then(response => {
                setProgressing(false);
                if (response.data.success) {
                    Alert.alert("সফল ভাবে আপনার রেজিষ্ট্রেশন সম্পন্ন হয়েছে!!", "অতি শিগগিরই আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবে। ধন্যবাদ!", [
                        {
                            text: "OK",
                            onPress: () => navigation.goBack(),
                            style: "OK"
                        },
                    ]);
                } else {
                    Alert.alert("Hold on!!", "Ref Number Not Found !!!", [
                        {
                            text: "OK",
                            onPress: () => null,
                            style: "OK"
                        },
                    ]);
                }
            })
            .catch(error => {
                //console.log('Error : ', error.response)
                Alert.alert("Something Went Wrong!!", "Please Try Again!", [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack(),
                        style: "OK"
                    },
                ]);
                setProgressing(false);
            })
    }

    const getTutorialInfo = (setTutorialInfo) => {
        setProgressing(true)
        Axios
            .get(`${GET_TUTORIAL_INFO}/${'Medicine'}`)
            .then(response => {
                setTutorialInfo(response?.data?.result)
                setProgressing(false);
            })
            .catch(error => {
                setProgressing(false);
            })
    }

    useEffect(() => {
        if (error) logout()
    }, [error])

    return {
        progressing,
        setProgressing,
        getDistrictInfo,
        getDistrictAreaInfo,
        getDistrictSubAreaInfo,
        requestToAdd,
        getTutorialInfo
    }
}