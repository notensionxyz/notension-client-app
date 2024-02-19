import * as React from 'react'
import { useCallback, useRef, useState } from 'react'
import { Alert, AlertButton, Image, Linking, Pressable, StyleSheet, View } from 'react-native'
import { Code, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera'
import { Camera } from 'react-native-vision-camera'
import { CONTENT_SPACING, CONTROL_BUTTON_SIZE, SAFE_AREA_PADDING, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../helpers/Constants'
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/core'
import { StatusBarBlurBackground } from './StatusBarBlurBackground'
import { useIsForeground } from '../../../helpers/useIsForeground'

//type Props = NativeStackScreenProps<Routes, 'CodeScannerPage'> { navigation }: Props

type Props = {
    searchText: string;
    setSearchText: (val: string) => void;
    //searchStore: () => void;
    searchStore: (contact: string) => void;
};

export const CodeScanner: React.FC<Props> = ({ searchText, setSearchText, searchStore }) => {

    const navigation = useNavigation();

    // 1. Use a simple default back camera
    const device = useCameraDevice('back');

    // 2. Only activate Camera when the app is focused and this screen is currently opened
    const isFocused = useIsFocused()
    const isForeground = useIsForeground()
    const isActive = isFocused && isForeground

    // 3. (Optional) enable a torch setting
    const [torch, setTorch] = useState(false)

    // 4. On code scanned, Find Shop
    const isScanned = useRef(false);

    const onCodeScanned = useCallback((codes: Code[]) => {

        const value = codes[0]?.value
        if (value == null) return


        if (isScanned.current) return

        if (searchText.length < 1) {
            findShop(value, () => {
                isScanned.current = false
            })
        }

        isScanned.current = true
    }, [])

    const findShop = (value: string, callback: () => void): void => {
        let contact: string = value?.slice(-11);
        console.log(`Scanned codes:`, contact);
        setSearchText(contact);
        searchStore(contact);
        callback(); // Execute the callback function
    };

    // 5. Initialize the Code Scanner to scan QR codes and Barcodes
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: onCodeScanned,

    });

    console.log('isActive',isActive);


    return (
        <View style={styles.container}>
            {device != null && (
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={isActive}
                    codeScanner={codeScanner}
                    torch={torch ? 'on' : 'off'}
                    enableZoomGesture={true}
                />
            )}

            <StatusBarBlurBackground />

            <View style={styles.rightButtonRow}>
                <Pressable style={styles.button} onPress={() => setTorch(!torch)} disabledOpacity={0.4}>
                    {/* <IonIcon name={torch ? 'flash' : 'flash-off'} color="white" size={24} /> */}
                    <Image source={require('../../../assets/icon/ic_arrow_back.png')}
                        style={{ height: 25, width: 25, resizeMode: 'contain', tintColor: "white" }} />
                </Pressable>
            </View>

            {/* Back Button */}
            <Pressable style={styles.backButton} onPress={navigation.goBack}>
                <Image source={require('../../../assets/icon/ic_arrow_back.png')}
                    style={{ height: 25, width: 25, resizeMode: 'contain', tintColor: "white" }} />

            </Pressable>
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