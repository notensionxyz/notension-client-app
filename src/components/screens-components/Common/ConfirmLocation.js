import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Pressable, Text, TouchableOpacity, ScrollView, View, Image, Alert, Platform, PermissionsAndroid, ToastAndroid } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, AnimatedRegion, PROVIDER_GOOGLE } from 'react-native-maps';
import { debounce } from 'lodash';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import HeaderForLocation from '../../header/HeaderForLocation';
import { useGeoLocation } from '../../../hooks/findGeoLocation';
import { useUser } from '../../../hooks/useUser';
import { useNavigation } from '@react-navigation/native';
import GooglePlacesInput from './GooglePlacesAutocomplete';
import { GOOGLE_PLACES_API_KEY } from '../../../helpers/Constants';
import { useGlobal } from '../../../hooks/global';
import ProgressStyle2 from '../../progress-animation/ProgressStyle2';
//import { Client } from "@googlemaps/google-maps-services-js";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

///Geolocation of Jatiya Sangsad Bhaban, Dhaka
const LATITUDE = 23.7624709;
const LONGITUDE = 90.3760062;
const LATITUDE_DELTA = 0.006;

function ConfirmLocation() {

    const navigation = useNavigation();
    const { districtInfo, defaultUserLocation, currentUserLocation, setCurrentLocation } = useSelector((state) => state.user);
    const mapRef = useRef();
    const [viewWidth, setViewWidth] = useState(screenWidth);
    const [viewHeight, setViewHeight] = useState(screenHeight);
    const [latDelta, setLatDelta] = useState(LATITUDE_DELTA);

    const MAP_WIDTH = viewWidth;
    const MAP_HEIGHT = viewHeight;
    const ASPECT_RATIO = MAP_WIDTH / MAP_HEIGHT;
    const LONGITUDE_DELTA = latDelta * ASPECT_RATIO;

    const { saveSelectedInfo, saveCurrentInfo } = useUser();
    const { getDistrictInfo, progressing } = useGlobal();

    const { curLoc, isLocationFound, accessLocation, isPanding, setState, getGeoLocation } = useGeoLocation();

    //const updateState = (data) => setState((state) => ({ ...state, ...data }));
    const updateState = (data) => {
        //console.log('data : ', data);
        setState((state) => ({ ...state, ...data }));
    }

    useEffect(() => {
        console.log('Now Here');
        if (districtInfo?.length < 1) {
            //console.log('Now Here');
            getDistrictInfo();
        }
        getGeoLocation();
    }, [accessLocation]);

    const onChangeComplete = async (initialRegion) => {
        const { latitude, longitude } = initialRegion;

        updateState({
            isPanding: false,
            curLoc: { latitude, longitude }
        })
    };

    const onPanDrag = debounce(() => {
        if (isPanding) {
            return;
        }
        updateState({
            isPanding: true
        })
    }, 10000, { leading: true, trailing: false });

    const [avatarVisible, setAvatarVisible] = useState(false);

    const confirmRetailerLocation = () => {

        getAddressFromCoordinates(curLoc?.latitude, curLoc?.longitude);

        // let userLocation = {
        //     userLatitude: curLoc?.latitude,
        //     userLongitude: curLoc?.longitude,
        //     districtId: defaultUserLocation?.districtId,
        //     districtName: defaultUserLocation?.districtName,
        //     districtAreaId: '00',
        //     districtAreaName: '',
        //     districtSubAreaId: '00',
        //     districtSubAreaName: '',
        // };

        // if (setCurrentLocation) {
        //     userLocation = {
        //         setCurrentLocation: false,
        //         userLatitude: curLoc?.latitude,
        //         userLongitude: curLoc?.longitude,
        //         districtId: currentUserLocation?.districtId,
        //         districtName: currentUserLocation?.districtName,
        //         districtAreaId: '00',
        //         districtAreaName: '',
        //         districtSubAreaId: '00',
        //         districtSubAreaName: '',
        //         formatted_address: ''
        //     };
        //     ///saveCurrentInfo(userLocation);
        //     //console.log('save as current', userLocation);
        //     saveSelectedInfo(userLocation);
        //     navigation.navigate('Dashboard');
        // } else {
        //     //console.log('save as default', userLocation);
        //     saveSelectedInfo(userLocation);
        // }
    };

    const getAddressFromCoordinates = (latitude, longitude) => {
        fetch(
            'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
            latitude +
            ',' +
            longitude +
            '&key=' +
            GOOGLE_PLACES_API_KEY,
        )
            .then(response => response.json())
            .then(responseJson => {
                const administrative_area_level_2 = responseJson?.results?.[0]?.address_components?.slice(-3)[0]?.long_name;
                const formatted_address = responseJson?.results?.[0]?.formatted_address;
                //console.log(responseJson?.results);
                //console.log(responseJson?.results?.[0]?.formatted_address);
                saveRetailerLocation(administrative_area_level_2, formatted_address);
            })
            .catch(error => {
                console.log(error);
            });

    }

    const saveRetailerLocation = (administrative_area_level_2, formatted_address) => {
        let searchInfo = districtInfo.filter(
            (info) =>
                info.district_name
                    .toLowerCase()
                    .includes(administrative_area_level_2.trim().split(' ')[0].toLowerCase()) ||
                info.district_name.match(new RegExp(administrative_area_level_2.trim().split(' ')[0], 'ui')) // Case-insensitive, Unicode search
        );

        //console.log(searchInfo[0]);

        let userLocation = {
            setCurrentLocation: false,
            userLatitude: curLoc?.latitude,
            userLongitude: curLoc?.longitude,
            districtId: searchInfo[0]?._id,
            districtName: searchInfo[0]?.district_name,
            districtAreaId: '00',
            districtAreaName: '',
            districtSubAreaId: '00',
            districtSubAreaName: '',
            formatted_address: formatted_address
        };

        saveSelectedInfo(userLocation);
        navigation.navigate('Dashboard');
    };

    //console.log('defaultUserLocation : ', defaultUserLocation);
    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <ProgressStyle2 visible={progressing} />
            <HeaderForLocation updateState={updateState} />
            {!isLocationFound ?
                <ScrollView style={styles.container} contentInset={{ bottom: 250 }}>
                    <ShimmerPlaceholder
                        width={screenWidth}
                        height={screenWidth}
                        //shimmerStyle={{ borderRadius: 100 }}
                        visible={avatarVisible}
                    />
                </ScrollView>
                :
                <View>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        ref={mapRef}
                        style={{ zIndex: -15, width: MAP_WIDTH, height: MAP_HEIGHT }}
                        //maxZoomLevel={22}
                        //showsUserLocation={true}
                        //followUserLocation={true}
                        initialRegion={{
                            ...curLoc,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }}
                        //loadingEnabled={true}
                        onPanDrag={onPanDrag}
                        onRegionChangeComplete={onChangeComplete}
                    />

                    {isPanding ?
                        <View
                            style={[styles.markerFixedLong, isPanding ? styles.isPanding : null]}
                            pointerEvents="none"
                        >
                            <Image style={styles.markerLong} resizeMode="contain" source={require('../../../assets/icon/pink-flag-long.png')} />
                        </View>
                        :
                        <View
                            style={[styles.markerFixed, isPanding ? styles.isPanding : null]}
                            pointerEvents="none"
                        >
                            <Image style={styles.marker} resizeMode="contain" source={require('../../../assets/icon/pink-flag.png')} />
                        </View>
                    }

                    <Pressable onPress={() => { confirmRetailerLocation(); }}
                        style={{
                            zIndex: -3,
                            position: 'absolute',
                            bottom: 30,
                            left: 40,
                            right: 40,
                            flexDirection: 'row',
                            paddingVertical: 5,
                            justifyContent: 'center',
                            borderRadius: 5,
                            shadowRadius: 5,
                            alignItems: 'center',
                            elevation: 3,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            backgroundColor: '#ff9800'
                        }}>

                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center', padding: 5 }}>Confirm Location</Text>

                    </Pressable>
                </View>
            }
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        position: 'relative',
    },
    mapWrapper: {
        flex: 1,
        height: 400,
        overflow: 'hidden',
    },
    map: {
        flex: 1,
    },
    marker: {
        height: 48,
        width: 48,
    },
    markerFixed: {
        left: '47%',
        marginLeft: -28,
        marginTop: -48,
        position: 'absolute',
        top: '52%',
        zIndex: -1,
        height: 48,
        width: 48,
    },
    markerLong: {
        height: 48,
        width: 48,
    },
    markerFixedLong: {
        left: '47%',
        marginLeft: -22,
        marginTop: -48,
        position: 'absolute',
        top: '52%',
        zIndex: -2,
        height: 48,
        width: 48,
    },
    isPanding: {
        marginTop: -48,
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 16,
        marginTop: 60,
    },
    title: {
        fontSize: 20,
        marginBottom: 12,
        fontWeight: "600",
        textAlign: "center",
    },
    sessionTitle: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 6,
        fontWeight: "600"
    },

    saveBtn: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: '#ff5722',
        marginTop: 55,
        shadowOpacity: 0.3,
        marginBottom: 45
    }
});


export default ConfirmLocation;