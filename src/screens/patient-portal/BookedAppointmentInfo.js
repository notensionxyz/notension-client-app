import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, View, BackHandler } from "react-native";
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useAppointment } from '../../hooks/fetch-data-by-module/health-care/useAppointment';

const screenWidth = Dimensions.get('window').width;
let cardMargin = 4;
let cardWidth = screenWidth - (cardMargin * 4);

export default function BookedAppointmentInfo() {
    const navigation = useNavigation();
    const bookedAppoinmentInfo = useSelector((state) => state.user.bookedAppoinmentInfo);
    const { saveAppoinmentInfo } = useAppointment();

    useEffect(() => {
        saveAppoinmentInfo('update', {});
        const backAction = () => {
            navigation.navigate('Dashboard');
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <HeaderCommon title={'অ্যাপয়েন্টমেন্টের তালিকা'} toggleDrawer={null} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                <FlatList
                    contentContainerStyle={{ padding: 5 }}
                    data={bookedAppoinmentInfo}
                    renderItem={({ item }) => <ListItem data={item} />}
                    keyExtractor={item => item._id}
                />
            </View>
        </View>
    );
}

function ListItem({ data }) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = new Date(data?.appointment_date).toLocaleDateString('en-GB', options);
    
    return (
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
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#7755cf', marginTop: 10, paddingLeft: 20, paddingRight: 10 }} numberOfLines={1} ellipsizeMode="tail">রোগীর নাম : {data?.patient_info?.patient_name}</Text>
                <Text style={{ fontSize: 15, color: '#9576e3', marginTop: 2, paddingLeft: 20, paddingRight: 10 }}>তারিখ : {formattedDate}--{data?.appointment_day}</Text>
                <Text style={{ fontSize: 15, color: '#9576e3', marginTop: 2, paddingLeft: 20, paddingRight: 10 }}>পরামর্শের সময় : {data?.time_slot}</Text>
                <Text style={{ fontSize: 15, color: '#9576e3', marginTop: 2, paddingLeft: 20, paddingRight: 10, marginBottom: 5 }}>সিরিয়াল নম্বর : {data?.serial_no}</Text>
                <View style={{
                    padding: 5,
                    backgroundColor: '#edf7f0',
                    borderRadius: 10,
                }}>
                    <Text style={{ fontSize: 18, color: '#a10a53', marginTop: 2, paddingLeft: 15, fontWeight: 500 }}>{data?.doctor_name}</Text>
                    <Text style={{ fontSize: 15, color: '#a10a53', marginTop: 2, paddingLeft: 15, fontWeight: 500 }} numberOfLines={1} ellipsizeMode="tail">{data?.doctor_speciality}</Text>
                    <Text style={{ fontSize: 15, color: '#a10a53', paddingLeft: 15, fontWeight: 500, marginBottom: 10 }}>{data?.consultation_center_name}</Text>
                </View>
            </View>
        </View>
    );
}