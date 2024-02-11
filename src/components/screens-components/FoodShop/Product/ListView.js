import React from 'react';
import { Dimensions, StyleSheet, Text, Pressable, View, Image } from "react-native";
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { food_itemsImages } from '../../../../helpers/Constants';
import { storageImageUrl } from '../../../../helpers/imageUrl';
import PurchaseBtn from './PurchaseBtn';
import { handleFoodItems } from '../../../../hooks/cart-handler/handleFoodItems';
import Animated, { FadeInDown } from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;

export const MemoizedListView = React.memo(ListView);

function ListView({ data, index }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    let cardMargin = 4;
    let cardWidth = screenWidth - (cardMargin * 5);
    let title = data?.product_title_beng + `\n`
    const {
        getQty,
        addToCart,
        removeFromCart,
        deccreseQty,
    } = handleFoodItems();

    return (
        <View style={{
            backgroundColor: 'white',
            width: cardWidth,
            margin: cardMargin,
            flexDirection: 'row',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            borderRadius: 10,
            elevation: 3,
            //alignItems: 'center',
            justifyContent: 'center',
            //padding: 5
        }}>
            <Pressable onPress={() => { navigation.navigate('FoodProductDetails', { data: data, tagName: `sharedTag${index}`, }) }}>
                <Animated.Image
                    style={{
                        height: screenWidth / 2.8,
                        width: screenWidth / 2.8,
                        overflow: 'hidden',
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    sharedTransitionTag={data?._id}
                    source={{
                        uri: storageImageUrl(food_itemsImages, data?.app_image),
                    }}
                />
                {/* <FastImage
                            style={{
                                height: '100%', width: '100%'
                            }}
                            source={{
                                uri: storageImageUrl(food_itemsImages, data?.app_image),
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        /> */}

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
            </Pressable>
            <Animated.View style={{ flex: 1, padding: 5, margin: 10 }}>
                <Pressable onPress={() => { navigation.navigate('FoodProductDetails', { data }) }}>
                    <Text style={{ fontSize: 18, color: '#003B95', }} numberOfLines={2} ellipsizeMode="tail">
                        {title.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                {index === 0 && title.includes('\n') ? '\n' : null}
                                {index === 1 && title.includes('\n') ? '\n' : '\n'}
                            </React.Fragment>
                        ))}
                    </Text>
                    <Text style={{ fontSize: 16, color: '#006400' }} numberOfLines={1} ellipsizeMode="tail">{data?.pack_size}</Text>
                </Pressable>
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
                        addToBagPress={addToCart}
                        incresePress={addToCart}
                        deccresePress={deccreseQty}
                        removePress={removeFromCart}
                        qtyIncart={getQty(data._id)}
                    />
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        // marginBottom: 5,
    },
    highlight: {
        fontWeight: 'bold',
    },
    tag: {
        backgroundColor: '#8bda60',
        color: 'white',
        fontWeight: 'bold',
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 5,
        position: 'absolute',
        right: 0,
        overflow: 'hidden',
    },
});


export default ListView;