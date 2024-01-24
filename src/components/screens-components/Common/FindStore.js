import React from 'react';
import { Dimensions, ScrollView, View, Pressable } from "react-native";
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
let cardMargin = 4;
let cardWidth = screenWidth - (cardMargin * 4.5);

function FindStore({ resetUserLocation, getNearestStoreInfo, setNearestInfo }) {
    const navigation = useNavigation();

    return (
        <ScrollView>
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', }}>

                <Pressable onPress={() => { navigation.navigate('FavouriteStore', { merchantType: 0 }); }}>
                    <View style={{
                        marginTop: 10,
                        backgroundColor: 'white',
                        width: cardWidth,
                        margin: cardMargin,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 10,
                        borderRadius: 10,
                        elevation: 3,
                    }} >
                        <FastImage source={require('../../../assets/banner/favourite-store.webp')}
                            style={{
                                width: "100%",
                                height: (screenWidth / 2) - 2,
                                justifyContent: 'flex-end',
                                padding: 10,
                                borderRadius: 10,
                                //shadowRadius: 10,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3,
                                overflow: 'hidden'
                            }} />
                    </View>
                </Pressable>
                <Pressable onPress={() => { resetUserLocation(); }}>
                    <View style={{
                        marginTop: 10,
                        backgroundColor: 'white',
                        width: cardWidth,
                        margin: cardMargin,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 10,
                        borderRadius: 10,
                        elevation: 3,
                    }} >
                        <FastImage source={require('../../../assets/banner/change-location.webp')}
                            style={{
                                width: "100%",
                                height: (screenWidth / 4) - 2,
                                justifyContent: 'flex-end',
                                padding: 10,
                                borderRadius: 10,
                                //shadowRadius: 10,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3,
                                overflow: 'hidden'
                            }} />
                    </View>
                </Pressable>
                <Pressable onPress={() => { getNearestStoreInfo(setNearestInfo, 1000); }}>
                    <View style={{
                        marginTop: 10,
                        backgroundColor: 'white',
                        width: cardWidth,
                        margin: cardMargin,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 10,
                        borderRadius: 10,
                        elevation: 3,
                    }} >
                        <FastImage source={require('../../../assets/banner/nearby-store.webp')}
                            style={{
                                width: "100%",
                                height: (screenWidth / 2) - 2,
                                justifyContent: 'flex-end',
                                padding: 10,
                                borderRadius: 10,
                                //shadowRadius: 10,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3,
                                overflow: 'hidden'
                            }} />
                    </View>
                </Pressable>
            </View>
        </ScrollView>
    );
}



export default FindStore;