import React, { useState, useEffect } from 'react';
import { Dimensions, FlatList, Text, View, SafeAreaView, BackHandler, Alert, Image } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useSelector } from "react-redux"
import { useNavigation } from '@react-navigation/native';
//import PlaceOrderFooter from "../appcomponents/footer/PlaceOrderFooter";
import HeaderCommon from '../../components/header/HeaderCommon';
import { handleMedicineItems } from '../../hooks/cart-handler/handleMedicineItems';
import CartProductList from '../../components/screens-components/MedicineShop/products/CartProductList';
import FooterPlaceOrder from '../../components/footer/FooterPlaceOrder';
import NotificationError from '../../components/popup-notification/NotificationError';

const screenWidth = Dimensions.get('window').width;

let connectionStatus = 'true';
let isReachable = 'true';

const MedicineCartItems = (props) => {
    const navigation = useNavigation();
    const [discount, setDiscount] = useState(0);
    const [deliveryChargeNotice, setDeliveryChargeNotice] = useState('');
    const [lessNotice, setLessNotice] = useState('');
    const [grandTotal, setGrandTotal] = useState(0);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [message, setMessage] = useState('');
    const {
        medicineStoreInfo,
        medicineItems,
        totalAmountMedicine,
    } = useSelector((state) => state.cartItems);

    const minOrderAmount = medicineStoreInfo?.min_purchage_amount || 0;
    const deliveryCharge = medicineStoreInfo?.max_delivery_charge || 0;
    const minDeliveryCharge = medicineStoreInfo?.min_delivery_charge || 0;
    const noticeDeliveryCharge = medicineStoreInfo?.delivery_notice || '';
    const less = medicineStoreInfo?.less || 0;
    const less_type = medicineStoreInfo?.less_type || 'Percent'
    const maximum_less = medicineStoreInfo?.maximum_less || 0;
    const minimum_order_for_less = medicineStoreInfo?.minimum_order_for_less || 0;

    const {
        getQty,
        addToCart,
        removeFromCart,
        deccreseQty,
        isInOutOfStockList,
        proceedToClaerAnyWay
    } = handleMedicineItems();

    useEffect(() => {
        proceedToClaerAnyWay();
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

    }, [totalAmountMedicine, medicineStoreInfo]);



    const getGrandTotal = () => {
        let shippingCost = deliveryCharge;
        if (parseFloat(totalAmountMedicine) >= parseFloat(minOrderAmount)) {
            shippingCost = minDeliveryCharge;
        }
        let total = 0;
        let Discount = 0;
        if (parseFloat(less) > 0 && parseFloat(maximum_less) > 0 && parseFloat(totalAmountMedicine) >= parseFloat(minimum_order_for_less)) {
            if (less_type === 'Percent') {
                Discount = ((parseFloat(less) / 100) * parseFloat(totalAmountMedicine)).toFixed(2);
                if (parseFloat(Discount) > parseFloat(maximum_less)) {
                    Discount = parseFloat(maximum_less).toFixed(2);
                }
            } else {
                Discount = less;
            }
        }
        setDiscount(Discount);
        total = ((parseFloat(totalAmountMedicine) + parseFloat(shippingCost)) - parseFloat(Discount)).toFixed(2);
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
                    setLessNotice(`${minimum_order_for_less} টাকার বাজার করলে ${less} টাকা ছাড়`);
                }
            } else {
                if (less_type === 'Percent') {
                    setLessNotice(`${less}% ছাড়! সর্বোচ্চ ${maximum_less} টাকা।`);
                }
            }
        }
    };

    return (

        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>

            <HeaderCommon title="Medicine Cart Items" toggleDrawer={props.navigation} />

            <FlatList
                ListFooterComponent={
                    <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                        <View style={{ width: screenWidth, padding: 10, backgroundColor: 'white' }}>
                            <Text style={{ fontSize: 18, color: '#006400', fontWeight: 'bold', paddingLeft: 5 }} numberOfLines={1} ellipsizeMode="tail">
                                {medicineStoreInfo?.shop_name}
                            </Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Image source={require('../../assets/icon/ic_place_blue.png')}
                                    style={{ width: 25, height: 25, tintColor: 'blue', resizeMode: 'contain' }} />
                                <Text style={{ fontSize: 16, color: '#006400', marginLeft: 3, marginRight: 13 }} numberOfLines={2} ellipsizeMode="tail">{medicineStoreInfo?.shop_address}</Text>
                            </View>
                            <Text style={{ fontSize: 15, color: 'blue', paddingLeft: 5 }} numberOfLines={2} ellipsizeMode="tail">
                                {lessNotice}
                            </Text>
                        </View>
                        <FlatList
                            contentContainerStyle={{ padding: 5 }}
                            data={medicineItems}
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
            {parseFloat(totalAmountMedicine) < parseFloat(minOrderAmount) ?
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
                <ItemResume title='SubTotal' price={(totalAmountMedicine).toFixed(2)} />
                {parseFloat(totalAmountMedicine) <= parseFloat(minOrderAmount) ?
                    <ItemResume title='Delivery Charge' price={parseFloat(totalAmountMedicine) > 0 ? (deliveryCharge).toFixed(2) : '0.00'} />
                    :
                    <ItemResume title='Delivery Charge' price={(minDeliveryCharge).toFixed(2)} />
                }
                <ItemResume title='Less (-)' price={discount} />
            </View>

            <FooterPlaceOrder module='Medicine' grandTotal={grandTotal} setShowErrorMessage={setShowErrorMessage} setMessage={setMessage} />

        </View >
    );
}

function ItemResume({ title, price }) {
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

export default MedicineCartItems;