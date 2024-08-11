import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View, BackHandler } from "react-native";
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import HeaderCommon from '../../components/header/HeaderCommon';
import { usePatient } from '../../hooks/fetch-data-by-module/health-care/usePatient';

const screenWidth = Dimensions.get('window').width;
let cardMargin = 4;
let cardWidth = screenWidth - (cardMargin * 4);

export default function PatientInfo({ route }) {
    const navigation = useNavigation();
    const patientInfo = useSelector((state) => state.user.patientInfo);
    let appoinmentData = route.params.data;

    const {
        progressing,
        getPatientInfo
    } = usePatient();

    useEffect(() => {
        if (patientInfo.length < 1) {
            getPatientInfo();
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

    const initialInformation = {
        _id: '303030303030303030303030',
        patient_name: '',
        contact: '',
        alternative_contact: '',
        address: '',
        email: '',
        gender: '',
        date_of_birth: new Date(),
    };

    const bookAppoinment = (data) => {
        appoinmentData.patientId = data?._id;
        appoinmentData.patient_name = data?.patient_name;
        appoinmentData.patient_contact = data?.contact;
        //console.log(appoinmentData);
        navigation.navigate('BookAppointment', { data: appoinmentData })
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <ProgressStyle2 visible={progressing} />
            <HeaderCommon title={'Patient Information'} toggleDrawer={null} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#ff9800', width: '100%' }}>
                    <Text style={{ flex: 1, color: 'white', paddingVertical: 10, fontSize: 18, textAlign: 'center' }}>Select Patient Name</Text>
                </View>

                <FlatList
                    ListHeaderComponent={
                        null
                    }
                    ListFooterComponent={
                        <TouchableOpacity onPress={() => { navigation.navigate('PatientProfile', { data: initialInformation, action: 'register' }); }}
                            style={{

                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <View style={{ height: ((screenWidth / 3) - 6), width: screenWidth - 17, borderRadius: 10, marginTop: cardMargin }}>
                                <View style={{
                                    borderRadius: 10,
                                    shadowRadius: 10,
                                    elevation: 3,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.3,
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <FastImage
                                        source={require('../../assets/banner/register_patient.png')}
                                        resizeMode={FastImage.resizeMode.contain}
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            //padding: 10,
                                            borderRadius: 10,
                                            shadowRadius: 10,
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.3,
                                            overflow: 'hidden'
                                        }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    contentContainerStyle={{ padding: 5 }}
                    data={patientInfo}
                    renderItem={({ item }) => <ListItem data={item} bookAppoinment={bookAppoinment} />}
                    keyExtractor={item => item._id}
                />

            </View>
        </View>
    );
}

function ListItem({ data, bookAppoinment }) {
    const navigation = useNavigation();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = new Date(data?.date_of_birth).toLocaleDateString('en-GB', options);

    return (
        <TouchableOpacity onPress={() => {
            //navigation.navigate('PatientProfile', { data: data, action: 'update' });
            bookAppoinment(data);
        }}>
            <View style={{
                backgroundColor: 'white',
                width: cardWidth,
                margin: cardMargin,
                flexDirection: 'row',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                borderRadius: 10,
                elevation: 3,
            }} >
                <View style={{ flex: 1, padding: 15 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#F68F1E' }} numberOfLines={1} ellipsizeMode="tail">Name : {data?.patient_name}</Text>
                    <Text style={{ fontSize: 15, color: '#008000', marginTop: 2 }}>Contact : {data?.contact}</Text>
                    <Text style={{ fontSize: 15, color: '#008000', marginTop: 2 }}>Date Of Birth: {formattedDate}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}