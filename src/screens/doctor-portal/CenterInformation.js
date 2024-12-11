import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, FlatList, Pressable, ActivityIndicator, BackHandler } from 'react-native';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import SearchField from '../../components/screens-components/Common/SearchField';
import FastImage from 'react-native-fast-image';
import { useCenter } from '../../hooks/fetch-data-by-module/health-care/useCenter';
import { MemoizedVerticalListView } from '../../components/screens-components/HealthCare/ConsultationCenter/VerticalListView';
import { health_careImages } from '../../helpers/Constants';
import SliderMedium from '../../components/screens-components/Common/slider/slider-medium';
import { storageImageUrl } from '../../helpers/imageUrl';
import HeaderExploreService from '../../components/header/HeaderExploreService';
import LocationInfo from '../../components/screens-components/Common/LocationInfo';

const screenWidth = Dimensions.get('window').width;
const hight = (screenWidth / 3) - 7;
const width = (screenWidth / 3) - 5;
const screenHeight = Dimensions.get('window').height;

function CenterInformation({ route }) {
    const ref = useRef(null);
    const navigation = useNavigation();
    const option = route.params.options;
    const [slider, setSlider] = useState([]);
    const [centerBanner, setCenterBanner] = useState('');
    const [centerInfo, setCenterInfo] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [pageNo, setPageNo] = useState(1);

    const {
        showActivityIndicator,
        loadingMore,
        allLoaded,
        itemNotfound,
        progressing,
        banner,
        setLoadingMore,
        getCenterInfoByDistrict
    } = useCenter();

    useEffect(() => {
        getCenterInfoByDistrict(option?.centerType, setCenterInfo, pageNo, setPageNo);

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
        setSlider(banner?.slice(0, (banner.length - 1)));
        setCenterBanner(banner[banner.length - 1]);
    }, [banner]);

    const onPress = () => { handleSearch(searchText, 1, setPageNo); }

    const loadMoreResults = async () => {
        //console.log('loadingMore : ', loadingMore, 'allLoaded : ', allLoaded)
        // if already loading more, or all loaded, return
        if (loadingMore || allLoaded)
            return

        // set loading more (also updates footer text)
        setLoadingMore(true);

        setTimeout(() => {
            if (option.searchProduct) {
                //handleSearch(searchText, pageNo, setPageNo);
            } else {
                getCenterInfoByDistrict(option?.centerType, setCenterInfo, pageNo, setPageNo);
            }
        }, 500);
    }

    const findCenter = () => {
        const options = {
            searchCenter: false,
            findNearestCenter: true,
            findCenterByDistrict: false,
            centerType: option?.centerType,
            Title: `Nearest ${option?.centerType} Info`,
        };
        navigation.navigate('NearestCenterInfo', { options });
    };

    let nearest_pic = require('../../assets/banner/consultation_center.jpg');

    if (option?.centerType === "Hospital") {
        nearest_pic = require('../../assets/banner/hospital.jpg');
    }

    if (option?.centerType === "Diagnostic Centre") {
        nearest_pic = require('../../assets/banner/diagnostic_center.jpg');
    }

    return (
        <>
            <ProgressStyle2 visible={progressing} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', }}>
                {/* <HeaderCommon title={option.Title} /> */}
                <HeaderExploreService
                    Title='Search here.......'
                    centerType={option?.centerType} />
                {/* {options?.searchProduct &&
                    <SearchField searchText={searchText} setSearchText={setSearchText} onPress={onPress} />
                } */}
                <LocationInfo />
                {centerInfo.length > 0 &&
                    <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
                        <FlatList
                            ListHeaderComponent={
                                <>
                                    <SliderMedium data={slider} folder_name={health_careImages} />
                                    <Pressable
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }} onPress={() => { findCenter(); }}>
                                        <View style={{
                                            height: ((((screenWidth * 0.94) / 8) * 3)),
                                            width: screenWidth * 0.94,
                                            borderRadius: 8,
                                            justifyContent: 'center',
                                            marginBottom: 5,
                                            marginTop: 5
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
                                                    source={centerBanner?.file_name && centerBanner?.file_name !== '' && centerBanner?.file_name !== null ?
                                                        {
                                                            uri: storageImageUrl(health_careImages, centerBanner?.file_name)
                                                        }
                                                        :
                                                        nearest_pic
                                                    }
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
                                </>
                            }
                            ListFooterComponent={
                                <View>
                                    {!allLoaded &&
                                        <ActivityIndicator size='large' color="#111d5e" style={{ marginTop: pageNo === 1 ? screenHeight / 3 : 0 }} />
                                    }
                                    {itemNotfound &&
                                        <Text style={{ fontSize: 17, color: '#111d5e', alignSelf: 'flex-start', marginTop: 20, fontWeight: "bold" }}> No Doctor found </Text>
                                    }
                                </View>
                            }
                            initialNumToRender={20}
                            windowSize={6}
                            maxToRenderPerBatch={20}
                            updateCellsBatchingPeriod={20}
                            removeClippedSubviews={false}
                            scrollEventThrottle={200}
                            onEndReachedThreshold={1.4}
                            onEndReached={() => {
                                loadMoreResults();
                            }}
                            contentContainerStyle={{ padding: 5 }}
                            data={centerInfo}
                            // keyExtractor={(item, index) => index.toString()}
                            keyExtractor={item => item?._id}
                            renderItem={({ item, index }) =>
                                <MemoizedVerticalListView data={item} showDistance={false} />}
                        />
                    </View>
                }
            </View>
        </>
    );
}

export default CenterInformation;