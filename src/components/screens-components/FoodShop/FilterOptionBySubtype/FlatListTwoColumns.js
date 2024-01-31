import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, Pressable, View } from "react-native";
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { storageImageUrl } from '../../../../helpers/imageUrl';
import { food_sliderTypeSubtypeImagesFolderName } from '../../../../helpers/Constants';

const screenWidth = Dimensions.get('window').width;
let customPadding = 4;
function FlatListTwoColumns({ listInfo, TopPadding, navigateTo }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', marginBottom: -5 }}>
            <FlatList
                contentContainerStyle={{ padding: 3 }}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                data={listInfo}
                renderItem={({ item }) => <ItemData data={item} TopPadding={TopPadding} navigateTo={navigateTo} />}
                keyExtractor={(item, index) => index.toString()}
            //keyExtractor={item => item._id}
            />
        </View>
    );
}
function ItemData2({ data }) {
    let cardMargin = 5;
    let cardWidth = (screenWidth / 2) - (cardMargin * 3);

    return (
        <View style={{
            backgroundColor: 'white',
            width: cardWidth,
            margin: cardMargin,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            borderRadius: 6,
            elevation: 3,
        }}>
            <View style={{ height: screenWidth / 2.2, overflow: 'hidden', }}>
                <FastImage style={{ height: '100%', width: '100%', borderRadius: 6, }}
                    source={{
                        uri: storageImageUrl(food_sliderTypeSubtypeImagesFolderName, data?.categoryInfo?.banner_type_1),
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </View>
            {/* <View style={{ padding: 5,alignItems:'center',justifyContent:'center' }}>
                <Text style={{ fontSize: 15, color: '#263238',alignItems:'center',justifyContent:'center' }}>{data?.categoryName}</Text>

            </View> */}
        </View>
    )
}

function ItemData({ data, TopPadding, navigateTo }) {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => { navigateTo(data) }}>
            <View style={{ height: (screenWidth / 3), width: (screenWidth / 2.05), padding: 5 }}>
                <View style={{
                    alignItems: 'center', justifyContent: 'center',
                    borderRadius: 6,
                    shadowRadius: 6,
                    elevation: 3,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    backgroundColor: 'white'
                }}>
                    <FastImage
                        source={{
                            uri: storageImageUrl(food_sliderTypeSubtypeImagesFolderName, data?.categoryInfo?.banner_type_2),
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            height: '100%', width: '100%',
                            alignItems: 'center', justifyContent: 'center',
                            borderRadius: 6,
                            shadowRadius: 6,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            overflow: 'hidden'
                        }} />
                </View>
            </View>
        </Pressable>
    );
}

export default FlatListTwoColumns;