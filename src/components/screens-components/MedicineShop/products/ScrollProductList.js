import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { medicine_itemsImages } from '../../../../helpers/Constants';
import { storageImageUrl } from '../../../../helpers/imageUrl';
import PurchaseBtn from '../../Common/PurchaseBtn';

const screenWidth = Dimensions.get('window').width;

export const MemoizedScrollProductList = React.memo(ScrollProductList);

export default function ScrollProductList({ data, addToBagPress, deccresePress, removePress, qtyIncart, isOutOfStock }) {

    const navigation = useNavigation();

    return (
        <React.Fragment key={data?.product_id}>
            <View style={{ padding: 4 }}>
                <View style={{
                    width: (screenWidth / 2) - 30,
                    justifyContent: 'space-between',
                    borderRadius: 8,
                    shadowRadius: 8,
                    elevation: 3,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    backgroundColor: 'white'
                }}>

                    <FastImage
                        style={{
                            height: (screenWidth / 2) - 15,
                            justifyContent: 'flex-end',
                            padding: 10,
                            borderRadius: 8,
                            shadowRadius: 8,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            overflow: 'hidden'
                        }}
                        source={{
                            uri: storageImageUrl(medicine_itemsImages, data?.app_image),
                            priority: FastImage.priority.normal,
                            cache: FastImage.cacheControl.web,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            left: -4,
                            top: (screenWidth / 2) - 50,
                        }}>
                        <PurchaseBtn
                            data={data}
                            addToBagPress={addToBagPress}
                            incresePress={addToBagPress}
                            deccresePress={deccresePress}
                            removePress={removePress}
                            qtyIncart={qtyIncart}
                            isOutOfStock={isOutOfStock}
                        />                      
                    </View>
                    {parseFloat(data?.less) > 0 && parseFloat(data?.max_retail_price) > 0 ?
                        <View
                            style={{
                                position: 'absolute',
                                backgroundColor: '#6AA121',
                                paddingLeft: 10,
                                paddingRight: 10,
                                height: 20,
                                borderTopLeftRadius: 8,
                                borderBottomEndRadius: 8,
                                left: 0,
                                top: 0,
                                alignItems: 'center'
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: "#FFFFFF",
                                    fontSize: 15
                                }}>

                                {
                                    data?.less_type === 'Percent' ?
                                        <>{data?.less}% off</>
                                        :
                                        <>৳ {data?.less} off</>
                                }
                            </Text>
                        </View>
                        :
                        null
                    }
                    <TouchableOpacity onPress={() => { navigation.navigate('MedicineProductDetails', { data }) }}>
                        <View style={{ padding: 2, paddingLeft: 8, marginTop: 5, paddingRight: 8 }}>

                            <Text style={{ fontSize: 15, color: '#263238' }} numberOfLines={2} ellipsizeMode="tail">
                                {data?.item_title_eng}{"\n"}
                            </Text>

                        </View>
                        <View style={{ flex: 1, padding: 2, paddingLeft: 8, paddingRight: 8 }}>
                            <Text numberOfLines={1} ellipsizeMode="tail">
                                <Text style={{ fontSize: 15, color: '#006400', paddingLeft: 4 }} numberOfLines={1} ellipsizeMode="tail">{data?.pack_size}    </Text>
                            </Text>

                            <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'center', paddingTop: 4 }}>
                                <View style={{ width: "50%" }}>
                                    <Text style={{ fontSize: 15, color: '#006400', textAlign: 'left' }} >৳ {data?.sale_price}</Text>
                                </View>
                                <View style={{ width: "50%" }}>
                                    {parseFloat(data?.less) > 0 && parseFloat(data?.max_retail_price) > 0 ?
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#800000',
                                            textDecorationLine: 'line-through',
                                            textDecorationStyle: 'solid',
                                            textAlign: 'right'
                                        }}>৳ {data?.max_retail_price}</Text>
                                        : null
                                    }
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </React.Fragment>
    )

}

