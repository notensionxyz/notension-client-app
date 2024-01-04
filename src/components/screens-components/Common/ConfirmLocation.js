import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Pressable, Text, TouchableOpacity, ScrollView, View, Image, Alert, Platform, PermissionsAndroid, ToastAndroid } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, AnimatedRegion, PROVIDER_GOOGLE } from 'react-native-maps';
import { debounce } from 'lodash';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
//import Geocoder from 'react-native-geocoding';
import HeaderForLocation from '../../header/HeaderForLocation';
import { useUserProfile } from '../../../hooks/user/profile';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

///Geolocation of Jatiya Sangsad Bhaban, Dhaka
const LATITUDE = 23.7624709;
const LONGITUDE = 90.3760062;
const LATITUDE_DELTA = 0.006;
// Initialize the module (needs to be done only once)
//Geocoder.init("AIzaSyA-hijY9IojfmjrHp643zqc0v2XfKA3Nt4"); // use a valid API key

function ConfirmLocation({ setInformation, setLocality, setSubAdminArea }) {
    const { districtName, userLatitude, userLongitude, isUserLocationAvailable } = useSelector(
        (state) => state.user
    );
    const mapRef = useRef();
    const [viewWidth, setViewWidth] = useState(screenWidth);
    const [viewHeight, setViewHeight] = useState(screenHeight);
    const [latDelta, setLatDelta] = useState(LATITUDE_DELTA);

    const MAP_WIDTH = viewWidth;
    const MAP_HEIGHT = viewHeight - 56;
    const ASPECT_RATIO = MAP_WIDTH / MAP_HEIGHT;
    const LONGITUDE_DELTA = latDelta * ASPECT_RATIO;
    const [visibleUserLocation, setVisibleUserLocation] = useState(true);
    const [state, setState] = useState({
        curLoc: {
            latitude: userLatitude,
            longitude: userLongitude,
        },
        isLocationFound: false,
        isPanding: false,
    })

    const { curLoc, isLocationFound, isPanding } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    useEffect(() => {
        getGeoLocation();
        // if (!isUserLocationAvailable) {
        //     getGeoLocation();
        // } else {
        //     updateState({
        //         isLocationFound: true,
        //     });
        // }
    }, []);

    const getGeoLocation = async () => {

        const hasPermission = await hasLocationPermission();
        //console.log(hasPermission);
        if (!hasPermission) {
            // then goto selec mannually
            return;
        }

        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                //console.log('current position', position.coords);
                updateState({
                    curLoc: { latitude, longitude },
                    isLocationFound: true,
                });
                //getAddress(latitude, longitude);
            },
            (error) => {
                // then goto selec mannually

                // See error code charts below.
                console.log(error.code, error.message);
            },
            {
                accuracy: {
                    android: 'high',
                    ios: 'best',
                },
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0,
                distanceFilter: 0,
                interval: 5000,
                fastestInterval: 2000,
                forceRequestLocation: true,
                forceLocationManager: false,
                showLocationDialog: true,
                useSignificantChanges: false,
            },
        );
    }

    const hasLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            const hasPermission = await hasPermissionIOS();
            return hasPermission;
        }

        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show(
                'Location permission denied by user.',
                ToastAndroid.LONG,
            );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show(
                'Location permission revoked by user.',
                ToastAndroid.LONG,
            );
        }

        return false;
    };

    const hasPermissionIOS = async () => {
        const openSetting = () => {
            Linking.openSettings().catch(() => {
                Alert.alert('Unable to open settings');
            });
        };
        const status = await Geolocation.requestAuthorization('whenInUse');

        if (status === 'granted') {
            return true;
        }

        if (status === 'denied') {
            Alert.alert('Location permission denied');
        }

        if (status === 'disabled') {
            Alert.alert(
                `Turn on Location Services to allow carePlus to determine your location.`,
                '',
                [
                    { text: 'Go to Settings', onPress: openSetting },
                    { text: "Don't Use Location", onPress: () => { } },
                ],
            );
        }

        return false;
    };

    const onChangeComplete = async (initialRegion) => {
        const { latitude, longitude } = initialRegion;
        setVisibleUserLocation(false);

        updateState({
            isPanding: false,
            curLoc: { latitude, longitude }
        })

        //getAddress(latitude, longitude);
    };

    const getAddress = (latitude, longitude) => {

        mapRef?.current?.addressForCoordinate({ latitude, longitude })
            .then((address) => {

                // Search by geo-location (reverse geo-code)
                // Geocoder.from(latitude, longitude)
                //     .then(json => {
                //         var addressComponent = json.results[0].address_components[0];
                //         console.log(addressComponent);
                //     })
                //     .catch(error => console.warn(error));

                const district = address.locality;

                if (districtName.toLowerCase().includes(district.toLowerCase())) {
                    console.log("str1 contains str2 (case-insensitive)");
                }
                else {
                    console.log("str1 not contains str2 (case-insensitive)");
                }
                setLocality(address.locality);
                setSubAdminArea(address.subAdministrativeArea);
                //console.log("address", address);
                //console.log("Country : ", address.country);
                //console.log("Country Code : ", address.countryCode);
                //console.log("District : ", address.locality);
                //console.log("District : ", address.subAdministrativeArea);

                //console.log("SubLocality : ", address.subLocality); /// Area Name or word Name
                //console.log("Like Name : ", address.subThoroughfare); /// Like House No
                //console.log("Road : ", address.thoroughfare); /// Road Name
                //console.log("Name : ", address.name); /// Like House No
            })
            .catch((err) => {
                console.log("Error From Get Address : ", err);
            });
    };

    const onPanDrag = debounce(() => {
        if (isPanding) {
            return;
        }
        updateState({
            isPanding: true
        })
    }, 10000, { leading: true, trailing: false });

    const [visible, setVisible] = useState(false);
    const [avatarVisible, setAvatarVisible] = useState(false);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setVisible(true)
    //     }, 2000)
    // }, []);

    const { saveUserCurrentGeolocation } = useUserProfile();

    const confirmRetailerLocation = () => {
        //console.log('pressed');
        saveUserCurrentGeolocation(curLoc);
    };

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