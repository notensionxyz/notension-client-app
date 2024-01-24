import { STORAGE_URL } from "./Constants";
import { Linking } from "react-native";
import call from 'react-native-phone-call';

export function storageImageUrl(path, filename) {
    return `${STORAGE_URL}/${path}/${filename}`;
}

export const openUrl = (url) => {
    Linking.canOpenURL(url).then(supported => {
        if (supported) {
            Linking.openURL(url);
        } else {
            alert('Can not open url ' + url);
            console.log("Don't know how to open URI: " + url);
        }
    });
};

export const COLORS = {
    primary: "#FF5678",
    black: "#171717",
    white: "#FFFFFF",
    background: "#FFFFFF"
}

export const makeCall = (phoneNumber) => {
    //console.log(phoneNumber);
    const args = {
        number: phoneNumber, // String value with the number to call
        prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
        skipCanOpen: true // Skip the canOpenURL check
    }
    call(args).catch(console.error)
};