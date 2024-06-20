import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, Pressable, View } from "react-native";
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { health_careImages } from '../../../../helpers/Constants';
import { storageImageUrl } from '../../../../helpers/imageUrl';

const screenWidth = Dimensions.get('window').width;

function FlatListThreeColumns({ listInfo, navigateTo }) {
    return (

        <FlatList
            contentContainerStyle={{ paddingTop: 5, paddingBottom: 5 }}
            showsHorizontalScrollIndicator={false}
            numColumns={3}
            data={listInfo}
            renderItem={({ item }) => <ItemData data={item} navigateTo={navigateTo} />}
            keyExtractor={(item, index) => index.toString()}
        //keyExtractor={item => item._id}
        />

    );
}

function ItemData({ data, navigateTo }) {
    let cardMargin = 2;
    let cardWidth = (screenWidth / 3) - (cardMargin * 3);

    return (
        <Pressable onPress={() => { navigateTo(data); }}>
            <View style={{
                backgroundColor: 'white',
                width: cardWidth,
                margin: cardMargin,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                borderRadius: 4,
                elevation: 2,
            }}>
                <View style={{ height: screenWidth / 3, overflow: 'hidden', }}>
                    <FastImage style={{ height: '100%', width: '100%', borderRadius: 6, }}
                        source={{
                            uri: storageImageUrl(health_careImages, data?.deptInfo?.banner_1),
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
            </View>
        </Pressable>
    )
}
export default FlatListThreeColumns;