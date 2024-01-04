import React from 'react';
import { FlatList, Image, Text, View } from "react-native";
import { logoColor_1, logoColor_2 } from '../../../helpers/Constants';
import { storageImageUrl } from '../../../helpers/imageUrl';
import FastImage from 'react-native-fast-image';

function MyFavourite({ title, data, height }) {
    return (
        <>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
                backgroundColor: 'white',
            }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: logoColor_2 }}>{title}</Text>
            </View>
            <FlatList
                contentContainerStyle={{ padding: 5 }}
                horizontal
                data={data}
                renderItem={({ item }) => <ItemImage data={item} height={height} />}
                keyExtractor={item => item._id}
            />
        </>
    );
}

function ItemImage({ data, height }) {
    return (
        <View style={{ height: height, width: (height * 1.5), padding: 5 }}>
            <FastImage
                source={{ uri: storageImageUrl('app-dashboard', data.file_name) }}
                style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'flex-end',
                    padding: 10,
                    borderRadius: 8,
                    shadowRadius: 8,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    overflow: 'hidden'
                }}
                resizeMode={FastImage.resizeMode.contain}
            />
        </View>
    );
}

export default MyFavourite;