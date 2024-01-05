import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { grocery_itemsImages } from '../../../../helpers/Constants';
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
                            uri: storageImageUrl(grocery_itemsImages, data?.app_image),
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
                        {/* <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: "100%", alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Animated.View style={[styles.animatedBox, animatedStyle]} >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        {quantity > 0 && viewState == false && (
                                            <>
                                                {quantity > 1 ?
                                                    <>
                                                        <Pressable
                                                            onPress={() => {
                                                                setQuantity(quantity - 1);
                                                                deccresePress(data?._id);
                                                                autoAnimate();
                                                            }}
                                                        >
                                                            <Image style={{ width: 34, height: 36, tintColor: '#006400', alignItems: 'flex-start', justifyContent: 'center' }}
                                                                resizeMode={'contain'}
                                                                source={require('../../../../assets/icon/ic_minus.png')} />
                                                        </Pressable>
                                                        <Text style={styles.text}>
                                                            {quantity}
                                                        </Text>
                                                    </>
                                                    :
                                                    <>
                                                        <Pressable
                                                            onPress={() => {
                                                                setQuantity(quantity - 1);
                                                                removePress(data?._id);
                                                                Animated.timing(animationValue, {
                                                                    toValue: 36,
                                                                    timing: 100,
                                                                    useNativeDriver: false,
                                                                }).start();
                                                            }}
                                                        >
                                                            <Image style={{ width: 30, height: 22, tintColor: 'red', alignItems: 'flex-start', justifyContent: 'center' }}
                                                                resizeMode={'contain'}
                                                                source={require('../../../../assets/icon/trash.png')} />
                                                        </Pressable>
                                                        <Text style={styles.text}>
                                                            {quantity}
                                                        </Text>
                                                    </>
                                                }
                                            </>
                                        )}

                                        {quantity < 1 ?
                                            <>
                                                {isInStock > 0 ?
                                                    <Pressable onPress={() => {
                                                        setBoxColor('#FFFFFF');
                                                        setViewState(false);
                                                        addToBagPress(data);
                                                        Animated.timing(animationValue, {
                                                            toValue: buttonWidth,
                                                            timing: 30,
                                                            useNativeDriver: false,
                                                        }).start(() => {
                                                            setQuantity(quantity + 1);
                                                        });
                                                        autoAnimate();
                                                    }}>
                                                        <Image style={{ width: 36, height: 36, tintColor: '#E50293', alignItems: 'flex-end', justifyContent: 'center' }}
                                                            resizeMode={'contain'}
                                                            source={require('../../../../assets/icon/ic_plus.png')} />
                                                    </Pressable>
                                                    :
                                                    <Pressable onPress={() => {
                                                        setBoxColor('#FFFFFF');
                                                        setViewState(false);
                                                        Alert.alert("Hold on!", "This product is out of stock.", [
                                                            {
                                                                text: "OK",
                                                                onPress: () => null,
                                                                style: "OK"
                                                            }

                                                        ]);
                                                    }}>
                                                        <Image style={{ width: 36, height: 36, tintColor: 'red', alignItems: 'flex-end', justifyContent: 'center' }}
                                                            resizeMode={'contain'}
                                                            source={require('../../../../assets/icon/ic_plus.png')} />
                                                    </Pressable>
                                                }
                                            </>
                                            :
                                            <>
                                                {viewState == false ?
                                                    <>
                                                        {data?.max_allowed < 1 || data?.max_allowed > quantity ?
                                                            <Pressable onPress={() => {
                                                                setQuantity(quantity + 1);
                                                                incresePress(data);
                                                                autoAnimate();
                                                            }}>
                                                                <Image style={{ width: 36, height: 36, tintColor: '#006400', alignItems: 'flex-end', justifyContent: 'center' }}
                                                                    resizeMode={'contain'}
                                                                    source={require('../../../../assets/icon/ic_plus.png')} />
                                                            </Pressable>
                                                            :
                                                            <Pressable onPress={() => {
                                                                autoAnimate();
                                                            }}>
                                                                <Image style={{ width: 36, height: 36, tintColor: '#FFFFFF', alignItems: 'flex-end', justifyContent: 'center' }}
                                                                    resizeMode={'contain'}
                                                                    source={require('../../../../assets/icon/ic_plus.png')} />
                                                            </Pressable>
                                                        }
                                                    </>
                                                    :
                                                    <Pressable onPress={() => { toggleAnimation(); }}>
                                                        <Text style={styles.textAfterAnimation}>
                                                            {quantity}
                                                        </Text>
                                                    </Pressable>
                                                }
                                            </>
                                        }
                                    </View>
                                </Animated.View>
                            </View>
                        </View> */}
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
                    <TouchableOpacity onPress={() => { navigation.navigate('GroceryProductDetails', { data }) }}>
                        <View style={{ padding: 2, paddingLeft: 8, marginTop: 5, paddingRight: 8 }}>

                            <Text style={{ fontSize: 15, color: '#263238' }} numberOfLines={2} ellipsizeMode="tail">
                                {data?.product_title_beng}{"\n"}
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

