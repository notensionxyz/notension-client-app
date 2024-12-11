import React, { useEffect, useState } from 'react';
import { Dimensions, View, BackHandler, Alert, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux"
import { ScrollView } from 'react-native-virtualized-view';
import HeaderDashboard from "./dashboard-components/HeaderDashboard";
import SplashScreen from './SplashScreen';
import MyFavourite from "./dashboard-components/MyFavourite";
import BusinessModules from "./dashboard-components/BusinessModules";
import MedicalServices from "./dashboard-components/MedicalServices";
import AddSlider from "./dashboard-components/AddSlider";
import FreeServicesSlider from "./dashboard-components/FreeServicesSlider";
import InternetConnectionFailed from '../../components/screens-components/Common/InternetConnectionFailed';
import ConfirmLocation from '../../components/screens-components/Common/ConfirmLocation';
import { useGlobal } from '../../hooks/global';
import DistrictName from '../../components/screens-components/HomeScreen/DistrictName';
import HeaderCommon from '../../components/header/HeaderCommon';
import { handleDashboardReducer } from '../../store/reducers/dashboardReducer';
import { logoColor_2 } from '../../helpers/Constants';
import { useUser } from '../../hooks/useUser';
import GooglePlacesInput from '../../components/screens-components/Common/GooglePlacesAutocomplete';
import LocationInfo from '../../components/screens-components/Common/LocationInfo';
import FreeServices from './dashboard-components/FreeServices';

const screenWidth = Dimensions.get('window').width;

let connectionStatus = true;
let isReachable = true;

function Dashboard() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { internetConnectionAvailable,
        isLoading,
        favourite_banner,
        starting_slider,
        business_type_banner,
        advertisement_slider,
        medical_services_banner,
        free_services_slider,
        ad_slider_by_district
    } = useSelector((state) => state.dashboard);
    const { resetUserCurrentLocation } = useUser();
    const { defaultUserLocation, districtInfo } = useSelector((state) => state.user);

    const { getDistrictInfo, getDasboardInfo, saveConnectionStatus, progressing, setProgressing } = useGlobal();

    const [filteredInfo, setFilteredInfo] = useState([]);

    useEffect(() => {

        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
                {
                    text: "No",
                    onPress: () => null,
                    style: "No"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();

    }, []);

    useEffect(() => {
        if (districtInfo?.length < 1) {
            getDistrictInfo();
            //console.log('getDistrictInfo()');
        } else {
            setFilteredInfo(districtInfo);
            //console.log('setFilteredInfo()');
        }
    }, []);

    useEffect(() => {

        if (defaultUserLocation?.userLatitude && defaultUserLocation?.userLatitude !== '00') {
            getDasboardInfo();
            //console.log('getDasboardInfo()');
        }

        getConnectionStatus();

    }, [defaultUserLocation?.userLatitude]);

    const getConnectionStatus = () => {
        // dispatch({ type: 'START_APP', item: 'start' });
        NetInfo.fetch().then(state => {
            connectionStatus = state.isConnected;
            isReachable = state.isInternetReachable;
        });
        connectionStatus = true; isReachable = true;
    };

    const reTry = () => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected || !state.isInternetReachable) {
                dispatch(
                    handleDashboardReducer({
                        type: 'SAVE_CONNECTION_STATUS',
                        data: false,
                    })
                );
            } else {
                dispatch(
                    handleDashboardReducer({
                        type: 'SAVE_CONNECTION_STATUS',
                        data: true,
                    })
                );
                setTimeout(() => {
                    getDasboardInfo();
                }, 500);
            }
        });
    }

    const timerRef = React.useRef(null);
    searchDistrict = text => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            const searchText = text.trim();
            let searchInfo = [];
            if (searchText.length > 0) {
                searchInfo = districtInfo.filter(
                    (info) =>
                        info.district_name
                            .toLowerCase()
                            .includes(searchText.toLowerCase()) ||
                        info.district_name.match(new RegExp(searchText, 'ui')) // Case-insensitive, Unicode search
                );

            } else {
                searchInfo = districtInfo;
            }
            setFilteredInfo(searchInfo);
        }, 800);
    };

    return (
        <>
            {!internetConnectionAvailable ?
                <InternetConnectionFailed reTry={reTry} />
                :
                <>
                    {progressing ?
                        <SplashScreen />
                        :
                        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                            {/* {!defaultUserLocation?.districtId || defaultUserLocation?.districtId === '00' ?
                                <>
                                    <HeaderCommon title="search" onInputText={searchDistrict} toggleDrawer={navigation} />
                                    <DistrictName filteredInfo={filteredInfo} setFilteredInfo={setFilteredInfo} />
                                </>
                                :
                                <> */}
                            {!defaultUserLocation?.userLatitude || defaultUserLocation?.userLatitude === '00' ?
                            
                                <ConfirmLocation />
                                :
                                <>
                                    <HeaderDashboard toggleDrawer={navigation} connectionStatus={connectionStatus} isReachable={isReachable} />
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        <LocationInfo />
                                        <FreeServicesSlider data={starting_slider} />
                                        <MyFavourite title='My Favourite' data={favourite_banner} height={100} />
                                        <BusinessModules data={business_type_banner} />
                                        <AddSlider data={ad_slider_by_district?.first_slider} />
                                        <MedicalServices data={medical_services_banner} />
                                        <AddSlider data={ad_slider_by_district?.second_slider} />
                                        {/* <FreeServicesSlider data={free_services_slider} />
                                        <FreeServices /> */}
                                    </ScrollView>
                                </>
                            }

                        </View>
                    }
                </>
            }
        </>
    );
}

export default Dashboard;