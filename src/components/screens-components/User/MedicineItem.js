import React, { useState } from 'react';
import { Alert, Dimensions, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { medicine_itemsImages } from '../../../helpers/Constants';
import { storageImageUrl } from '../../../helpers/imageUrl';

const screenWidth = Dimensions.get('window').width;

export const MemoizedMedicineItem = React.memo(MedicineItem);

function MedicineItem({ data, removeFromfavoriteItems, merchantType, getMedicineProductDetails }) {
    const dispatch = useDispatch();
    let cardMargin = 2.5;
    let cardWidth = screenWidth - (cardMargin * 6);
    const removeItem = () => {

        Alert.alert("মুছে ফেলতে চান ??", "আপনি কি আপনার প্রিয় পণ্য তালিকা থেকে পণ্যটি মুছে ফেলতে চান?", [
            {
                text: "No",
                onPress: () => null,
                style: "No"
            },
            { text: "Yes", onPress: () => removeFromfavoriteItems(data, merchantType) }
        ]);

    }
    return (
        <View style={{
            backgroundColor: 'white',
            width: cardWidth,
            margin: cardMargin,
            flexDirection: 'row',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            borderRadius: 5,
            elevation: 3,
            alignItems: 'center',
            justifyContent: 'center',
        }} >
            <Pressable onPress={() => { getMedicineProductDetails(data?.productId); }}>
                <View style={{
                    height: screenWidth / 3,
                    width: screenWidth / 3,
                    overflow: 'hidden',
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <FastImage
                        style={{
                            height: '90%', width: '90%',
                        }}
                        source={{
                            uri: storageImageUrl(medicine_itemsImages, data?.app_image),
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
            </Pressable>
            <View style={{ flex: 1, padding: 5 }}>
                <Pressable onPress={() => { getMedicineProductDetails(data?.productId); }}>
                    <View
                        style={{
                            position: 'absolute',
                            backgroundColor: '#FFFFFF',
                            height: 18,
                            borderRadius: 1,
                            right: 5,
                            top: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: "#948e7e",
                                fontSize: 13
                            }}>
                            {data?.strength}
                        </Text>
                    </View>
                    <Text style={{ marginTop: 10, fontSize: 18, color: '#003B95', }} numberOfLines={1} ellipsizeMode="tail">{data?.item_title_eng}</Text>
                    <Text style={{ fontSize: 16, color: '#006400' }} numberOfLines={1} ellipsizeMode="tail">{data?.pack_size}</Text>
                </Pressable>
                <View style={{ paddingRight: 15, alignItems: 'flex-end', }}>
                    <Pressable
                        onPress={() => { removeItem(); }}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}
                    >
                        <Image
                            style={{ width: 30, height: 30, tintColor: '#FF0000' }}
                            resizeMode={'contain'}
                            source={require('../../../assets/icon/trash.png')}
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default MedicineItem;