import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, FlatList, Pressable, ActivityIndicator, BackHandler } from 'react-native';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { useCenter } from '../../hooks/fetch-data-by-module/health-care/useCenter';
import { MemoizedVerticalListView } from '../../components/screens-components/HealthCare/ConsultationCenter/VerticalListView';
import SearchField from '../../components/screens-components/Common/SearchField';
import QrCodeScannerBtn from '../../components/screens-components/Common/QrCodeScannerBtn';
import { QrCodeScanner } from '../../components/screens-components/Common/QrCodeScanner';
import { Camera } from 'react-native-vision-camera';
import LocationInfo from '../../components/screens-components/Common/LocationInfo';

const screenWidth = Dimensions.get('window').width;
const hight = (screenWidth / 3) - 7;
const width = (screenWidth / 3) - 5;
const screenHeight = Dimensions.get('window').height;

function NearestCenterInfo({ route }) {
    const ref = useRef(null);
    const navigation = useNavigation();
    const options = route.params.options;
    const [centerInfo, setCenterInfo] = useState([]);
    const cameraPermission = Camera.getCameraPermissionStatus();
    const [cameraPermissionStatus, setCameraPermissionStatus] = useState('not-determined')
    const [isPress, setIsPress] = useState(false);
    const [isFindPress, setIsFindPress] = useState(false);
    const [scanQRcode, setScanQRcode] = useState(false);
    const [searchText, setSearchText] = useState('');
    const {
        progressing,
        getNearestCenterInfo,
        searchConsultationCenter
    } = useCenter();

    useEffect(() => {
        if (options?.findNearestCenter) {
            getNearestCenterInfo(options?.centerType, setCenterInfo);
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
        if (cameraPermission !== 'granted') {
            requestCameraPermission();
        } else {
            setCameraPermissionStatus(cameraPermission)
        }
    }, []);

    useEffect(() => {
        setCenterInfo([]);
        if (searchText.length > 0) {
            setIsPress(false);
            setIsFindPress(false);
            setScanQRcode(false);
        }
    }, [searchText]);

    const requestCameraPermission = useCallback(async () => {
        console.log('Requesting camera permission...')
        const permission = await Camera.requestCameraPermission();
        console.log(`Camera permission status: ${permission}`)

        if (permission === 'denied') await Linking.openSettings();
        setCameraPermissionStatus(permission)
    }, []);

    const searchStore = (text) => {
        searchConsultationCenter(options?.centerType, text, setCenterInfo);
        setScanQRcode(false);
        setIsPress(true);
    }

    return (
        <>
            <ProgressStyle2 visible={progressing} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', }}>
                <HeaderCommon title={options.Title} />
                <LocationInfo />
                {!options?.findNearestCenter &&
                    <>
                        <SearchField
                            searchText={searchText}
                            setSearchText={setSearchText}
                            onPress={() => { searchConsultationCenter(options?.centerType, searchText, setCenterInfo); setIsPress(true); }}
                            placeholderText={`Write Here .........`}
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
                    </>
                }

                <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
                    <FlatList
                        contentContainerStyle={{ padding: 5 }}
                        data={centerInfo}
                        keyExtractor={item => item?._id}
                        renderItem={({ item, index }) =>
                            <MemoizedVerticalListView data={item} showDistance={options?.findNearestCenter} />}
                    />
                </View>
            </View>
        </>
    );
}

export default NearestCenterInfo;