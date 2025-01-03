import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Text, BackHandler, View, Pressable, ImageBackground } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { storageImageUrl } from '../../helpers/imageUrl';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useNavigation } from '@react-navigation/native';
import { useMedicine } from '../../hooks/fetch-data-by-module/useMedicine';
import { handleDashboardReducer } from '../../store/reducers/dashboardReducer';
import { useUser } from '../../hooks/useUser';
import FindStore from '../../components/screens-components/Common/FindStore';
import SearchField from '../../components/screens-components/Common/SearchField';
import { usePopularItem } from '../../hooks/fetch-data-by-module/usePopularItem';
import NotificationError from '../../components/popup-notification/NotificationError';
import { logoColor_1, logoColor_2 } from '../../helpers/Constants';
import { Camera } from 'react-native-vision-camera';
import QrCodeScannerBtn from '../../components/screens-components/Common/QrCodeScannerBtn';
import { QrCodeScanner } from '../../components/screens-components/Common/QrCodeScanner';
import LocationInfo from '../../components/screens-components/Common/LocationInfo';

const screenWidth = Dimensions.get('window').width;
const cardMargin = 4;
const cardWidth = screenWidth - (cardMargin * 4.5);
const merchantType = 1;
let join_us_banner = require('../../assets/banner/join-us-seller.jpg');

function NearestMedicineShop(props) {
    const navigation = useNavigation();
    const cameraPermission = Camera.getCameraPermissionStatus();
    const isLoggedin = useSelector((state) => state.user.isLoggedin);
    const [cameraPermissionStatus, setCameraPermissionStatus] = useState('not-determined');
    const [scanQRcode, setScanQRcode] = useState(false);
    const [isPress, setIsPress] = useState(false);
    const [isFindPress, setIsFindPress] = useState(false);
    const [nearestInfo, setNearestInfo] = useState([]);
    const [searchText, setSearchText] = useState('');
    const { getNearestMedicineStoreInfo, progressing, handleSearchStore, setCurrentModule } = useMedicine();
    const { resetUserCurrentLocation } = useUser();

    useEffect(() => {
        setCurrentModule();
        if (cameraPermission !== 'granted') {
            requestCameraPermission();
        } else {
            setCameraPermissionStatus(cameraPermission)
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

    useEffect(() => {
        setNearestInfo([]);
        if (searchText.length < 11) {
            setIsPress(false);
            setIsFindPress(false);
        }
    }, [searchText]);

    const requestCameraPermission = useCallback(async () => {
        //console.log('Requesting camera permission...')
        const permission = await Camera.requestCameraPermission();
        //console.log(`Camera permission status: ${permission}`)

        if (permission === 'denied') await Linking.openSettings();
        setCameraPermissionStatus(permission)
    }, []);

    const searchStore = (contact) => {
        handleSearchStore(contact, setNearestInfo);
        setScanQRcode(false);
        setIsPress(true);
    }

    const checkIsLoggedinAndProcess = () => {
        navigation.navigate('RequestForRegistration');
    }

    return (
        <>
            <ProgressStyle2 visible={progressing} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                <HeaderCommon title="Medicine Store Info" toggleDrawer={props.navigation} />
                <LocationInfo />
                <Pressable
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} onPress={() => { checkIsLoggedinAndProcess(); }}>
                    <View style={{
                        height: ((screenWidth * 0.96) / 4.5),
                        width: screenWidth * 0.96,
                        borderRadius: 8,
                        justifyContent: 'center',
                        marginTop: 10,
                        marginBottom: 5,
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
                                source={join_us_banner}
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
                    onPress={() => { handleSearchStore(searchText, setNearestInfo); setIsPress(true); setScanQRcode(false); }}
                    placeholderText={'Search store using contact number'}
                    falseFocus={true}
                />

                <QrCodeScannerBtn onPress={() => { setScanQRcode(true); setSearchText(''); setIsPress(false); }} />

                {scanQRcode && !isPress && cameraPermissionStatus === 'granted' &&
                    <QrCodeScanner
                        scanQRcode={scanQRcode}
                        searchText={searchText}
                        setSearchText={setSearchText}
                        searchStore={searchStore} />
                }

                {searchText !== '' && nearestInfo.length === 0 && !scanQRcode && isPress && !progressing &&
                    <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', justifyContent: 'center' }}>
                        < View style={{ alignItems: 'center', width: screenWidth, justifyContent: 'center' }}>
                            <Image source={require('../../assets/banner/no-result-found.png')} style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }} />
                        </View>
                    </View >
                }

                {searchText === '' && nearestInfo.length === 0 && !scanQRcode &&
                    <FindStore
                        resetUserLocation={resetUserCurrentLocation}
                        getNearestStoreInfo={getNearestMedicineStoreInfo}
                        setNearestInfo={setNearestInfo}
                        merchantType={merchantType}
                        setIsFindPress={setIsFindPress}
                    />
                }

                {!scanQRcode &&
                    <FlatList
                        contentContainerStyle={{ padding: 5 }}
                        data={nearestInfo}
                        renderItem={({ item }) => <ListItem data={item} />}
                        keyExtractor={item => item._id}
                    />
                }

                {searchText === '' && nearestInfo.length === 0 && isFindPress && !progressing &&
                    <NotificationError visible={isFindPress} setVisible={setIsFindPress} message={'Shop not available in saved region!! Set Your Current Location'} />
                }

            </View>
        </>
    );
}

function ListItem({ data }) {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { resetState } = usePopularItem();
    const navigateToExploreShop = () => {
        resetState();
        if (!data?.is_closed) {
            navigation.navigate('ExploreMedicineShop');
            dispatch(
                handleDashboardReducer({
                    type: 'VISITED_MED_STORE',
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
                <ImageBackground source={{ uri: storageImageUrl('medicine-store-docs', data.shop_banner_app) }}
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
            </View >
        </Pressable >
    )
}

export default NearestMedicineShop;