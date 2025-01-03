import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, Text, Image, SafeAreaView, Pressable, FlatList, BackHandler, TouchableOpacity } from "react-native";
import { useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { ScrollView } from 'react-native-virtualized-view';
import HeaderFoodModule from '../../components/header/HeaderFoodModule';
import { useCenter } from '../../hooks/fetch-data-by-module/health-care/useCenter';
import ManageListView from '../../components/screens-components/HealthCare/DeptInfoByCenter/ManageListView';
import { makeCall, storageImageUrl } from '../../helpers/imageUrl';
import { health_careImages } from '../../helpers/Constants';
import { useFavouriteList } from '../../hooks/user/favorite-list';
import HeaderCommon from '../../components/header/HeaderCommon';
import LocationInfo from '../../components/screens-components/Common/LocationInfo';

const screenWidth = Dimensions.get('window').width;

let merchantType = 3;

function ExploreConsultationCenter({ route }) {
    const ref = useRef(null);
    const centerInfo = route.params.data;
    const navigation = useNavigation();
    const [exploreInfo, setExploreInfo] = useState([]);

    const { exploreConsultationCenter, progressing } = useCenter();
    const {
        isAddedToFavouriteList,
        addToFavouriteList,
        visible
    } = useFavouriteList();

    const isLoggedin = useSelector((state) => state.user.isLoggedin);

    useEffect(() => {
        exploreConsultationCenter(centerInfo, setExploreInfo);
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

    const findDoctorsByDept = (selected) => {
        const options = {
            searchDoctors: false,
            findNearestDoctors: false,
            findDoctorsByDept: false,
            findDoctorsByCenter: true,
            Title: `Doctors Info (${selected?.deptInfo?.dept_name})`,
            deptId: selected?.deptInfo?._id,
            centerId: centerInfo?._id,
        };
        navigation.navigate('DoctorsInformation', { options });
    };

    const checkIsLoggedinAndProcess = () => {
        if (isLoggedin) {
            addToFavouriteList(centerInfo, merchantType);
        } else {
            navigation.navigate('Login')
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
                <HeaderCommon toggleDrawer={navigation} title="Consultation Center Details" connectionStatus={false} isReachable={false} />
                <ProgressStyle2 visible={progressing || visible} />
                <LocationInfo />
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ height: screenWidth / 2, width: screenWidth, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={{ uri: storageImageUrl(health_careImages, centerInfo?.medical_center_banner_app) }} style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }} />
                            </View>
                        </View>
                        <View style={{ width: screenWidth - 8, padding: 10, backgroundColor: 'white' }}>
                            <Text style={{ fontSize: 18, color: '#006400', fontWeight: 'bold', paddingLeft: 5 }}>{centerInfo?.center_name}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Image source={require('../../assets/icon/ic_place_blue.png')}
                                    style={{ width: 25, height: 25, tintColor: 'blue', resizeMode: 'contain' }} />
                                <Text style={{ fontSize: 16, color: '#006400', marginLeft: 3, marginRight: 13 }}>{centerInfo?.address}</Text>
                            </View>

                            {centerInfo?.apointment_contact_1 &&
                                <>
                                    <TouchableOpacity style={{ alignItems: 'flex-start', marginTop: 15 }} onPress={() => makeCall(centerInfo?.apointment_contact_1)}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={require('../../assets/banner/call_us.png')}
                                                style={{ width: 110, height: 28, alignItems: 'flex-start', resizeMode: 'contain' }} />
                                            <Text style={{ fontSize: 18, color: '#003300', marginLeft: 8, fontWeight: 500 }}>{centerInfo?.apointment_contact_1}</Text>
                                        </View>
                                    </TouchableOpacity>

                                    {centerInfo?.apointment_contact_2 &&
                                        <TouchableOpacity style={{ alignItems: 'flex-start', marginTop: 7 }} onPress={() => makeCall(centerInfo?.apointment_contact_2)}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image source={require('../../assets/banner/call_us.png')}
                                                    style={{ width: 110, height: 28, alignItems: 'flex-start', resizeMode: 'contain' }} />
                                                <Text style={{ fontSize: 18, color: '#003300', marginLeft: 8, fontWeight: 500 }}>{centerInfo?.apointment_contact_2}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    }

                                    {centerInfo?.apointment_contact_3 &&
                                        <TouchableOpacity style={{ alignItems: 'flex-start', marginTop: 7 }} onPress={() => makeCall(centerInfo?.apointment_contact_3)}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image source={require('../../assets/banner/call_us.png')}
                                                    style={{ width: 110, height: 28, alignItems: 'flex-start', resizeMode: 'contain' }} />
                                                <Text style={{ fontSize: 18, color: '#003300', marginLeft: 8, fontWeight: 500 }}>{centerInfo?.apointment_contact_3}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                </>
                            }

                        </View>

                        {(!isAddedToFavouriteList(centerInfo?._id, merchantType) && centerInfo?.is_paid) &&
                            <View
                                style={{
                                    position: 'absolute',
                                    right: screenWidth / 30,
                                    top: screenWidth / 30,
                                }}>
                                <Pressable onPress={() => { checkIsLoggedinAndProcess(); }}>
                                    <Image source={require('../../assets/icon/add_favourite.png')}
                                        style={{ width: 100, height: 50, resizeMode: 'contain' }} />
                                </Pressable>
                            </View>
                        }
                        {exploreInfo?.departmentsInfoByCenter?.length > 0 &&
                            <ManageListView
                                allDeptInfo={exploreInfo?.departmentsInfoByCenter}
                                popularDoctors={exploreInfo?.popularDoctorsByCenter}
                                findDoctors={findDoctorsByDept}
                            />
                        }
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default ExploreConsultationCenter;