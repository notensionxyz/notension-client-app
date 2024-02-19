import * as React from 'react'
import { useCallback, useRef, useState } from 'react'
import {StyleSheet, View } from 'react-native'
import { useCameraDevice, useCodeScanner } from 'react-native-vision-camera'
import { Camera } from 'react-native-vision-camera'
import { CONTENT_SPACING, CONTROL_BUTTON_SIZE, SAFE_AREA_PADDING, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../helpers/Constants'
import { useNavigation } from '@react-navigation/native';
import { StatusBarBlurBackground } from './StatusBarBlurBackground'


export const QrCodeScanner = ({ scanQRcode, searchText, setSearchText, searchStore }) => {

    const navigation = useNavigation();

    // 1. Use a simple default back camera
    const device = useCameraDevice('back');

    // 2. Only activate Camera when this component is currently opened
    
    let [isActive, setIsActive] = useState(scanQRcode);
    isActive = scanQRcode;

    // 4. On code scanned status
    const isScanned = useRef(false);

    const onCodeScanned = useCallback((codes) => {

        const value = codes[0]?.value;
        if (value == null) return
        //console.log(isScanned.current)
        if (isScanned.current) return
        isScanned.current = true
        if (searchText.length < 1 && isActive) {
            setIsActive(false);
            let contact = value?.slice(-11);
            setSearchText(contact);
            searchStore(contact);
        }
        console.log(value);
    }, [])

    // 5. Initialize the Code Scanner to scan QR codes and Barcodes
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: onCodeScanned,
    });

    //console.log('isActive',isActive);

    return (
        <View style={styles.container}>
            {device != null && (
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={isActive}
                    codeScanner={codeScanner}
                    enableZoomGesture={true}
                />
            )}

            {/* <StatusBarBlurBackground /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'black',
        alignItems: 'center',
        margin: 10,
    },
    button: {
        marginBottom: CONTENT_SPACING,
        width: CONTROL_BUTTON_SIZE,
        height: CONTROL_BUTTON_SIZE,
        borderRadius: CONTROL_BUTTON_SIZE / 2,
        backgroundColor: 'rgba(140, 140, 140, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightButtonRow: {
        position: 'absolute',
        right: SAFE_AREA_PADDING.paddingRight,
        top: SAFE_AREA_PADDING.paddingTop,
    },
    backButton: {
        position: 'absolute',
        left: SAFE_AREA_PADDING.paddingLeft,
        top: SAFE_AREA_PADDING.paddingTop,
    },
})