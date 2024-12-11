import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HEALTH_CARE_URL, HEALTH_CARE_URL_LOCAL } from "@env"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { CONSULTATION_CENTER_BY_DISTRICT, EXPLORE_CONSULTATION_CENTER, EXPLORE_FIND_DOCTOR, FIND_DOCTOR_BY_DEPT, NEAREST_CONSULTATION_CENTER, SEARCH_CONSULTATION_CENTER } from '../../../helpers/Constants';
import { handleDoctorReducer } from '../../../store/reducers/health-care/doctorReducer';

axios.defaults.withCredentials = true;

export const useCenter = () => {
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
    const [banner, setBanner] = useState([]);
    const { consultationCenterBanner } = useSelector((state) => state.doctorInfo);
    const { userLatitude, userLongitude, districtId } = useSelector((state) => state.user);

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

    const getNearestCenterInfo = (centerType, setCenterInfo) => {

        setProgressing(true);
        const props = {
            longitude: userLongitude,
            latitude: userLatitude,
            districtId: districtId,
            centerType: centerType       ////'Hospital' 'Diagnostic Centre'
        };

        Axios
            .post(NEAREST_CONSULTATION_CENTER, props)
            .then(response => {
                //console.log(response.data);
                setCenterInfo(response.data.result);
                setProgressing(false);
            })
            .catch(error => {
                console.log('Error : ', error.response.data)
                setProgressing(false);
            })
        setTimeout(() => {
            if (progressing) {
                setProgressing(false);
            }
        }, 10000);
    }

    const getCenterInfoByDistrict = (centerType, setCenterInfo, pageNo, setPageNo) => {
        if (pageNo === 1) {
            setProgressing(true);
        }
        //setProgressing(true);
        const props = {
            page: pageNo,
            centerType: centerType,
            districtId: districtId
        };

        Axios
            .post(CONSULTATION_CENTER_BY_DISTRICT, props)
            .then(response => {
                //console.log(response?.data?.result?.consultationCenterInfo);
                if (response?.data?.result?.consultationCenterInfo.length > 0) {
                    setPageNo(pageNo + 1);
                    setCenterInfo((prevInfo) => [...prevInfo, ...response?.data?.result?.consultationCenterInfo]);
                }

                if (response?.data?.result?.consultationCenterInfo.length < 20) {
                    setAllLoaded(true);
                }

                if (pageNo === 1 && response?.data?.result?.consultationCenterInfo.length < 1) {
                    setItemNotfound(true);
                }

                if (pageNo === 1) {
                    //console.log(response?.data?.result?.banners.length);
                    if (response?.data?.result?.banners.length > 0) {
                        if (centerType === "Hospital") {
                            setBanner(response?.data?.result?.banners[0]?.hospital_banner);
                        } else if (centerType === "Diagnostic Centre") {
                            setBanner(response?.data?.result?.banners[0]?.diagnostic_center_banner);
                        } else if (centerType === "Eye Care Centre") {
                            setBanner(response?.data?.result?.banners[0]?.eye_care_center_banner);
                        } else if (centerType === "Deltal Care Centre") {
                            setBanner(response?.data?.result?.banners[0]?.deltal_care_center_banner);
                        }
                    } else {
                        setBanner(consultationCenterBanner)
                    }
                }
                setProgressing(false);
                setLoadingMore(false);
            })
            .catch(error => {
                console.log('Error : ', error.response.data)
                setProgressing(false);
                setAllLoaded(true);
            })
        setTimeout(() => {
            if (progressing) {
                setProgressing(false);
                setAllLoaded(true);
            }
        }, 10000);
    }

    const searchConsultationCenter = (centerType, searchText, setCenterInfo) => {
        if (searchText.length > 1) {
            setProgressing(true);
            const props = {
                centerType: centerType,
                search: searchText,
            };
            Axios
                .post(SEARCH_CONSULTATION_CENTER, props)
                .then((res) => {
                    setCenterInfo(res.data.result);
                    setProgressing(false);
                })
                .catch((error) => {
                    setProgressing(false);

                });

            setTimeout(() => {
                if (progressing) {
                    setProgressing(false);
                }
            }, 10000);
        }
    }

    const exploreConsultationCenter = (centerInfo, setExploreInfo) => {
        dispatch(
            handleDoctorReducer({
                type: 'SAVE_CENTER_INFO',
                data: centerInfo,
            })
        );

        setProgressing(true);
        Axios
            .get(EXPLORE_CONSULTATION_CENTER,
                {
                    params: {
                        CenterID: centerInfo?._id,
                        centerType: centerInfo?.center_type
                    }
                }
            )
            .then((res) => {
                setExploreInfo(res?.data?.result);
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


    useEffect(() => {
        if (error) {
            //userLogOut();
        }
    }, [error]);

    return {
        showActivityIndicator,
        loadingMore,
        itemNotfound,
        allLoaded,
        progressing,
        showErrorMessage,
        showSuccessMessage,
        message,
        banner,
        setProgressing,
        setShowErrorMessage,
        setShowSuccessMessage,
        setLoadingMore,
        // saveItemsToReducer,
        // getNearestGroceryStoreInfo,
        // handleSearchStore,
        exploreConsultationCenter,
        getNearestCenterInfo,
        getCenterInfoByDistrict,
        searchConsultationCenter
        // resetLoadingStatus,
        // resetReducer,
        // setCurrentModule
    };
};