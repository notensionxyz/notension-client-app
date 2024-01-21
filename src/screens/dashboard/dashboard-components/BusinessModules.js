import React, { useState } from 'react';
import { Dimensions, StyleSheet, Pressable, View } from "react-native";
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { storageImageUrl } from "../../../helpers/imageUrl";
import NotificationSuccess from '../../../components/popup-notification/NotificationSuccess';

const screenWidth = Dimensions.get('window').width;

export default function BusinessModules({ data }) {
    const navigation = useNavigation();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [message, setMessage] = useState('Coming soon');
    const navigate = () => {
        setShowSuccessMessage(true);
    }
    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', marginBottom: 7 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => { navigation.navigate('NearestGroceryShop') }}>
                        <View style={{ height: ((screenWidth / 4) * 3) - 13, width: (screenWidth / 2) - 5, padding: 5, borderRadius: 10 }}>
                            <View style={{
                                justifyContent: 'space-between',
                                borderRadius: 10,
                                shadowRadius: 10,
                                elevation: 3,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3,
                                alignItems: 'center',
                                backgroundColor: 'white'
                            }}>
                                <FastImage
                                    source={{ uri: storageImageUrl('app-dashboard', data[0]?.file_name) }}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        justifyContent: 'flex-end',
                                        //padding: 10,
                                        borderRadius: 10,
                                        shadowRadius: 10,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        overflow: 'hidden'
                                    }} />

                            </View>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => { navigation.navigate('NearestMedicineShop') }}>
                        <View style={{ height: ((screenWidth / 4) * 3) - 13, width: (screenWidth / 2) - 5, padding: 5, borderRadius: 10 }}>
                            <View style={{
                                justifyContent: 'space-between',
                                borderRadius: 10,
                                shadowRadius: 10,
                                elevation: 3,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3,
                                backgroundColor: 'white'
                            }}>
                                <FastImage
                                    source={{ uri: storageImageUrl('app-dashboard', data[1]?.file_name) }}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        justifyContent: 'flex-end',
                                        //padding: 10,
                                        borderRadius: 10,
                                        shadowRadius: 10,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        overflow: 'hidden'
                                    }} />

                            </View>
                        </View>
                    </Pressable>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => { navigation.navigate('ExploreFoodModule') }}>
                        <View style={{ height: (screenWidth / 3) - 7, width: ((screenWidth / 3) * 2) - 8, padding: 5, borderRadius: 10 }}>
                            <View style={{
                                justifyContent: 'space-between',
                                borderRadius: 10,
                                shadowRadius: 10,
                                elevation: 3,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3,
                                backgroundColor: 'white'
                            }}>
                                <FastImage
                                    source={{ uri: storageImageUrl('app-dashboard', data[2]?.file_name) }}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={{
                                        height: (screenWidth / 3) - 9,
                                        width: ((screenWidth / 3) * 2) - 18,
                                        justifyContent: 'flex-end',
                                        //padding: 10,
                                        borderRadius: 10,
                                        shadowRadius: 10,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        overflow: 'hidden'
                                    }} />

                            </View>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => { navigate() }}>
                        <View style={{ height: (screenWidth / 3) - 7, width: (screenWidth / 3) - 2, padding: 5, borderRadius: 10 }}>
                            <View style={{
                                justifyContent: 'space-between',
                                borderRadius: 10,
                                shadowRadius: 10,
                                elevation: 3,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3,
                                backgroundColor: 'white'
                            }}>
                                <FastImage
                                    source={{ uri: storageImageUrl('app-dashboard', data[3]?.file_name) }}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={{
                                        height: (screenWidth / 3) - 9,
                                        width: (screenWidth / 3) - 9,
                                        justifyContent: 'flex-end',
                                        //padding: 10,
                                        borderRadius: 10,
                                        shadowRadius: 10,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        overflow: 'hidden'
                                    }} />

                            </View>
                        </View>
                    </Pressable>
                </View>
            </View >
            <NotificationSuccess visible={showSuccessMessage} setVisible={setShowSuccessMessage} message={message} />
        </>
    );
}

const styles = StyleSheet.create({
    imageBanner: {
        height: screenWidth / 2,
        width: screenWidth - 1,
        borderRadius: 2,
        marginHorizontal: 1
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});