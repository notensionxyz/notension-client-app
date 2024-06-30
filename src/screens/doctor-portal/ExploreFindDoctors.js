import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, Text, Image, SafeAreaView, Pressable, FlatList, BackHandler } from "react-native";
import { useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { ScrollView } from 'react-native-virtualized-view';
import FooterExploreStore from '../../components/footer/FooterExploreStore';
import FastImage from 'react-native-fast-image';

import ListView, { MemoizedListView } from '../../components/screens-components/FoodShop/Product/ListView';
import { storageImageUrl } from '../../helpers/imageUrl';
import HeaderFoodModule from '../../components/header/HeaderFoodModule';
import { useDoctor } from '../../hooks/fetch-data-by-module/health-care/useDoctor';
import ManageListView from '../../components/screens-components/HealthCare/FilterOptionByDept/ManageListView';
import { health_careImages, logoColor_1 } from '../../helpers/Constants';
import HeaderCommon from '../../components/header/HeaderCommon';
import SliderMedium from '../../components/screens-components/Common/slider/slider-medium';


const screenWidth = Dimensions.get('window').width;

function ExploreFindDoctors() {
    const ref = useRef(null);
    const navigation = useNavigation();
    const { findDoctorBanner, allDeptInfo, popularDoctors } = useSelector((state) => state.doctorInfo);
    const { exploreFindDoctor, progressing } = useDoctor();
    const isLoggedin = useSelector((state) => state.user.isLoggedin);
    const [slider, setSlider] = useState(findDoctorBanner?.slice(0, (findDoctorBanner.length - 2)) || []);
    const [nearestBanner, setNearestBanner] = useState('');
    const [centerBanner, setCenterBanner] = useState('');

    useEffect(() => {
        exploreFindDoctor();
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

    useEffect(() => {
        setSlider(findDoctorBanner?.slice(0, (findDoctorBanner.length - 2)) || []);
        setCenterBanner(findDoctorBanner[findDoctorBanner.length - 1]);
        setNearestBanner(findDoctorBanner[findDoctorBanner.length - 2]);
    }, [findDoctorBanner]);

    const findDoctors = React.useCallback(() => {
        const options = {
            searchDoctors: false,
            findNearestDoctors: true,
            findDoctorsByDept: false,
            findDoctorsByCenter: false,
            Title: 'Nearest Doctors Info',
            deptId: '303030303030303030303030',
            centerId: '303030303030303030303030',
        };
        //console.log('again - pressss');

        navigation.navigate('DoctorsInformation', { options });
    }, []);

    const findCenter = () => {
        const options = {
            searchCenter: false,
            findNearestCenter: false,
            findCenterByDistrict: true,
            centerType: 'Consultation Center',
            Title: 'Consultation Center Info',
        };

        navigation.navigate('CenterInformation', { options });
    };

    const findDoctorsByDept = (selected) => {
        const options = {
            searchDoctors: false,
            findNearestDoctors: false,
            findDoctorsByDept: true,
            findDoctorsByCenter: false,
            Title: `Doctors Info (${selected?.dept_name})`,
            deptId: selected?._id,
            centerId: '303030303030303030303030',
        };
        //console.log(selected);
        navigation.navigate('DoctorsInformation', { options });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9', alignItems: 'center' }}>
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
                <HeaderCommon toggleDrawer={navigation} title="Find Doctor" connectionStatus={false} isReachable={false} />
                <ProgressStyle2 visible={progressing} />
                <ScrollView>
                    <SliderMedium data={slider} folder_name={health_careImages} />
                    {allDeptInfo.length > 0 &&
                        <>
                            <View style={{ flex: 1, screenWidth: screenWidth, backgroundColor: '#cce6ff', paddingTop: 10, paddingBottom: 10, marginBottom: 5, alignItems: 'center', }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#cce6ff' }}>
                                    <Pressable onPress={() => { findDoctors() }}>
                                        <View style={{ height: ((screenWidth / 2) - 6), width: ((screenWidth / 2) - 6), padding: 5 }}>
                                            <View style={{
                                                justifyContent: 'space-between',
                                                borderRadius: 6,
                                                shadowRadius: 6,
                                                elevation: 3,
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowOpacity: 0.3,
                                                backgroundColor: 'white'
                                            }}>
                                                <FastImage
                                                    source={nearestBanner?.file_name && nearestBanner?.file_name !== '' && nearestBanner?.file_name !== null ?
                                                        {
                                                            uri: storageImageUrl(health_careImages, nearestBanner?.file_name)
                                                        }
                                                        :
                                                        require('../../assets/gallery/services/nearest.jpg')
                                                    }
                                                    resizeMode={FastImage.resizeMode.contain}
                                                    style={{
                                                        height: '100%',
                                                        width: '100%',
                                                        justifyContent: 'flex-end',
                                                        padding: 10,
                                                        borderRadius: 6,
                                                        shadowRadius: 6,
                                                        shadowOffset: { width: 0, height: 2 },
                                                        shadowOpacity: 0.3,
                                                        overflow: 'hidden'
                                                    }} />

                                            </View>
                                        </View>
                                    </Pressable>
                                    <Pressable onPress={() => { findCenter() }}>
                                        <View style={{ height: (screenWidth / 2) - 6, width: ((screenWidth / 2)) - 6, padding: 5 }}>
                                            <View style={{
                                                justifyContent: 'space-between',
                                                borderRadius: 6,
                                                shadowRadius: 6,
                                                elevation: 3,
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowOpacity: 0.3,
                                                backgroundColor: 'white'
                                            }}>
                                                <FastImage
                                                    source={centerBanner?.file_name && centerBanner?.file_name !== '' && centerBanner?.file_name !== null ?
                                                        {
                                                            uri: storageImageUrl(health_careImages, centerBanner?.file_name)
                                                        }
                                                        :
                                                        require('../../assets/gallery/services/consultation-center.jpg')
                                                    }
                                                    resizeMode={FastImage.resizeMode.contain}
                                                    style={{
                                                        height: '100%',
                                                        width: '100%',
                                                        justifyContent: 'flex-end',
                                                        padding: 10,
                                                        borderRadius: 6,
                                                        shadowRadius: 6,
                                                        shadowOffset: { width: 0, height: 2 },
                                                        shadowOpacity: 0.3,
                                                        overflow: 'hidden'
                                                    }} />

                                            </View>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
                                <ManageListView allDeptInfo={allDeptInfo} popularDoctors={popularDoctors} findDoctors={findDoctorsByDept} />
                            </View>
                        </>
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default ExploreFindDoctors;