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

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

///Geolocation of Jatiya Sangsad Bhaban, Dhaka
const LATITUDE = 23.7624709;
const LONGITUDE = 90.3760062;
const LATITUDE_DELTA = 0.006;

function ConfirmLocation() {
    const navigation = useNavigation();
    const { defaultUserLocation, currentUserLocation, setCurrentLocation } = useSelector((state) => state.user);
    const mapRef = useRef();
    const [viewWidth, setViewWidth] = useState(screenWidth);
    const [viewHeight, setViewHeight] = useState(screenHeight);
    const [latDelta, setLatDelta] = useState(LATITUDE_DELTA);

    const MAP_WIDTH = viewWidth;
    const MAP_HEIGHT = viewHeight - 56;
    const ASPECT_RATIO = MAP_WIDTH / MAP_HEIGHT;
    const LONGITUDE_DELTA = latDelta * ASPECT_RATIO;

    const { saveSelectedInfo, saveCurrentInfo } = useUser();

    const { curLoc, isLocationFound, isPanding, setState, getGeoLocation } = useGeoLocation();

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    useEffect(() => {
        getGeoLocation();
    }, []);

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
        let userLocation = {
            userLatitude: curLoc?.latitude,
            userLongitude: curLoc?.longitude,
            districtId: defaultUserLocation?.districtId,
            districtName: defaultUserLocation?.districtName,
            districtAreaId: '00',
            districtAreaName: '',
            districtSubAreaId: '00',
            districtSubAreaName: '',
        };

        if (setCurrentLocation) {
            userLocation = {
                setCurrentLocation: false,
                userLatitude: curLoc?.latitude,
                userLongitude: curLoc?.longitude,
                districtId: currentUserLocation?.districtId,
                districtName: currentUserLocation?.districtName,
                districtAreaId: '00',
                districtAreaName: '',
                districtSubAreaId: '00',
                districtSubAreaName: '',
            };
            ///saveCurrentInfo(userLocation);
            //console.log('save as current', userLocation);
            saveSelectedInfo(userLocation);
            navigation.navigate('Dashboard');
        } else {
            //console.log('save as default', userLocation);
            saveSelectedInfo(userLocation);
        }
    };
    console.log('defaultUserLocation : ', defaultUserLocation);
    return (
        <>
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
                <>
                    <HeaderForLocation />
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        ref={mapRef}
                        style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}
                        maxZoomLevel={22}
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
                </>
            }
        </>
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
        zIndex: 1,
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
        zIndex: 2,
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