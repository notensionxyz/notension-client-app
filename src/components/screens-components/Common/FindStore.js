import React from 'react';
import { Dimensions, View, Pressable } from "react-native";
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';
import FavouriteStore from './FavouriteStore';
import { ScrollView } from 'react-native-virtualized-view';

const screenWidth = Dimensions.get('window').width;
let cardMargin = 4;
let cardWidth = screenWidth - (cardMargin * 4.5);

function FindStore({ resetUserLocation, getNearestStoreInfo, setNearestInfo, merchantType, setIsFindPress }) {
    const navigation = useNavigation();
    //console.log('merchantType : ', merchantType);
    return (
        <ScrollView>
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', }}>
                <Pressable onPress={() => { getNearestStoreInfo(setNearestInfo, 1000); setIsFindPress(true); }}>
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
                                width: cardWidth,
                                height: (screenWidth / 3) - 2,
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
                <FavouriteStore merchantType={merchantType} />
            </View>
        </ScrollView>
    );
}

export default FindStore;