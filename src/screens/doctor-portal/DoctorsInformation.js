import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, FlatList, Pressable, ActivityIndicator, BackHandler } from 'react-native';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import SearchField from '../../components/screens-components/Common/SearchField';
import FooterCommon from '../../components/footer/FooterCommon';

import VerticalListView, { MemoizedVerticalListView } from '../../components/screens-components/HealthCare/DoctorsInfo/VerticalListView';
import { useDoctor } from '../../hooks/fetch-data-by-module/health-care/useDoctor';

const screenWidth = Dimensions.get('window').width;
const hight = (screenWidth / 3) - 7;
const width = (screenWidth / 3) - 5;
const screenHeight = Dimensions.get('window').height;

function DoctorsInformation({ route }) {
    const ref = useRef(null);
    const navigation = useNavigation();
    const options = route.params.options;
    const [visible, setVisible] = useState(true);
    const [doctorsInfo, setDoctorsInfo] = useState([]);
    //const dispatch = useDispatch();
    //const { productInfoByShop } = useSelector((state) => state.itemsByStoreReducer);
    const [searchText, setSearchText] = useState('');
    const [pageNo, setPageNo] = useState(1);

    const {
        showActivityIndicator,
        loadingMore,
        allLoaded,
        itemNotfound,
        progressing,
        setLoadingMore,
        getNearestDoctorsInfo,
        getDoctorsInfoByDistrict,
        getDoctorsInfoByCenter
    } = useDoctor();

    useEffect(() => {

        if (options?.searchProduct) {
            // resetLoadingStatus(true);
        }

        if (options?.findNearestDoctors) {
            getNearestDoctorsInfo(setDoctorsInfo);
        }

        if (options?.findDoctorsByDept) {
            getDoctorsInfoByDistrict(options?.deptId, setDoctorsInfo, pageNo, setPageNo);
        }

        if (options?.findDoctorsByCenter) {
            getDoctorsInfoByCenter(options?.centerId, options?.deptId, setDoctorsInfo, pageNo, setPageNo);
            setVisible(false);
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
            } else if (options?.findDoctorsByDept) {
                getDoctorsInfoByDistrict(options?.deptId, setDoctorsInfo, pageNo, setPageNo);
            } else if (options?.findDoctorsByCenter) {
                getDoctorsInfoByCenter(options?.centerId, options?.deptId, setDoctorsInfo, pageNo, setPageNo);
            }
        }, 500);
    }

    const getItemLayout = (data, index) => {
        return {
            length: width, offset: width * index, index
        }
    }

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
                        onEndReachedThreshold={1.5}
                        onEndReached={() => {
                            loadMoreResults();
                        }}
                        contentContainerStyle={{ padding: 5 }}
                        data={doctorsInfo}
                        // keyExtractor={(item, index) => index.toString()}
                        keyExtractor={item => item?._id}
                        renderItem={({ item, index }) =>
                            <VerticalListView data={item} showDept={true} showCenter={visible}/>}
                    />
                </View>
            </View>
        </>
    );
}

export default DoctorsInformation;