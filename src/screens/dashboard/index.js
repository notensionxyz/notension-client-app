import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, View, BackHandler, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux"
import HeaderDashboard from "./dashboard-components/HeaderDashboard";
import SplashScreen from './SplashScreen';
import MyFavourite from "./dashboard-components/MyFavourite";
import BusinessModules from "./dashboard-components/BusinessModules";
import MedicalServices from "./dashboard-components/MedicalServices";
import AddSlider from "./dashboard-components/AddSlider";
import FreeServicesSlider from "./dashboard-components/FreeServicesSlider";
import FreeServices from "./dashboard-components/FreeServices";
import InternetConnectionFailed from '../../components/screens-components/Common/InternetConnectionFailed';
import ConfirmLocation from '../../components/screens-components/Common/ConfirmLocation';
import { useGlobal } from '../../hooks/global';
import DistrictName from '../../components/screens-components/HomeScreen/DistrictName';
import HeaderCommon from '../../components/header/HeaderCommon';
import { handleDashboardReducer } from '../../store/reducers/dashboardReducer';

const screenWidth = Dimensions.get('window').width;

let connectionStatus = true;
let isReachable = true;

function Dashboard(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { internetConnectionAvailable,
        isLoading,
        favourite_banner,
        starting_slider,
        business_type_banner,
        advertisement_slider,
        medical_services_banner,
        free_services_slider
    } = useSelector((state) => state.dashboard);

    const { userLatitude, userLongitude, districtId, districtInfo } = useSelector((state) => state.user);

    const { getDasboardInfo, saveConnectionStatus } = useGlobal();
    //const { getStorageInfo } = useAdminInformation();
    const [filteredInfo, setFilteredInfo] = useState([]);

    useEffect(() => {
        setFilteredInfo(districtInfo);
    }, [districtInfo]);

    useEffect(() => {
        // getStorageInfo();
        getDasboardInfo();
        //let isMounted = true;
        getConnectionStatus();

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

        //return () => backHandler.remove();
        return () => {
            backHandler.remove(); //isMounted = false; 
        };
    }, []);

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

    console.log('userLatitude', userLatitude);

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
                    {isLoading ?
                        <SplashScreen />
                        :
                        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                            {districtId === '00' ?
                                <>
                                    <HeaderCommon title="search" onInputText={searchDistrict} toggleDrawer={props.navigation} />
                                    <DistrictName filteredInfo={filteredInfo} />
                                </>
                                :
                                <>
                                    {userLatitude === '00' ?
                                        <ConfirmLocation />
                                        :
                                        <>
                                            <HeaderDashboard toggleDrawer={props.navigation} connectionStatus={connectionStatus} isReachable={isReachable} />
                                            <ScrollView>
                                                <FreeServicesSlider data={starting_slider} />
                                                <MyFavourite title='My Favourite' data={favourite_banner} height={100} />
                                                <BusinessModules data={business_type_banner} />
                                                <AddSlider data={advertisement_slider} />
                                                <MedicalServices data={medical_services_banner} />
                                                <FreeServicesSlider data={free_services_slider} />
                                                <FreeServices />
                                            </ScrollView>
                                        </>
                                    }
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