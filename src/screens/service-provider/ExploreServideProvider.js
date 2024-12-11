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
import { health_careImages, service_bannerImages } from '../../helpers/Constants';
import SliderMedium from '../../components/screens-components/Common/slider/slider-medium';
import { storageImageUrl } from '../../helpers/imageUrl';
import HeaderExploreService from '../../components/header/HeaderExploreService';
import LocationInfo from '../../components/screens-components/Common/LocationInfo';
import { useAllCareService } from '../../hooks/fetch-data-by-module/service-provider/useAllCareService';

const screenWidth = Dimensions.get('window').width;


const viewWidth = ((screenWidth / 8) * 6);
const viewHeight = ((screenWidth / 8) * 4) - 2;

function ExploreServideProvider({ route }) {
    const ref = useRef(null);
    const navigation = useNavigation();
    const option = route.params.options;
    const [slider, setSlider] = useState([]);
    const [centerBanner, setCenterBanner] = useState('');
    const [centerInfo, setCenterInfo] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [pageNo, setPageNo] = useState(1);

    const {
        progressing,
        banner,
        exploreCareProvider
    } = useAllCareService();

    console.log(option?.sliderInfo);

    useEffect(() => {
        //exploreCareProvider(option?.centerType, setCenterInfo, pageNo, setPageNo);

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

    return (
        <>
            <ProgressStyle2 visible={progressing} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', }}>
                <HeaderCommon title={option.Title} />
                <LocationInfo />
                <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
                    <FlatList
                        ListHeaderComponent={
                            <SliderMedium data={option?.sliderInfo} folder_name={service_bannerImages} />
                        }
                        ListFooterComponent={
                            null
                        }
                    />
                </View>
            </View>
        </>
    );
}

function ItemImage({ data }) {
    return (
        <View style={{ padding: 5 }}>
            <View style={{
                height: viewHeight - 1,
                width: viewWidth - 4,
                justifyContent: 'space-between',
                borderRadius: 8,
                shadowRadius: 8,
                elevation: 3,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                backgroundColor: 'white'
            }}>
                <FastImage
                    source={{ uri: storageImageUrl(service_bannerImages, data.file_name) }}
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
    );
}

export default ExploreServideProvider;