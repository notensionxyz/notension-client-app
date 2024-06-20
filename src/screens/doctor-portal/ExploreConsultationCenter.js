import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, Text, Image, SafeAreaView, Pressable, FlatList, BackHandler } from "react-native";
import { useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { ScrollView } from 'react-native-virtualized-view';
import HeaderFoodModule from '../../components/header/HeaderFoodModule';
import { useCenter } from '../../hooks/fetch-data-by-module/health-care/useCenter';
import ManageListView from '../../components/screens-components/HealthCare/DeptInfoByCenter/ManageListView';


const screenWidth = Dimensions.get('window').width;

function ExploreConsultationCenter({ route }) {
    const ref = useRef(null);
    const centerInfo = route.params.data;
    const navigation = useNavigation();
    const [exploreInfo, setExploreInfo] = useState([]);
    const { customstore_id, merchantId, allDeptInfo, popularDoctors } = useSelector((state) => state.doctorInfo);

    const { exploreConsultationCenter, progressing } = useCenter();
    const isLoggedin = useSelector((state) => state.user.isLoggedin);
    const [firstFive, setFirstTwelve] = useState(popularDoctors?.slice(0, 5) || []);
    const [doctors6To110, setElements13To16] = useState(popularDoctors?.slice(5, 10) || []);
    const [doctors11To115, setElements17To20] = useState(popularDoctors?.slice(10, 15) || []);
    const [doctors16To120, setElements21To29] = useState(popularDoctors?.slice(15, 20) || []);

    useEffect(() => {
        exploreConsultationCenter(centerInfo?._id, setExploreInfo);
        const backAction = () => {
            navigation.goBack();
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);

    // const checkIsLoggedinAndProcess = (action) => {
    //     if (isLoggedin) {
    //         addToFavouriteList(visitedFoodStore, merchantType);
    //     } else {
    //         navigation.navigate('Login')
    //     }
    // }

    const findDoctorsByDept = React.useCallback((selected) => {
        const options = {
            searchDoctors: false,
            findNearestDoctors: false,
            findDoctorsByDept: false,
            findDoctorsByCenter: true,
            Title: `Doctors Info (${selected?.dept_name})`,
            deptId: '303030303030303030303030',
            centerId: '303030303030303030303030',
        };
        //console.log('again - pressss');

        navigation.navigate('DoctorsInformation', { options });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9', alignItems: 'center' }}>
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                <HeaderFoodModule toggleDrawer={navigation} />
                <ProgressStyle2 visible={progressing} />
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
                        <ManageListView allDeptInfo={exploreInfo?.departmentsInfoByCenter} popularDoctors={exploreInfo?.popularDoctorsByCenter} findDoctors={findDoctorsByDept} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default ExploreConsultationCenter;