import React, { useState } from 'react';
import { Dimensions, Image, Text, Pressable, View } from "react-native";
import FastImage from 'react-native-fast-image';
import { storageImageUrl } from '../../../../helpers/imageUrl';
import { medicine_itemsImages } from '../../../../helpers/Constants';

const screenWidth = Dimensions.get('window').width;
const hight = (screenWidth / 3) - 7;

export default function CartProductList({ data, showPrice, incresePress, deccresePress, removePress, quantityIncart }) {
    let [quantity, setQuantity] = useState(quantityIncart);
    let [price, setPrice] = useState(data?.price);
    quantity = quantityIncart;

    if (quantity > 0) {
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
                            {showPrice ?
                                <Text style={{ fontSize: 17, color: '#1F45FC', marginTop: 5 }}>{data?.pack_size}  /  <Text style={{ fontSize: 17, color: '#348017', marginTop: 5 }}>৳ {data?.sale_price} </Text> </Text>
                                :
                                <Text style={{ fontSize: 17, color: '#1F45FC', marginTop: 5 }}>{data?.pack_size}</Text>
                            }
                        </View>
                        <View style={{ width: "20%", paddingRight: 5, alignItems: 'flex-end' }}>
                            <Pressable onPress={() => {
                                setQuantity(quantity - 1);
                                removePress(data?._id);
                            }}
                                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={{ width: 20, height: 20, tintColor: '#FF0000' }}
                                    resizeMode={'contain'}
                                    source={require('../../../../assets/icon/trash.png')} />
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        {quantity > 1 ?
                            <FloatingButton size={30} style={{ position: 'relative' }}
                                image={require('../../../../assets/icon/ic_minus.png')}
                                imageStyle={{ tintColor: '#006400', width: 30, height: 30 }}
                                onPress={() => {
                                    setQuantity(quantity - 1);
                                    deccresePress(data?._id);
                                }}
                            />
                            : <FloatingButton size={30} style={{ position: 'relative' }}
                                image={require('../../../../assets/icon/ic_minus.png')}
                                imageStyle={{ tintColor: '#006400', width: 30, height: 30 }}
                                onPress={() => {
                                    setQuantity(quantity - 1);
                                    removePress(data?._id);
                                }}
                            />
                        }
                        <Text style={{ width: 30, textAlign: 'center', fontSize: 18, color: '#E3319D' }}>{quantity}</Text>
                        {data?.max_allowed < 1 || data?.max_allowed > quantity ?
                            <FloatingButton size={30} style={{ position: 'relative' }}
                                image={require('../../../../assets/icon/ic_plus.png')}
                                imageStyle={{ tintColor: '#006400', width: 30, height: 30 }}
                                onPress={() => {
                                    setQuantity(quantity + 1);
                                    incresePress(data);
                                }} />
                            : null
                        }
                    </View>
                    {showPrice && <Text style={{ fontSize: 17, color: '#348017', position: 'absolute', bottom: 10, right: 15 }}>৳ {parseFloat(parseFloat(data?.sale_price) * parseFloat(quantity)).toFixed(2)}</Text>}
                </View>
            </View>
        );
    } else {
        return null;
    }

}


function FloatingButton({ onPress, size = 40, style = { position: 'absolute' }, disabled = false, image = require('../../../../assets/icon/ic_plus_white.png'), imageStyle = {} }) {

    return (
        <Pressable disabled={disabled} style={[{
            height: size,
            width: size,
            borderWidth: 2,
            borderColor: '#006400',
            bottom: style.position === 'relative' ? undefined : 20,
            right: style.position === 'relative' ? undefined : 20,
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center',
            //backgroundColor: '#f44336',
            elevation: 0,
            //shadowOffset: { width: 0, height: 2 },
            //shadowOpacity: 0.3
        }, style]} onPress={onPress}>
            <Image source={image}
                style={[{ width: size * 0.5, height: size * 0.5, resizeMode: 'contain' }, imageStyle]} />
        </Pressable>

    );
}

