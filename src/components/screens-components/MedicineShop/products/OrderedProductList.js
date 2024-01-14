import React, { useState } from 'react';
import { Dimensions, Image, Text, Pressable, View } from "react-native";
import FastImage from 'react-native-fast-image';
import { storageImageUrl } from '../../../../helpers/imageUrl';
import { medicine_itemsImages } from '../../../../helpers/Constants';

const screenWidth = Dimensions.get('window').width;
const hight = (screenWidth / 3) - 7;

export default function OrderedProductList({ data }) {

    return (
        <View style={{
            width: screenWidth,
            flexDirection: 'row',
            backgroundColor: 'white',
            borderTopWidth: 0.5,
            borderTopColor: '#e0e0e0',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <View style={{ height: 90, width: 90, overflow: 'hidden', padding: 5, alignItems: 'center', justifyContent: 'center' }}>
                <FastImage style={{ height: '100%', width: '100%', position: 'relative' }}
                    source={{ uri: storageImageUrl(medicine_itemsImages, data?.app_image) }} />
            </View>
            <View style={{ flex: 1, padding: 5 }}>
                <Text style={{ fontSize: 17, color: '#263238' }} numberOfLines={1} ellipsizeMode="tail">{data?.item_title_eng}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                    <View style={{ width: "80%" }}>
                        <Text style={{ fontSize: 17, color: '#1F45FC', marginTop: 5 }}>{data?.pack_size}</Text>
                    </View>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <Text style={{  fontSize: 18, color: '#E3319D' }}>৳ {data?.sale_price}</Text> 
                    <Text style={{ width: 30, textAlign: 'center', fontSize: 18, color: '#E3319D' }}> X {data?.quantity}</Text>
                </View>
                <Text style={{ fontSize: 17, color: '#348017', position: 'absolute', bottom: 10, right: 15 }}>৳ {parseFloat(parseFloat(data?.sale_price) * parseFloat(data?.quantity)).toFixed(2)}</Text>
            </View>
        </View>
    );


}

