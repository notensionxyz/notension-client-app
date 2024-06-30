import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, Pressable, View } from "react-native";
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { storageImageUrl } from '../../../../helpers/imageUrl';
import { food_sliderTypeSubtypeImagesFolderName, health_careImages } from '../../../../helpers/Constants';

const screenWidth = Dimensions.get('window').width;

let customPadding = 4;

function FlatListTwoColumns({ listInfo, TopPadding, navigateTo }) {
    return (

        <FlatList
            contentContainerStyle={{ padding: 3 }}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            data={listInfo}
            renderItem={({ item }) => <ItemData data={item} navigateTo={navigateTo} />}
            keyExtractor={(item, index) => index.toString()}
        //keyExtractor={item => item._id}
        />
    );
}

function ItemData({ data, navigateTo }) {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => { navigateTo(data); }}>
            <View style={{ height: (screenWidth / 3), width: (screenWidth / 2.05), padding: 2 }}>
                <View style={{
                    alignItems: 'center', justifyContent: 'center',
                    borderRadius: 4,
                    shadowRadius: 4,
                    elevation: 3,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    backgroundColor: 'white'
                }}>
                    <FastImage
                        source={{
                            uri: storageImageUrl(health_careImages, data?.banner_2),
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