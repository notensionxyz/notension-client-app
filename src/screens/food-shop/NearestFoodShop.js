import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Text, BackHandler, View, Pressable, ImageBackground } from "react-native";
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { storageImageUrl } from '../../helpers/imageUrl';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useNavigation } from '@react-navigation/native';
import { useFood } from '../../hooks/fetch-data-by-module/useFood';
import { useUser } from '../../hooks/useUser';
import SearchField from '../../components/screens-components/Common/SearchField';
import FindStore from '../../components/screens-components/Common/FindStore';
import { handleDashboardReducer } from '../../store/reducers/dashboardReducer';
import NotificationError from '../../components/popup-notification/NotificationError';
import { logoColor_1, logoColor_2 } from '../../helpers/Constants';

const screenWidth = Dimensions.get('window').width;
const cardMargin = 4;
const cardWidth = screenWidth - (cardMargin * 4.5);
const merchantType = 2;

function NearestFoodShop({ route }) {
    const data = route.params.data;
    const navigation = useNavigation();
    const [isPress, setIsPress] = useState(false);
    const [isFindPress, setIsFindPress] = useState(false);
    const [nearestInfo, setNearestInfo] = useState([]);
    const [searchText, setSearchText] = useState('');
    const { getNearestFoodStoreInfo, progressing, handleSearchStore, resetReducer } = useFood();
    const { resetUserCurrentLocation } = useUser();

    useEffect(() => {
        resetReducer();
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
        setNearestInfo([]);
        setIsPress(false);
    }, [searchText]);

    return (
        <>
            <ProgressStyle2 visible={progressing} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
                <HeaderCommon title={data?.store_category_name} toggleDrawer={navigation} />
                <View style={{
                    backgroundColor: '#FFF',
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{ flex: 1, paddingTop: 8, paddingBottom: 8 }}>
                        <Text style={{ color: '#006400', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>ষ্টোর নির্বাচন করুন</Text>
                    </View>
                </View>

                <SearchField
                    searchText={searchText}
                    setSearchText={setSearchText}
                    onPress={() => { handleSearchStore(searchText, setNearestInfo, data); setIsPress(true); }}
                    placeholderText={'Search shop using contact number'}
                    falseFocus={true}
                />

                {searchText !== '' && nearestInfo.length === 0 && isPress && !progressing &&
                    <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', justifyContent: 'center' }}>
                        < View style={{ alignItems: 'center', width: screenWidth, justifyContent: 'center' }}>
                            <Image source={require('../../assets/banner/no-result-found.png')} style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }} />
                        </View>
                    </View >
                }

                {searchText === '' && nearestInfo.length === 0 &&
                    <FindStore
                        resetUserLocation={resetUserCurrentLocation}
                        getNearestStoreInfo={() => { getNearestFoodStoreInfo(setNearestInfo, data); setIsFindPress(true); }}
                        setNearestInfo={setNearestInfo}
                        merchantType={merchantType}
                        setIsFindPress={setIsFindPress}
                    />
                }

                <FlatList
                    contentContainerStyle={{ padding: 5 }}
                    data={nearestInfo}
                    renderItem={({ item }) => <ListItem data={item} />}
                    keyExtractor={item => item._id}
                />

                {searchText === '' && nearestInfo.length === 0 && isFindPress && !progressing &&
                    <NotificationError visible={isFindPress} setVisible={setIsFindPress} message={'Shop not available in your region'} />
                }

            </View>
        </>
    );
}

function ListItem({ data }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const navigateToExploreShop = () => {
        if (!data?.is_closed) {
            navigation.navigate('FoodShopNavigation');
            dispatch(
                handleDashboardReducer({
                    type: 'VISITED_FOOD_STORE',
                    data: data,
                })
            );
        }
    }

    return (
        <Pressable onPress={() => { navigateToExploreShop(); }}>
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
                <ImageBackground source={{ uri: storageImageUrl('food-store-docs', data.shop_banner_app) }}
                    style={{
                        width: cardWidth,
                        height: (screenWidth / 2) - 2,
                        justifyContent: 'flex-end',
                        overflow: 'hidden',
                        padding: 10,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        shadowRadius: 5,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        //elevation: 13,
                    }} >
                    {parseFloat(data?.less) > 0 && data?.less_notice !== '' && !data?.is_closed &&
                        <View style={{ backgroundColor: logoColor_2, opacity: 0.7, position: 'absolute', paddingHorizontal: 15, paddingVertical: 4, borderRadius: 15, bottom: screenWidth / 2.6, marginLeft: 5 }}>
                            <Text style={{ fontSize: 13, color: 'white', marginLeft: 5 }}>{data?.less_notice}</Text>
                        </View>
                    }

                    {data?.delivery_notice && data?.delivery_notice !== '' && !data?.is_closed &&
                        <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ backgroundColor: logoColor_1, opacity: 0.9, paddingHorizontal: 15, paddingVertical: 4, borderRadius: 15 }}>
                                <Text style={{ fontSize: 13, color: 'white' }}>{data?.delivery_notice}</Text>
                            </View>
                        </View>
                    }

                    {data?.is_closed &&
                        <View style={{ width: '40%', backgroundColor: '#ff3d00', paddingHorizontal: 15, paddingVertical: 4, borderRadius: 15, alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Closed</Text>
                        </View>
                    }
                </ImageBackground>
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

export default NearestFoodShop;