import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, FlatList, Pressable, Image, BackHandler } from 'react-native';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import FastImage from 'react-native-fast-image';
import {logoColor_2, service_bannerImages, service_providerImages } from '../../helpers/Constants';
import SliderMedium from '../../components/screens-components/Common/slider/slider-medium';
import { storageImageUrl } from '../../helpers/imageUrl';
import LocationInfo from '../../components/screens-components/Common/LocationInfo';
import { useAllCareService } from '../../hooks/fetch-data-by-module/service-provider/useAllCareService';

const screenWidth = Dimensions.get('window').width;
let cardMargin = 4;
let cardWidth = screenWidth - (cardMargin * 4);
const viewWidth = ((screenWidth / 8) * 6);
const viewHeight = ((screenWidth / 8) * 4) - 2;

function ExploreServideProvider({ route }) {
    const ref = useRef(null);
    const navigation = useNavigation();
    const option = route.params.options;
    const [slider, setSlider] = useState([]);
    const [popularInfo, setPopularInfo] = useState([]);
    const [nearestInfo, setNearestInfo] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [pageNo, setPageNo] = useState(1);

    const {
        progressing,
        banner,
        exploreCareProvider
    } = useAllCareService();

    //console.log(option);

    useEffect(() => {
        exploreCareProvider(option?.serviceId, setPopularInfo, setNearestInfo, pageNo);

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
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', }}>
                <HeaderCommon title={option.Title} />
                <LocationInfo />
                <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
                    <FlatList
                        ListHeaderComponent={
                            <>
                                <SliderMedium data={option?.sliderInfo} folder_name={service_bannerImages} />
                                {popularInfo?.length > 0 &&
                                    <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', width: '100%' }}>
                                            <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>Popular Information</Text>
                                        </View>
                                        <FlatList
                                            contentContainerStyle={{ padding: 5 }}
                                            horizontal
                                            data={popularInfo?.slice(0, 4)}
                                            renderItem={({ item }) => <PopularInfo data={item} />}
                                            keyExtractor={item => item._id}
                                        />
                                    </View>
                                }
                            </>
                        }
                        ListFooterComponent={
                            <>
                                {nearestInfo?.length > 0 ?
                                    <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', backgroundColor: logoColor_2, width: '100%' }}>
                                            <Text style={{ flex: 1, color: 'white', paddingVertical: 10, fontSize: 18, textAlign: 'center' }}>Nearest Information</Text>
                                        </View>
                                        <FlatList
                                            contentContainerStyle={{ padding: 5 }}
                                            data={nearestInfo}
                                            renderItem={({ item }) => <ListItem data={item} />}
                                            keyExtractor={item => item._id}
                                        />
                                    </View>
                                    :
                                    null}
                            </>
                        }

                    />
                </View>
            </View>
        </>
    );
}

function PopularInfo({ data }) {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => { navigation.navigate('ServiceProviderDetails', { data }); }}>
            <View style={{ padding: 5 }}>
                <View style={{
                    height: (cardWidth * 0.86) / 2,
                    width: cardWidth * 0.86,
                    justifyContent: 'space-between',
                    borderRadius: 8,
                    shadowRadius: 8,
                    elevation: 3,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    backgroundColor: 'white'
                }}>
                    <FastImage
                        source={{ uri: storageImageUrl(service_providerImages, data?.provider_banner_app) }}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            height: '100%',
                            width: '100%',
                            justifyContent: 'flex-end',
                            padding: 10,
                            borderRadius: 8,
                            shadowRadius: 8,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            overflow: 'hidden'
                        }} />

                </View>
            </View>
        </Pressable >
    );
}

function ListItem({ data }) {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => { navigation.navigate('ServiceProviderDetails', { data }); }}>
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
                <FastImage source={{ uri: storageImageUrl(service_providerImages, data?.provider_banner_app) }}
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
                        {data?.provider_name}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Image source={require('../../assets/icon/ic_place_blue.png')}
                            style={{ width: 25, height: 25, tintColor: 'blue', resizeMode: 'contain' }} />
                        <Text style={{ fontSize: 16, color: '#006400', marginLeft: 3, marginRight: 13, textAlign: 'justify' }}>{data?.address}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

export default ExploreServideProvider;