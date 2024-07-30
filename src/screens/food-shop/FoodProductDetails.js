import React, { useEffect, useState } from 'react';
import { Dimensions, useWindowDimensions, StyleSheet, FlatList, Image, TouchableOpacity, View, Text, BackHandler, TouchableHighlight, TouchableWithoutFeedback, Pressable } from "react-native";
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
//import { WebView } from 'react-native-webview';
import HTML from 'react-native-render-html';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from "react-redux"
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { storageImageUrl } from '../../helpers/imageUrl';
import { food_itemsImages, logoColor_1, logoColor_2 } from '../../helpers/Constants';
import HeaderCommon from '../../components/header/HeaderCommon';
import FooterCommon from '../../components/footer/FooterCommon';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { handleFoodItems } from '../../hooks/cart-handler/handleFoodItems';

const screenWidth = Dimensions.get('window').width;
const hight = Dimensions.get('window').hight;

let connectionStatus = 'true';
let isReachable = 'true';
let images = [];
//let swiperImage = [];
// const deviceWidth = Dimensions.get("window").width;
// const deviceHeight = Platform.OS === "ios"
//     ? Dimensions.get("window").height
//     : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

let merchantType = 0;

export default function FoodProductDetails({ route }) {
    const navigation = useNavigation();
    const data = route.params.data;
    const deviceWidth = useWindowDimensions().width;
    const deviceHeight = useWindowDimensions().height;

    //const { data } = props.route.params;
    const [isVisible, setVisible] = useState(false);

    const {
        getQty,
        addToCart,
        removeFromCart,
        deccreseQty,
    } = handleFoodItems();

    useEffect(() => {

        const backAction = () => {
            navigation.goBack();
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);

    let currentQty = getQty(data?._id);

    let isAvailable = 1;

    let [quantity, setQuantity] = useState(currentQty);
    quantity = currentQty;

    let isInStock = 1;

    //let isInStock = data?.is_available;

    // if (quantity < 1 && isAvailable > 0) {
    //     isInStock = 0;
    // }

    // let productId = data?.productInfoTable;
    // if (data?.productInfoTable?._id) {
    //     productId = data?.productInfoTable?._id;
    // }

    const handleClick = () => {
        setVisible(true);
    }

    return (

        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
            <HeaderCommon toggleDrawer={navigation} title="Product Details" connectionStatus={connectionStatus} isReachable={isReachable} />
            <Modal style={{ margin: 0 }}
                animationType="fade"
                isVisible={isVisible}
                transparent={true}
                deviceWidth={deviceWidth}
                deviceHeight={deviceHeight}
                onBackButtonPress={() => setVisible(false)}
                customBackdrop={<View style={{ flex: 1 }} />}
            >
                <View style={{ height: 50, backgroundColor: 'white' }}>
                    <ButtonClose onClose={() => setVisible(false)} />
                </View>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <ImageViewer imageUrls={images} backgroundColor='white' />
                </View>
            </Modal>

            <FlatList
                ListHeaderComponent={
                    <View style={{ height: screenWidth, width: screenWidth, backgroundColor: 'white', alignItems: 'center', overflow: 'hidden', justifyContent: 'center' }}>
                        <FastImage style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}
                            resizeMode={FastImage.resizeMode.contain}
                            source={{ uri: storageImageUrl(food_itemsImages, data?.app_image) }} />
                    </View>                   
                }
                ListFooterComponent={
                    <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                        <View style={{
                            width: screenWidth,
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            borderTopWidth: 0.5,
                            borderTopColor: '#e0e0e0',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <View style={{ flex: 1, padding: 10 }}>
                                {/* <Text style={{ fontSize: 18, color: '#263238', fontWeight: 'bold' }}>{data?.product_title_eng}</Text> */}
                                <Text style={{ fontSize: 18, color: '#263238', fontWeight: 'bold' }}>{data?.product_title_beng}</Text>
                                <Text>
                                    <Text style={{ fontSize: 18, color: '#616161', fontWeight: 'bold' }}>{data?.pack_size}    </Text>
                                    {parseFloat(data?.less) > 0 && parseFloat(data?.max_retail_price) > 0 ?
                                        <Text style={{
                                            fontSize: 18,
                                            color: '#800000',
                                            textDecorationLine: 'line-through',
                                            textDecorationStyle: 'solid'
                                        }}>৳ {data?.max_retail_price}</Text>
                                        : null
                                    }
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                    <View style={{ width: "40%" }}>
                                        <Text style={{ fontSize: 18, color: '#ff9800', marginTop: 5, fontWeight: 'bold' }}>৳ {data?.sale_price}</Text>
                                    </View>
                                    {isInStock > 0 ?
                                        <View style={{ width: "60%", paddingRight: 5, alignItems: 'flex-end' }}>

                                            {quantity < 1 ?
                                                <Pressable style={{
                                                    height: 34,
                                                    width: 110,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    paddingHorizontal: 11,
                                                    borderWidth: 2,
                                                    borderColor: '#006400',
                                                    borderRadius: 4,
                                                    paddingLeft: 8,

                                                }}
                                                    onPress={() => {
                                                        setQuantity(quantity + 1);
                                                        addToCart(data);
                                                    }}
                                                >
                                                    <Image style={{ width: 100, height: 33, tintColor: '#006400' }}
                                                        resizeMode={'contain'}
                                                        source={require('../../assets/icon/Add-to-Bag.png')} />
                                                    {/* <Text style={{ color: '#111d5e', fontSize: 18, }}>Add to Bag</Text> */}
                                                </Pressable>
                                                :
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0 }}>
                                                    {quantity > 1 ?
                                                        <FloatingButton size={34} style={{ position: 'relative' }}
                                                            image={require('../../assets/icon/ic_minus.png')}
                                                            imageStyle={{ tintColor: '#006400', width: 28, height: 28 }}
                                                            onPress={() => {
                                                                setQuantity(quantity - 1);
                                                                deccreseQty(data?._id);
                                                            }}
                                                        />
                                                        : <FloatingButton size={34} style={{ position: 'relative' }}
                                                            image={require('../../assets/icon/ic_minus.png')}
                                                            imageStyle={{ tintColor: '#006400', width: 28, height: 28 }}
                                                            onPress={() => {
                                                                setQuantity(quantity - 1);
                                                                removeFromCart(data?._id);
                                                            }}
                                                        />
                                                    }
                                                    <Text style={{ width: 35, textAlign: 'center', fontSize: 18, color: '#E3319D' }}>{currentQty}</Text>
                                                    {data?.max_allowed < 1 || data?.max_allowed > currentQty ?
                                                        <FloatingButton size={34} style={{ position: 'relative' }}
                                                            image={require('../../assets/icon/ic_plus.png')}
                                                            imageStyle={{ tintColor: '#006400', width: 28, height: 28 }}
                                                            onPress={() => {
                                                                setQuantity(quantity + 1);
                                                                addToCart(data);
                                                            }} />
                                                        :
                                                        <FloatingButton2 size={34} style={{ position: 'relative' }} />
                                                    }
                                                </View>
                                            }
                                        </View>
                                        :
                                        <>
                                            <View style={{ width: "60%", paddingRight: 5, alignItems: 'flex-end' }}>
                                                <Pressable style={{
                                                    height: 30,
                                                    width: 120,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    paddingHorizontal: 11,
                                                    borderWidth: 2,
                                                    borderColor: '#800000',
                                                    borderRadius: 4,
                                                    paddingLeft: 10,
                                                }}
                                                >
                                                    <Image style={{ width: 120, height: 27, tintColor: '#800000' }}
                                                        resizeMode={'contain'}
                                                        source={require('../../assets/icon/Out-Of-Stock.png')} />
                                                </Pressable>
                                            </View>
                                        </>
                                    }
                                </View>
                            </View>
                        </View >
                    </View>
                }
            />
            <FooterCommon module='Food' />
        </View>
    );
}

function ButtonClose({ onClose, tintColor = '#000000' }) {
    return (
        <TouchableOpacity onPress={onClose}
            style={{
                position: 'absolute',
                right: 10,
                top: 10,
                height: 33,
                width: 33,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Image style={{ width: 15, height: 15, tintColor: tintColor }}
                source={require('../../assets/icon/ic_close.png')} />
        </TouchableOpacity>
    );
}

function FloatingButton({ onPress, size = 40, style = { position: 'absolute' }, disabled = false, image = require('../../assets/icon/ic_plus_white.png'), imageStyle = {} }) {

    return (
        <TouchableOpacity disabled={disabled} style={[{
            height: size,
            width: size,
            borderWidth: 2,
            borderColor: logoColor_2,
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
        </TouchableOpacity>

    );
}

function FloatingButton2({ size = 40, style = { position: 'absolute' }, disabled = false }) {

    return (
        <TouchableOpacity disabled={disabled} style={[{
            height: size,
            width: size,
            borderWidth: 0,
            borderColor: '#111d5e',
            bottom: style.position === 'relative' ? undefined : 20,
            right: style.position === 'relative' ? undefined : 20,
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center',
            //backgroundColor: '#f44336',
            elevation: 0,
            //shadowOffset: { width: 0, height: 2 },
            //shadowOpacity: 0.3
        }, style]}>
        </TouchableOpacity>
    );
}

const CustomPagination = (props: JSX.IntrinsicAttributes & PaginationProps) => {
    return (
        <Pagination
            {...props}
            //paginationStyle={styles.paginationContainer}
            paginationStyleItem={styles.pagination}
            paginationDefaultColor="tomato"
            paginationActiveColor="white"
        />
    );
};

const styles = StyleSheet.create({
    imageBanner: {
        padding: 2,
        height: screenWidth - 1,
        width: screenWidth - 1,
        borderRadius: 2,
        marginHorizontal: 1
    },
    paginationContainer: {
        top: 0,
    },
    pagination: {
        width: 4,
        height: 4,
        padding: 3,
        columnGap: 1,
        marginBottom: 5,
        opacity: 1.5,
        elevation: 2,
        borderRadius: 2,
    },
});