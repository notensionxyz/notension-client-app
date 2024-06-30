import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Text, BackHandler, View, Pressable, ImageBackground } from "react-native";
import { Linking } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { useDispatch, useSelector } from 'react-redux';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { storageImageUrl } from '../../helpers/imageUrl';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useGrocery } from '../../hooks/fetch-data-by-module/useGrocery';
import { handleDashboardReducer } from '../../store/reducers/dashboardReducer';
import SearchField from '../../components/screens-components/Common/SearchField';
import { useUser } from '../../hooks/useUser';
import FindStore from '../../components/screens-components/Common/FindStore';
import { usePopularItem } from '../../hooks/fetch-data-by-module/usePopularItem';
import NotificationError from '../../components/popup-notification/NotificationError';
import { logoColor_1, logoColor_2 } from '../../helpers/Constants';
import QrCodeScannerBtn from '../../components/screens-components/Common/QrCodeScannerBtn';
import { QrCodeScanner } from '../../components/screens-components/Common/QrCodeScanner';

const screenWidth = Dimensions.get('window').width;
const cardMargin = 4;
const cardWidth = screenWidth - (cardMargin * 4.5);
const merchantType = 0;

function NearestGroceryShop(props) {
    const cameraPermission = Camera.getCameraPermissionStatus();
    const navigation = useNavigation();
    const [cameraPermissionStatus, setCameraPermissionStatus] = useState('not-determined')
    const [isPress, setIsPress] = useState(false);
    const [isFindPress, setIsFindPress] = useState(false);
    const [scanQRcode, setScanQRcode] = useState(false);
    const [nearestInfo, setNearestInfo] = useState([]);
    const [searchText, setSearchText] = useState('');
    const { getNearestGroceryStoreInfo, progressing, handleSearchStore, setCurrentModule } = useGrocery();
    const { resetUserCurrentLocation } = useUser();

    useFocusEffect(
        React.useCallback(() => {
            setCurrentModule();
            const onBackPress = () => {
                navigation.goBack();
                return true;
            };

            const subscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );

            return () => subscription.remove();
        }, [navigation])
    );

    useEffect(() => {
        if (cameraPermission !== 'granted') {
            requestCameraPermission();
        } else {
            setCameraPermissionStatus(cameraPermission)
        }
    }, []);

    useEffect(() => {
        setNearestInfo([]);
        if (searchText.length < 11) {
            setIsPress(false);
            setIsFindPress(false);
        }
    }, [searchText]);

    const requestCameraPermission = useCallback(async () => {
        console.log('Requesting camera permission...')
        const permission = await Camera.requestCameraPermission();
        console.log(`Camera permission status: ${permission}`)

        if (permission === 'denied') await Linking.openSettings();
        setCameraPermissionStatus(permission)
    }, []);

    const searchStore = (contact) => {
        handleSearchStore(contact, setNearestInfo);
        setScanQRcode(false);
        setIsPress(true);
    }

    //console.log('cameraPermissionStatus', cameraPermissionStatus);

    return (
        <>
            <ProgressStyle2 visible={progressing} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', }}>
                <HeaderCommon title="Grocery Store Info" toggleDrawer={props.navigation} />

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

                {searchText === '' && nearestInfo.length === 0 && !scanQRcode &&
                    <FindStore
                        resetUserLocation={resetUserCurrentLocation}
                        getNearestStoreInfo={getNearestGroceryStoreInfo}
                        setNearestInfo={setNearestInfo}
                        merchantType={merchantType}
                        setIsFindPress={setIsFindPress}
                    />
                }

                {searchText !== '' && nearestInfo.length === 0 && !scanQRcode && isPress && !progressing &&
                    <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', justifyContent: 'center' }}>
                        < View style={{ alignItems: 'center', width: screenWidth, justifyContent: 'center' }}>
                            <Image source={require('../../assets/banner/no-result-found.png')} style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }} />
                        </View>
                    </View >
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

            </View >
        </>
    );
}

function ListItem({ data }) {
    const { resetState } = usePopularItem();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const navigateToExploreShop = () => {
        resetState();
        if (!data?.is_closed) {
            navigation.navigate('ExploreGroceryShop');
            dispatch(
                handleDashboardReducer({
                    type: 'VISITED_STORE',
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
                <ImageBackground source={{ uri: storageImageUrl('grocery-store-docs', data.shop_banner_app) }}
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

export default NearestGroceryShop;