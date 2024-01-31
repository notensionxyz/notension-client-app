import React from 'react';
import { Dimensions, FlatList, Text, Pressable, View } from "react-native";
import FastImage from 'react-native-fast-image'
import { food_sliderTypeSubtypeImagesFolderName } from '../../../../helpers/Constants';
import { storageImageUrl } from '../../../../helpers/imageUrl';

const screenWidth = Dimensions.get('window').width;

let customPadding = 4;

function FlatListSingleColumns({ listInfo, TopPadding, navigateTo }) {

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <FlatList
                contentContainerStyle={{ padding: 3 }}
                showsHorizontalScrollIndicator={false}
                numColumns={1}
                data={listInfo}
                renderItem={({ item }) => <ItemData data={item} TopPadding={TopPadding} navigateTo={navigateTo} />}
                keyExtractor={(item, index) => index.toString()}
            //keyExtractor={item => item._id}
            />
        </View>
    );
}

function ItemData({ data, TopPadding, navigateTo }) {

    return (
        <Pressable onPress={() => { navigateTo(data) }}>
            <View style={{ height: (screenWidth / 2.9), width: screenWidth }}>
                <View style={{
                    margin: 10,
                    marginTop: 10,
                    justifyContent: 'space-between',
                    borderRadius: 6,
                    shadowRadius: 6,
                    elevation: 3,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    backgroundColor: 'white'
                }}>
                    <FastImage
                        source={{
                            uri: storageImageUrl(food_sliderTypeSubtypeImagesFolderName, data?.categoryInfo?.banner_type_3),
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            height: '100%', width: '100%',
                            justifyContent: 'flex-end',
                            padding: 10,
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

export default FlatListSingleColumns;