import React, { useState, useEffect } from 'react';
import { Dimensions, FlatList, Text, View, SafeAreaView, BackHandler, Alert, Image } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useSelector } from "react-redux"
import { useNavigation } from '@react-navigation/native';
//import PlaceOrderFooter from "../appcomponents/footer/PlaceOrderFooter";
import { handleGroceryItems } from '../../hooks/cart-handler/handleGroceryItems';
import HeaderCommon from '../../components/header/HeaderCommon';
import CartProductList from '../../components/screens-components/GroceryShop/products/CartProductList';
import FooterPlaceOrder from '../../components/footer/FooterPlaceOrder';
import NotificationError from '../../components/popup-notification/NotificationError';

const screenWidth = Dimensions.get('window').width;

let connectionStatus = 'true';
let isReachable = 'true';
let loading = true;
const GroceryCartItems = (props) => {
    const navigation = useNavigation();
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [deliveryChargeNotice, setDeliveryChargeNotice] = useState('');
    const [lessNotice, setLessNotice] = useState('');
    const [discount, setDiscount] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [message, setMessage] = useState('');
    const {
        groceryStoreInfo,
        groceryItems,
        totalAmountGrocery,
    } = useSelector((state) => state.cartItems);

    const minOrderAmount = groceryStoreInfo?.min_purchage_amount || 0;
    const deliveryCharge = groceryStoreInfo?.max_delivery_charge || 0;
    const minDeliveryCharge = groceryStoreInfo?.min_delivery_charge || 0;
    const noticeDeliveryCharge = groceryStoreInfo?.delivery_notice || '';
    const less = groceryStoreInfo?.less || 0;
    const less_type = groceryStoreInfo?.less_type || 'Percent'
    const maximum_less = groceryStoreInfo?.maximum_less || 0;
    const minimum_order_for_less = groceryStoreInfo?.minimum_order_for_less || 0;

    useEffect(() => {
        getGrandTotal();
        setNotification();
        const backAction = () => {
            navigation.goBack();
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [totalAmountGrocery]);

    const {
        getQty,
        addToCart,
        removeFromCart,
        deccreseQty,
        isInOutOfStockList
    } = handleGroceryItems();

    const getGrandTotal = () => {
        let shippingCost = deliveryCharge;

        if (parseFloat(totalAmountGrocery) >= parseFloat(minOrderAmount) || parseFloat(minOrderAmount) < 1) {
            shippingCost = minDeliveryCharge;
        }

        let total = 0;
        let Discount = 0;
        if (parseFloat(less) > 0 && parseFloat(maximum_less) > 0 && parseFloat(totalAmountGrocery) >= parseFloat(minimum_order_for_less)) {
            if (less_type === 'Percent') {
                Discount = ((parseFloat(less) / 100) * parseFloat(totalAmountGrocery)).toFixed(2);
                if (parseFloat(Discount) > parseFloat(maximum_less)) {
                    Discount = parseFloat(maximum_less).toFixed(2);
                }
            } else {
                Discount = less;
            }
        }
        setDiscount(Discount);
        setDeliveryFee(shippingCost);
        total = ((parseFloat(totalAmountGrocery) + parseFloat(shippingCost)) - parseFloat(Discount)).toFixed(2);
        setGrandTotal(total);
    };

    const setNotification = () => {

        if (parseFloat(deliveryCharge) > parseFloat(minDeliveryCharge)) {
            if (parseFloat(minOrderAmount) > 0 && parseFloat(minDeliveryCharge) < 1) {
                setDeliveryChargeNotice(minOrderAmount + ' টাকার বাজার করলে ডেলিভারি চার্জ ফ্রী!');
            } else if (parseFloat(minOrderAmount) > 0 && parseFloat(minDeliveryCharge) > 0) {
                setDeliveryChargeNotice(minOrderAmount + ' টাকার বাজার করলে ডেলিভারি চার্জ ' + minDeliveryCharge + ' টাকা মাত্র।');
            } else if (parseFloat(minOrderAmount) < 1 && parseFloat(minDeliveryCharge) < 1) {
                setDeliveryChargeNotice('ডেলিভারি চার্জ ফ্রী!');
            }
        }

        if (parseFloat(less) > 0 && parseFloat(maximum_less) > 0) {
            if (parseFloat(minimum_order_for_less) > 0) {
                if (less_type === 'Percent') {
                    setLessNotice(`${minimum_order_for_less} টাকার বাজার করলে ${less}% ছাড়! সর্বোচ্চ ${maximum_less} টাকা।`);
                } else {
                    setLessNotice(`${minimum_order_for_less} টাকার বাজার করলে ${less}টাকা ছাড়`);
                }
            } else {
                if (less_type === 'Percent') {
                    setLessNotice(`${less}% ছাড়! সর্বোচ্চ ${maximum_less} টাকা।`);
                }
            }
        }
    };

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                <HeaderCommon title="Grocery Cart Items" toggleDrawer={props.navigation} />
                <FlatList
                    ListFooterComponent={
                        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                            <View style={{ width: screenWidth, padding: 10, backgroundColor: 'white' }}>
                                <Text style={{ fontSize: 18, color: '#006400', fontWeight: 'bold', paddingLeft: 5 }} numberOfLines={1} ellipsizeMode="tail">
                                    {groceryStoreInfo?.shop_name}
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Image source={require('../../assets/icon/ic_place_blue.png')}
                                        style={{ width: 25, height: 25, tintColor: 'blue', resizeMode: 'contain' }} />
                                    <Text style={{ fontSize: 16, color: '#006400', marginLeft: 3, marginRight: 13 }}>{groceryStoreInfo?.shop_address}</Text>
                                </View>
                                <Text style={{ fontSize: 15, color: '#006400', paddingLeft: 5 }} numberOfLines={2} ellipsizeMode="tail">
                                    {lessNotice}
                                </Text>
                            </View>
                            <FlatList
                                contentContainerStyle={{ padding: 5 }}
                                data={groceryItems}
                                keyExtractor={item => item._id}
                                renderItem={({ item }) =>
                                    <CartProductList
                                        data={item}
                                        incresePress={addToCart}
                                        deccresePress={deccreseQty}
                                        removePress={removeFromCart}
                                        quantityIncart={getQty(item._id)}
                                        isOutOfStock={isInOutOfStockList(item._id)}
                                    />}
                            />
                        </View>
                    }
                />

                <NotificationError visible={showErrorMessage} setVisible={setShowErrorMessage} message={message} />

                {parseFloat(totalAmountGrocery) < parseFloat(minOrderAmount) ?
                    <View style={{
                        height: 50,
                        backgroundColor: '#7903d1',
                        paddingHorizontal: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ color: '#FFF', fontSize: 15 }}>{deliveryChargeNotice}</Text>
                        </View>
                    </View>
                    :
                    null
                }

                <View style={{
                    marginHorizontal: 2,
                    backgroundColor: 'white',
                    shadowOffset: { width: 0, height: 2 },

                    shadowRadius: 3,
                    borderRadius: 3,
                    elevation: 1,
                }}>
                    <ItemResume title='SubTotal' price={totalAmountGrocery} />
                    <ItemResume title='Delivery Charge' price={(deliveryFee).toFixed(2)} />
                    <ItemResume title='Less (-)' price={discount} />
                </View>

                <FooterPlaceOrder module='Grocery' grandTotal={grandTotal} setShowErrorMessage={setShowErrorMessage} setMessage={setMessage} />
            </View >
        </SafeAreaView>
    );

}

function ItemResume({ title, oldPrice, price }) {
    return (
        <View style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 25,
            paddingRight: 22,
            alignItems: 'flex-end',
            borderTopWidth: 0.5,
            borderTopColor: '#e0e0e0'
        }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#263238', flex: 1 }}>{title} :</Text>
            <Text style={{ fontSize: 17, color: '#111d5e', fontWeight: 'bold' }}>৳ {price}</Text>
        </View>
    );
}

export default GroceryCartItems;
