import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Platform, PermissionsAndroid, ToastAndroid } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_PLACES_API_KEY } from '../helpers/Constants';
import axios from 'axios';
axios.defaults.withCredentials = true;
// Initialize the module (needs to be done only once)
Geocoder.init("AIzaSyAdznG_wpszIuufRum1dmkkucPAZtiL2V8"); // use a valid API key

export const useGeoLocation = () => {
    const mapRef = useRef();
    const [error, setError] = useState(false);
    const currentUserLocation = useSelector((state) => state.user.currentUserLocation);
    const [state, setState] = useState({
        curLoc: {
            latitude: currentUserLocation?.userLatitude || 23.7624709,
            longitude: currentUserLocation?.userLongitude || 90.3760062,
        },
        isLocationFound: false,
        isPanding: false,
        accessLocation:false
    })

    const { curLoc, isLocationFound, accessLocation,isPanding } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const getGeoLocation = async () => {

        const hasPermission = await hasLocationPermission();
        //console.log('hasPermission', hasPermission);

        if (!hasPermission) {
            // then goto selec mannually
            return;
        }

        updateState({
            accessLocation: hasPermission,
        });

        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                //console.log('Starting Current Position', position.coords);
                updateState({
                    curLoc: { latitude, longitude },
                    isLocationFound: true,
                });
                //getAddress(latitude, longitude);
                //getAddressFromCoordinates(latitude, longitude);
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
                console.log(responseJson?.results?.[0]?.address_components);
                //console.log(responseJson?.results);
            })
            .catch(error => {
                console.log(error);
            });

    }

    const getAddress = (latitude, longitude) => {
        // https://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838&key=YOUR_API_KEY

        // Axios
        //     .get(`${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}`)
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(error => {

        //         console.log('Error : ', error.response.status)
        //     })
        // Geocoder.from(latitude, longitude)
        // .then(json => {
        //     var addressComponent = json.results[0].address_components[0];
        //     console.log(addressComponent);
        // })
        // .catch(error => console.warn(error));
        // mapRef?.current?.addressForCoordinate({ latitude, longitude })
        //     .then((address) => {

        //         // Search by geo-location (reverse geo-code)
        //         Geocoder.from(latitude, longitude)
        //             .then(json => {
        //                 var addressComponent = json.results[0].address_components[0];
        //                 console.log(addressComponent);
        //             })
        //             .catch(error => console.warn(error));

        //        //const district = address.locality;

        //         // if (districtName.toLowerCase().includes(district.toLowerCase())) {
        //         //     console.log("str1 contains str2 (case-insensitive)");
        //         // }
        //         // else {
        //         //     console.log("str1 not contains str2 (case-insensitive)");
        //         // }
        //        // setLocality(address.locality);
        //         //setSubAdminArea(address.subAdministrativeArea);

        //         console.log("address", address);
        //         //console.log("Country : ", address.country);
        //         //console.log("Country Code : ", address.countryCode);
        //         //console.log("District : ", address.locality);
        //         //console.log("District : ", address.subAdministrativeArea);

        //         //console.log("SubLocality : ", address.subLocality); /// Area Name or word Name
        //         //console.log("Like Name : ", address.subThoroughfare); /// Like House No
        //         //console.log("Road : ", address.thoroughfare); /// Road Name
        //         //console.log("Name : ", address.name); /// Like House No
        //     })
        //     .catch((err) => {
        //         console.log("Error From Get Address : ", err);
        //     });
    };

    useEffect(() => {

        //if (error) logout()
    }, [error])

    return {
        curLoc,
        isLocationFound,
        accessLocation,
        isPanding,
        state,
        setState,
        getGeoLocation
    }
}
