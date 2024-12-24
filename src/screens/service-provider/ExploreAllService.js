import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, Text, Image, SafeAreaView, Pressable, FlatList, BackHandler } from "react-native";
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { ScrollView } from 'react-native-virtualized-view';
import HeaderCommon from '../../components/header/HeaderCommon';

import LocationInfo from '../../components/screens-components/Common/LocationInfo';
import ManageListView from '../../components/screens-components/AllCare/FilterOptionByServiceType/ManageListView';
import { useAllCareService } from '../../hooks/fetch-data-by-module/service-provider/useAllCareService';

const screenWidth = Dimensions.get('window').width;
let join_us_banner = require('../../assets/banner/join-us-provider.jpg');

function ExploreAllService() {
    const ref = useRef(null);
    const navigation = useNavigation();
    const { careSlider, allServicesInfo } = useSelector((state) => state.allCare);
    const { exploreAllCareService, progressing } = useAllCareService();
    const isLoggedin = useSelector((state) => state.user.isLoggedin);


    useEffect(() => {
        exploreAllCareService();
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

    const findServiceProvider = (selected) => {
        //console.log(selected);
        if (isLoggedin) {
            const output = selected?.sliderInfo?.service_slider.map((fileName, index) => {
                return {
                    file_name: fileName,
                    id: (index + 1).toString()
                };
            });
            const options = {
                serviceId: selected?._id,
                sliderInfo: output,
                Title: selected?.service_name_eng,
            };
            //console.log('output',output);
            navigation.navigate('ExploreServideProvider', { options });
        } else {
            navigation.navigate('Login');
        }
    };

    const checkIsLoggedinAndProcess = () => {
        navigation.navigate('RequestForRegistration');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9', alignItems: 'center' }}>
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
                <HeaderCommon toggleDrawer={navigation} title="All Care Services" connectionStatus={false} isReachable={false} />
                <LocationInfo />
                <ProgressStyle2 visible={progressing} />
                <ScrollView>
                    {allServicesInfo.length > 0 &&
                        <>
                            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
                                <Pressable
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }} onPress={() => { checkIsLoggedinAndProcess(); }}>
                                    <View style={{
                                        height: ((screenWidth * 0.96) / 4.5),
                                        width: screenWidth * 0.96,
                                        borderRadius: 8,
                                        justifyContent: 'center',
                                        marginTop: 10
                                    }}>
                                        <View style={{
                                            borderRadius: 8,
                                            shadowRadius: 8,
                                            elevation: 3,
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.3,
                                            backgroundColor: 'white',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <FastImage
                                                source={join_us_banner}
                                                resizeMode={FastImage.resizeMode.contain}
                                                style={{
                                                    height: '100%',
                                                    width: '100%',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 10,
                                                    borderRadius: 8,
                                                    overflow: 'hidden'
                                                }} />
                                        </View>
                                    </View>
                                </Pressable>
                                <ManageListView allServicesInfo={allServicesInfo} careSlider={careSlider} findServiceProvider={findServiceProvider} />
                            </View>
                        </>
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}



export default ExploreAllService;