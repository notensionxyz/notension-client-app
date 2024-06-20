import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, FlatList, Pressable, ActivityIndicator, BackHandler } from 'react-native';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import SearchField from '../../components/screens-components/Common/SearchField';
import FooterCommon from '../../components/footer/FooterCommon';

import { useCenter } from '../../hooks/fetch-data-by-module/health-care/useCenter';
import { MemoizedVerticalListView } from '../../components/screens-components/HealthCare/ConsultationCenter/VerticalListView';

const screenWidth = Dimensions.get('window').width;
const hight = (screenWidth / 3) - 7;
const width = (screenWidth / 3) - 5;
const screenHeight = Dimensions.get('window').height;

function CenterInformation({ route }) {
    const ref = useRef(null);
    const navigation = useNavigation();
    const options = route.params.options;
    const [centerInfo, setCenterInfo] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [pageNo, setPageNo] = useState(1);

    const {
        showActivityIndicator,
        loadingMore,
        allLoaded,
        itemNotfound,
        progressing,
        setLoadingMore,
        getCenterInfoByDistrict
    } = useCenter();

    useEffect(() => {
        getCenterInfoByDistrict(options?.centerType, setCenterInfo, pageNo, setPageNo);

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

    const onPress = () => { handleSearch(searchText, 1, setPageNo); }

    const loadMoreResults = async () => {
        //console.log('loadingMore : ', loadingMore, 'allLoaded : ', allLoaded)
        // if already loading more, or all loaded, return
        if (loadingMore || allLoaded)
            return

        // set loading more (also updates footer text)
        setLoadingMore(true);

        setTimeout(() => {
            if (options.searchProduct) {
                //handleSearch(searchText, pageNo, setPageNo);
            } else {
                getCenterInfoByDistrict(options?.centerType, setCenterInfo, pageNo, setPageNo);
            }
        }, 500);
    }

    const findCenter = React.useCallback(() => {
        const options = {
            searchCenter: false,
            findNearestCenter: true,
            findCenterByDistrict: false,
            centerType: 'ConsultationCenter',
            Title: 'Nearest Consultation Center',
        };
        //console.log('again - pressss');

        navigation.navigate('NearestCenterInfo', { options });
    }, []);

    const exploreCenter = React.useCallback((data) => {
        //console.log(data);

        navigation.navigate('ExploreConsultationCenter', { data });
    }, []);


    return (
        <>
            <ProgressStyle2 visible={progressing} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', }}>
                <HeaderCommon title={options.Title} />
                {/* {options?.searchProduct &&
                    <SearchField searchText={searchText} setSearchText={setSearchText} onPress={onPress} />
                } */}

                <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
                    <FlatList
                        ListHeaderComponent={
                            null
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
                            <MemoizedVerticalListView data={item} showDistance={options?.findNearestCenter} exploreCenter={exploreCenter} />}
                    />
                </View>
            </View>
        </>
    );
}

export default CenterInformation;