import React, { useEffect, useState } from 'react';
import { Dimensions, useWindowDimensions, StyleSheet, FlatList, Image, TouchableOpacity, View, Text, BackHandler, TouchableHighlight, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';
import HTML from 'react-native-render-html';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from "react-redux"
import { makeCall, storageImageUrl } from '../../helpers/imageUrl';
import { health_careImages } from '../../helpers/Constants';
import HeaderCommon from '../../components/header/HeaderCommon';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { useFavouriteList } from '../../hooks/user/favorite-list';
import { useDoctor } from '../../hooks/fetch-data-by-module/health-care/useDoctor';

const screenWidth = Dimensions.get('window').width;
const hight = Dimensions.get('window').hight;

let connectionStatus = 'true';
let isReachable = 'true';
let merchantType = 4;
let demo_doctor_pic = '';

export default function ProfileOfDoctor({ route }) {
    const navigation = useNavigation();
    const { getProfileOfDoctor, progressing } = useDoctor();
    const infoDoctor = route.params.data;
    const [profileInfo, setProfileInfo] = useState([]);
    const [doctorName, setDoctorName] = useState(infoDoctor?.doctorInfo?.doctor_name || '');
    const [doctorQualification, setDoctorQualification] = useState(infoDoctor?.doctorInfo?.qualifications || '');
    const [doctorSpeciality, setDoctorSpeciality] = useState(infoDoctor?.doctorInfo?.speciality || '');
    const [doctorProfilePic, setDoctorProfilePic] = useState(infoDoctor?.doctorInfo?.profile_pic || '');

    const {
        isAddedToFavouriteList,
        addToFavouriteList,
        visible
    } = useFavouriteList();

    useEffect(() => {

        demo_doctor_pic = require('../../assets/gallery/services/male.jpg');
        if (infoDoctor?.doctorInfo?.gender === "Female") {
            demo_doctor_pic = require('../../assets/gallery/services/female.jpg');
        }
        if (infoDoctor?.fetchDetails) {
            getProfileOfDoctor(infoDoctor?.doctorInfo?._id, setProfileInfo);
        } else {
            setProfileInfo([infoDoctor]);
        }

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
        if (profileInfo.length > 0) {
            setDoctorProfilePic(profileInfo[0]?.doctorInfo?.profile_pic || '');
            setDoctorName(profileInfo[0]?.doctorInfo?.doctor_name || '');
            setDoctorQualification(profileInfo[0]?.doctorInfo?.qualifications || '');
            setDoctorSpeciality(profileInfo[0]?.doctorInfo?.speciality || '');
            demo_doctor_pic = require('../../assets/gallery/services/male.jpg');
            if (profileInfo[0]?.doctorInfo?.gender === "Female") {
                demo_doctor_pic = require('../../assets/gallery/services/female.jpg');
            }
        }
    }, [profileInfo]);

    const checkIsLoggedinAndProcess = (data) => {
        addToFavouriteList(data, merchantType);
    }

    let cardMargin = 6;
    let cardWidth = screenWidth - (cardMargin * 8);

    return (

        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
            <HeaderCommon toggleDrawer={navigation} title="Doctor's Profile" connectionStatus={false} isReachable={false} />
            <ProgressStyle2 visible={progressing} />
            <ScrollView>
                <View style={{ height: screenWidth / 2, width: screenWidth, backgroundColor: 'white', alignItems: 'center', overflow: 'hidden', justifyContent: 'center' }}>
                    <FastImage source={doctorProfilePic && doctorProfilePic !== '' && doctorProfilePic !== null ? {
                        uri: storageImageUrl(health_careImages, doctorProfilePic)
                    } : demo_doctor_pic}
                        style={{ height: (screenWidth * 0.48), width: (screenWidth * 0.36), resizeMode: 'cover', }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>

                {(!isAddedToFavouriteList(infoDoctor?.doctorInfo?._id, merchantType) && infoDoctor?.consultationCenterInfo?.is_paid) &&
                    <View style={{
                        position: 'absolute',
                        right: screenWidth / 30,
                        top: screenWidth / 2.65,
                    }}>
                        <TouchableOpacity onPress={() => {
                            checkIsLoggedinAndProcess(infoDoctor?.doctorInfo);
                        }}>
                            <Image style={{ width: 120, height: 40, }}
                                resizeMode={'contain'}
                                source={require('../../assets/icon/add_favourite.png')} />
                        </TouchableOpacity>
                    </View>
                }

                <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                    <View style={{
                        width: screenWidth,
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderTopWidth: 0.5,
                        borderTopColor: '#e0e0e0',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                        <View style={{ flex: 1, padding: 10 }}>

                            <Text style={{ fontSize: 18, color: '#263238', fontWeight: 'bold' }}>{doctorName}</Text>
                            <Text style={{ fontSize: 16, color: '#263238' }}>{doctorQualification}</Text>

                            <View style={{
                                marginTop: 2,
                                marginBottom: 3,
                                paddingLeft: 5,
                                backgroundColor: '#ccb7f7',
                            }}>
                                <Text style={{ fontSize: 16, color: 'white', padding: 5, paddingLeft: 10, fontWeight: 'bold' }} numberOfLines={1} ellipsizeMode="tail">{doctorSpeciality}</Text>
                            </View>
                            {
                                profileInfo?.map((data, index) => (
                                    <View key={index} style={{
                                        marginTop: 3,
                                        padding: 5,
                                        marginBottom: 10,
                                        borderColor: '#263238',
                                        borderWidth: 1,
                                        borderRadius: 15,
                                    }}>
                                        <View style={{
                                            marginBottom: 3,
                                            paddingLeft: 5,
                                            // backgroundColor: '#0943d6',
                                        }}>
                                            <Text style={{ fontSize: 17, color: '#0943d6', padding: 5, paddingLeft: 5, fontWeight: 'bold' }} numberOfLines={1} ellipsizeMode="tail">পরামর্শ কেন্দ্র :</Text>
                                            <Text style={{ fontSize: 18, color: '#006400', fontWeight: 'bold', paddingLeft: 5 }}>{data?.consultationCenterInfo?.center_name}</Text>
                                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                <Image source={require('../../assets/icon/ic_place_blue.png')}
                                                    style={{ width: 25, height: 25, tintColor: 'blue', resizeMode: 'contain' }} />
                                                <Text style={{ fontSize: 16, color: '#006400', marginLeft: 3, marginRight: 13 }}>{data?.consultationCenterInfo?.address}</Text>
                                            </View>
                                        </View>

                                        <Text style={{ fontSize: 17, color: '#0943d6', padding: 5, paddingLeft: 5, fontWeight: 'bold' }} numberOfLines={1} ellipsizeMode="tail">পরামর্শের সময় :</Text>
                                        {data?.chamber_onDay_time_slot_1 &&
                                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                <Image source={require('../../assets/icon/clock.png')}
                                                    style={{ width: 25, height: 25, marginTop: 8, tintColor: '#660663', resizeMode: 'contain' }} />
                                                <Text style={{ fontSize: 16, color: '#a10a53', marginLeft: 10, marginRight: 13 }}>{(data?.chamber_onDay_time_slot_1).trim()}</Text>
                                            </View>
                                        }

                                        {data?.chamber_onDay_time_slot_2 &&
                                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                <Image source={require('../../assets/icon/clock.png')}
                                                    style={{ width: 25, height: 25, marginTop: 8, tintColor: '#8a1b0f', resizeMode: 'contain' }} />
                                                <Text style={{ fontSize: 16, color: '#4d4d00', marginLeft: 10, marginRight: 13 }}>{(data?.chamber_onDay_time_slot_2).trim()}</Text>
                                            </View>
                                        }

                                        {data?.chamber_onDay_time_slot_3 &&
                                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                <Image source={require('../../assets/icon/clock.png')}
                                                    style={{ width: 25, height: 25, marginTop: 8, tintColor: '#c47008', resizeMode: 'contain' }} />
                                                <Text style={{ fontSize: 16, color: '#b800e6', marginLeft: 10, marginRight: 13 }}>{(data?.chamber_onDay_time_slot_3).trim()}</Text>
                                            </View>
                                        }

                                        <View style={{
                                            marginTop: 10,
                                            marginBottom: 3,
                                            paddingLeft: 5,
                                            backgroundColor: '#cc5200',
                                        }}>
                                            <Text style={{ fontSize: 16, color: 'white', padding: 5, paddingLeft: 10, fontWeight: 'bold' }} numberOfLines={1} ellipsizeMode="tail">সিরিয়ালের জন্য :</Text>
                                        </View>

                                        {(data?.consultationCenterInfo?.apointment_contact_1 || data?.person_1_contact_number) &&
                                            <CallButton
                                                onPress={() => { makeCall(data?.person_1_contact_number ? data?.person_1_contact_number : data?.consultationCenterInfo?.apointment_contact_1) }}
                                                cardWidth={cardWidth}
                                                cardMargin={cardMargin}
                                                contact_number={data?.person_1_contact_number ? data?.person_1_contact_number : data?.consultationCenterInfo?.apointment_contact_1}
                                            />
                                        }

                                        {(data?.person_2_contact_number || data?.consultationCenterInfo?.apointment_contact_2) &&
                                            <CallButton
                                                onPress={() => { makeCall(data?.person_2_contact_number ? data?.person_2_contact_number : data?.consultationCenterInfo?.apointment_contact_2) }}
                                                cardWidth={cardWidth}
                                                cardMargin={cardMargin}
                                                contact_number={data?.person_2_contact_number ? data?.person_2_contact_number : data?.consultationCenterInfo?.apointment_contact_2}
                                            />
                                        }

                                        {(data?.person_3_contact_number || data?.consultationCenterInfo?.apointment_contact_3) &&
                                            <CallButton
                                                onPress={() => { makeCall(data?.person_3_contact_number ? data?.person_3_contact_number : data?.consultationCenterInfo?.apointment_contact_2) }}
                                                cardWidth={cardWidth}
                                                cardMargin={cardMargin}
                                                contact_number={data?.person_3_contact_number ? data?.person_3_contact_number : data?.consultationCenterInfo?.apointment_contact_3}
                                            />
                                        }
                                    </View>
                                ))}
                        </View>
                    </View >
                </View>
            </ScrollView>
        </View>
    );
}

const CallButton = ({ onPress, cardWidth, cardMargin, contact_number }) => {
    return (
        <TouchableOpacity style={{
            width: cardWidth,
            margin: cardMargin,
            backgroundColor: 'white',
            borderRadius: 10,
            shadowRadius: 10,
            elevation: 2,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            padding: 5
        }} onPress={() => { onPress() }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 15 }}>
                <Text style={{ fontSize: 19, color: '#b800e6', marginLeft: 10, marginRight: 13 }}>{contact_number}</Text>
                <Image source={require('../../assets/icon/map5_ic_call.png')}
                    style={{ width: 35, height: 35, tintColor: '#c47008', resizeMode: 'contain' }} />
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    imageBanner: {
        padding: 2,
        height: screenWidth - 1,
        width: screenWidth - 1,
        borderRadius: 2,
        marginHorizontal: 1
    },
    paginationContainer: {
        top: 0,
    },
    pagination: {
        width: 4,
        height: 4,
        padding: 3,
        columnGap: 1,
        marginBottom: 5,
        opacity: 1.5,
        elevation: 2,
        borderRadius: 2,
    },

});