
import React, { useRef, useEffect } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_PLACES_API_KEY } from '../../../helpers/Constants';
//import { Client } from "@googlemaps/google-maps-services-js";
navigator.geolocation = require('react-native-geolocation-service');
// navigator.geolocation = require('@react-native-community/geolocation');

const GooglePlacesInput = ({ updateState }) => {
    const ref = useRef();
    useEffect(() => {
        // ref.current?.setAddressText('Some Text');
        //ref.current?.
        //console.log('ref.current',ref.current?.getCurrentLocation());
        //geometry: { "location": { "lat": 22.3784678, "lng": 91.8473363 }
    }, []);

    return (
        <GooglePlacesAutocomplete
            //currentLocation={true}
            ref={ref}
            onPress={(data, details = null) => {
                const { lat, lng } = details?.geometry?.location;
                // 'details' is provided when fetchDetails = true
                updateState({
                    curLoc: { latitude: lat, longitude: lng },
                    isLocationFound: false,
                });
                setTimeout(() => {
                    updateState({
                        isLocationFound: true,
                    });
                    //console.log('After 1000',lng);
                }, 1000);
                //console.log(data);lng
            }}
            query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'en',
                components: 'country:bd',
            }}
            placeholder='Enter Location'
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            fetchDetails={true}
            onFail={error => console.log(error)}
            onNotFound={() => console.log('no results')}
            //currentLocationLabel='Current location'

            // styles={{
            //     container: {
            //         flex: 1,
            //     },
            //     textInputContainer: {
            //         flexDirection: 'row',
            //     },
            //     textInput: {
            //         backgroundColor: '#FFFFFF',
            //         height: 40,
            //         borderRadius: 5,
            //         paddingVertical: 5,
            //         paddingHorizontal: 10,
            //         fontSize: 15,
            //         flex: 1,
            //     },
            //     poweredContainer: {
            //         justifyContent: 'flex-end',
            //         alignItems: 'center',
            //         borderBottomRightRadius: 5,
            //         borderBottomLeftRadius: 5,
            //         borderColor: '#c8c7cc',
            //         borderTopWidth: 0.5,
            //     },
            //     powered: {},
            //     listView: {},
            //     row: {
            //         backgroundColor: '#FFFFFF',
            //         padding: 13,
            //         height: 44,
            //         flexDirection: 'row',
            //     },
            //     separator: {
            //         height: 0.6,
            //         backgroundColor: '#c8c7cc',
            //     },
            //     description: {},
            //     loader: {
            //         flexDirection: 'row',
            //         justifyContent: 'flex-end',
            //         height: 20,
            //     },
            // }}
        />
    );
};
///uYvm6_ZLMS4t8GdlG8NZZIhLfWk=
export default GooglePlacesInput;