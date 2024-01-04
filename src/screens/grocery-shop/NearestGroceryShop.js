import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Text, BackHandler, View, Pressable } from "react-native";
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { storageImageUrl } from '../../helpers/imageUrl';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useNavigation } from '@react-navigation/native';
import { useGrocery } from '../../hooks/fetch-data-by-module/useGrocery';

const screenWidth = Dimensions.get('window').width;

function NearestGroceryShop(props) {
    const navigation = useNavigation();
    const [nearestInfo, setNearestInfo] = useState([]);

    const { getNearestGroceryStoreInfo, progressing } = useGrocery();

    useEffect(() => {
        getNearestGroceryStoreInfo(setNearestInfo, 1000);
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
        <>
            <ProgressStyle2 visible={progressing} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
                <HeaderCommon title="Grocery Store Info" toggleDrawer={props.navigation} />
                <View style={{
                    backgroundColor: '#FFF',
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{ flex: 1, paddingTop: 8, paddingBottom: 8 }}>
                        <Text style={{ color: '#006400', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>আপনার নিকটস্থ ষ্টোর নির্বাচন করুন</Text>
                    </View>
                </View>
                <FlatList
                    contentContainerStyle={{ padding: 5 }}
                    data={nearestInfo}
                    renderItem={({ item }) => <ListItem data={item} />}
                    keyExtractor={item => item._id}
                />
            </View>
        </>
    );
}

function ListItem({ data }) {
    let cardMargin = 4;
    let cardWidth = screenWidth - (cardMargin * 4.5);
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => { navigation.navigate('ExploreGroceryShop', { data }) }}>
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
                <FastImage source={{ uri: storageImageUrl('grocery-store-docs', data.shop_banner_app) }}
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
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 18, color: '#263238', fontWeight: 'bold', paddingLeft: 5 }}>{data.shop_name}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                        <Image source={require('../../assets/icon/ic_place_blue.png')}
                            style={{ width: 25, height: 25, tintColor: 'blue', resizeMode: 'contain' }} />
                        <Text style={{ fontSize: 16, color: 'black', marginLeft: 3, marginRight: 13 }}>{data.shop_address}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default NearestGroceryShop;