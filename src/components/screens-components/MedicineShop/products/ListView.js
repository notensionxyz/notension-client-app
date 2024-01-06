import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { medicine_itemsImages } from '../../../../helpers/Constants';
import { storageImageUrl } from '../../../../helpers/imageUrl';
import PurchaseBtn from '../../Common/PurchaseBtn';

const screenWidth = Dimensions.get('window').width;

export const MemoizedListView = React.memo(ListView);

function ListView({ data, addToBagPress, deccresePress, removePress, qtyIncart, isOutOfStock }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    let cardMargin = 2.5;
    let cardWidth = screenWidth - (cardMargin * 6);

    return (
        <React.Fragment key={data?._id}>
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
                //alignItems: 'center',
                justifyContent: 'center',
            }} >
                <TouchableOpacity onPress={() => { navigation.navigate('MedicineProductDetails', { data }) }}>
                    <View style={{
                        height: screenWidth / 3,
                        width: screenWidth / 3,
                        overflow: 'hidden',
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 5
                    }}>
                        <FastImage
                            style={{
                                height: '100%', width: '100%'
                            }}
                            source={{
                                uri: storageImageUrl(medicine_itemsImages, data?.app_image),
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                    {parseFloat(data?.less) > 0 && parseFloat(data?.max_retail_price) > 0 ?
                        <View
                            style={{
                                position: 'absolute',
                                backgroundColor: '#6AA121',
                                paddingLeft: 7,
                                paddingRight: 7,
                                height: 19,
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
                                    fontSize: 14
                                }}>

                                {
                                    data?.less_type == 'Percent' ?
                                        <>{data?.less}% off</>
                                        :
                                        <>৳ {data?.less} off</>
                                }
                            </Text>
                        </View>
                        :
                        null
                    }
                </TouchableOpacity>
                <View style={{ flex: 1, padding: 5 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('MedicineProductDetails', { data }) }}>
                        <Text style={{ fontSize: 18, color: '#003B95', }} numberOfLines={1} ellipsizeMode="tail">{data?.item_title_eng}</Text>
                        <Text style={{ fontSize: 16, color: '#006400' }} numberOfLines={1} ellipsizeMode="tail">{data?.pack_size}</Text>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, }} numberOfLines={1} ellipsizeMode="tail">
                        <Text style={{ fontSize: 17, color: '#FF00FF' }} numberOfLines={1} ellipsizeMode="tail">৳ {data?.sale_price}{'      '}</Text>
                        {parseFloat(data?.less) > 0 && parseFloat(data?.max_retail_price) > 0 ?
                            <Text style={{
                                fontSize: 15,
                                color: '#800000',
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid'
                            }} numberOfLines={1} ellipsizeMode="tail">৳ {data?.max_retail_price}</Text>
                            : null
                        }
                    </Text>

                    <View
                        style={{
                            position: 'absolute',
                            left: -4,
                            top: (screenWidth / 3) - 50,
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
                </View>
            </View>
        </React.Fragment>
    );
}

export default ListView;