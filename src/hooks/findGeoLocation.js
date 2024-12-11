import { useEffect, useRef, useState } from 'react'

import { Alert, Platform, PermissionsAndroid, ToastAndroid, Linking } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
axios.defaults.withCredentials = true;
// Initialize the module (needs to be done only once)
//Geocoder.init("AIzaSyAdznG_wpszIuufRum1dmkkucPAZtiL2V8"); // use a valid API key

export const useGeoLocation = () => {
    const mapRef = useRef();
    const [error, setError] = useState(false);

    //const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const getGeoLocation = async (setState) => {

        const hasPermission = await hasLocationPermission();

        if (!hasPermission) {
            // then goto selec mannually
            await Linking.openSettings();
            return;
        }

        setState((state) => ({
            ...state,
            ...{ accessLocation: hasPermission }
        }));

        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                //console.log('Starting Current Position', position.coords);    

                setState((state) => ({
                    ...state,
                    ...{ curLoc: { latitude, longitude }, isLocationFound: true }
                }));
            },
            (error) => {
                // then goto selec mannually
                // See error code charts below.
                console.log(error.code, error.message);
                getWifiGeoLocation(setState);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
                // distanceFilter: 0,
                // interval: 5000,
                // fastestInterval: 2000,
                // forceRequestLocation: true,
                // forceLocationManager: false,
                // showLocationDialog: true,
                // useSignificantChanges: false,
            },
        );
    };

    const getWifiGeoLocation = async (setState) => {
        //console.log('hasPermission');

        const hasPermission = await hasLocationPermission();

        if (!hasPermission) {
            // then goto selec mannually
            await Linking.openSettings();
            return;
        }

        setState((state) => ({
            ...state,
            ...{ accessLocation: hasPermission }
        }));

        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                //console.log('Starting Current Position', position.coords);    

                setState((state) => ({
                    ...state,
                    ...{ curLoc: { latitude, longitude }, isLocationFound: true }
                }));
            },
            (error) => {
                // then goto selec mannually
                // See error code charts below.
                console.log(error.code, error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 7000,
                maximumAge: 0,
                // distanceFilter: 0,
                // interval: 5000,
                // fastestInterval: 2000,
                // forceRequestLocation: true,
                // forceLocationManager: false,
                // showLocationDialog: true,
                // useSignificantChanges: false,
            },
        );
    };

    const getPermission = async (setState) => {

        const hasPermission = await hasLocationPermission();
        //console.log('hasPermission', hasPermission);

        if (!hasPermission) {
            // then goto selec mannually
            await Linking.openSettings();
            return;
        }

        setState((state) => ({
            ...state,
            ...{ accessLocation: hasPermission }
        }));
    };

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

    useEffect(() => {
        //if (error) logout()
    }, [error]);

    return {
        getPermission,
        getGeoLocation
    }
}
