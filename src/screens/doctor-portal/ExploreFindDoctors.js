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
import { logoColor_1 } from '../../helpers/Constants';


const screenWidth = Dimensions.get('window').width;

function ExploreFindDoctors() {
    const ref = useRef(null);
    const navigation = useNavigation();
    const { customstore_id, merchantId, allDeptInfo, popularDoctors } = useSelector((state) => state.doctorInfo);

    const { exploreFindDoctor, progressing } = useDoctor();
    const isLoggedin = useSelector((state) => state.user.isLoggedin);
    const [firstFive, setFirstTwelve] = useState(popularDoctors?.slice(0, 5) || []);
    const [doctors6To110, setElements13To16] = useState(popularDoctors?.slice(5, 10) || []);
    const [doctors11To115, setElements17To20] = useState(popularDoctors?.slice(10, 15) || []);
    const [doctors16To120, setElements21To29] = useState(popularDoctors?.slice(15, 20) || []);

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

    // const checkIsLoggedinAndProcess = (action) => {
    //     if (isLoggedin) {
    //         addToFavouriteList(visitedFoodStore, merchantType);
    //     } else {
    //         navigation.navigate('Login')
    //     }
    // }

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


    const findCenter = React.useCallback(() => {
        const options = {
            searchCenter: false,
            findNearestCenter: false,
            findCenterByDistrict: true,
            centerType: 'ConsultationCenter',
            Title: 'Consultation Center Info',
        };

        navigation.navigate('CenterInformation', { options });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9', alignItems: 'center' }}>
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                <HeaderFoodModule toggleDrawer={navigation} />
                <ProgressStyle2 visible={progressing} />
                <ScrollView>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => { findDoctors() }}>
                            <View style={{ height: ((screenWidth / 2) - 6), width: ((screenWidth / 2) - 6), padding: 3 }}>
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
                                        source={require('../../assets/gallery/services/nearest.jpg')}
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
                            <View style={{ height: (screenWidth / 2) - 6, width: ((screenWidth / 2)) - 6, padding: 3 }}>
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
                                        source={require('../../assets/gallery/services/consultation-center.jpg')}
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
                    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
                        <ManageListView allDeptInfo={allDeptInfo} popularDoctors={popularDoctors} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

function ItemNews({ data }) {
    let demo_doctor_pic = require('../../assets/gallery/services/male.jpg');
    if (data?.doctorprofile?.gender === "Female") {
        demo_doctor_pic = require('../../assets/gallery/services/female.jpg');
    }
    return (
        <View style={{ width: screenWidth * 0.85 }}>
            <View style={{
                height: (screenWidth * 0.50),
                marginHorizontal: 5,
                // marginTop: 5,
                padding: 6,
                backgroundColor: 'white',
                borderRadius: 10,
                shadowRadius: 10,
                elevation: 3,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
            }}>
                <View style={{ flexDirection: 'row', marginTop: 2 }}>
                    <Image source={demo_doctor_pic}
                        style={{ height: (screenWidth * 0.28), width: (screenWidth * 0.21), resizeMode: 'cover', borderRadius: 6, }} />
                    <View style={{ paddingLeft: 15, flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#616161' }}>{data?.doctorprofile?.doctor_name}</Text>
                        <Text style={{ fontSize: 14, marginTop: 3, color: '#616161', lineHeight: 18 }} numberOfLines={3} ellipsizeMode="tail">{data?.doctorprofile?.qualifications}</Text>
                    </View>
                </View>
                <View style={{
                    marginTop: 5,
                    //width: screenWidth * 0.75,
                    paddingLeft: 5,
                    backgroundColor: logoColor_1,
                    //alignItems: 'center',
                    //justifyContent: 'center'
                }}>
                    <Text style={{ fontSize: 16, color: 'white', padding: 5, fontWeight: 'bold' }} numberOfLines={1} ellipsizeMode="tail">{data?.doctorprofile?.speciality}</Text>
                </View>
                <Text adjustsFontSizeToFit style={{ fontSize: 16, marginTop: 5, paddingLeft: 5, color: '#616161', fontWeight: 'bold', lineHeight: 22 }} numberOfLines={1} ellipsizeMode="tail">{data?.consultationcenter?.center_name}</Text>
            </View>
        </View>
    );
}

export default ExploreFindDoctors;