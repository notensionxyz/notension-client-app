import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View, BackHandler, Pressable, Image } from "react-native";
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useBankingOutlet } from '../../hooks/fetch-data-by-module/service-provider/useBankingOutlet';
import { storageImageUrl } from '../../helpers/imageUrl';

const screenWidth = Dimensions.get('window').width;
let cardMargin = 4;
let cardWidth = screenWidth - (cardMargin * 4);

export default function BankingOutlet() {
    const navigation = useNavigation();

    const {
        bankingOutletInfo,
        progressing,
        findNearestBankingOutlet
    } = useBankingOutlet();

    useEffect(() => {
        findNearestBankingOutlet();
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

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <ProgressStyle2 visible={progressing} />
            <HeaderCommon title={'Banking Outlet Information'} toggleDrawer={null} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#ff9800', width: '100%' }}>
                    <Text style={{ flex: 1, color: 'white', paddingVertical: 10, fontSize: 18, textAlign: 'center' }}>Select Banking Outlet</Text>
                </View>
                <FlatList
                    contentContainerStyle={{ padding: 5 }}
                    data={bankingOutletInfo}
                    renderItem={({ item }) => <ListItem data={item} />}
                    keyExtractor={item => item._id}
                />
            </View>
        </View>
    );
}

function ListItem({ data }) {
    const navigation = useNavigation();
    const lines = data?.outlet_info?.split('\n');
    // Get the first line
    const firstLine = lines[0];

    // Get the other lines (excluding the first line)
    const otherLines = lines.slice(1).join('\n');
    return (
        <Pressable onPress={() => { navigation.navigate('BankingOutletDetails', { data }); }}>
            <View style={{
                backgroundColor: 'white',
                width: cardWidth,
                margin: cardMargin,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                borderRadius: 10,
                elevation: 3,
            }} >
                <FastImage source={{ uri: storageImageUrl('banking-outlet', data.outlet_image) }}
                    style={{
                        width: "100%",
                        height: (screenWidth / 2) - 2,
                        justifyContent: 'flex-end',
                        padding: 10,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        //shadowRadius: 10,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        overflow: 'hidden'
                    }} />
                <View style={{ width: screenWidth, padding: 10, backgroundColor: 'white' }}>
                    <Text style={{ fontSize: 18, color: '#006400', fontWeight: 'bold', paddingLeft: 5 }} numberOfLines={1} ellipsizeMode="tail">
                        {firstLine}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Image source={require('../../assets/icon/ic_place_blue.png')}
                            style={{ width: 25, height: 25, tintColor: 'blue', resizeMode: 'contain' }} />
                        <Text style={{ fontSize: 16, color: '#006400', marginLeft: 3, marginRight: 13, textAlign: 'justify' }}>{otherLines}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}