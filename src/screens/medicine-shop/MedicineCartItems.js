import React, { useState, useEffect } from 'react';
import { Dimensions, FlatList, Text, View, SafeAreaView, BackHandler, Alert } from "react-native";
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
    const [grandTotal, setGrandTotal] = useState(0);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [message, setMessage] = useState('');
    const {
        medicineItems,
        totalAmountMedicine,
    } = useSelector((state) => state.cartItems);
    const visitedMedicineStore = useSelector((state) => state.dashboard.visitedMedicineStore);
    const minOrderAmount = visitedMedicineStore?.min_purchage_amount || 0;
    const deliveryCharge = visitedMedicineStore?.max_delivery_charge || 0;
    const minDeliveryCharge = visitedMedicineStore?.min_delivery_charge || 0;
    const noticeDeliveryCharge = visitedMedicineStore?.delivery_notice || '';
    const less = visitedMedicineStore?.less || 0;
    const less_type = visitedMedicineStore?.less_type || 'Percent'
    const maximum_less = visitedMedicineStore?.maximum_less || 0;
    const minimum_order_for_less = visitedMedicineStore?.minimum_order_for_less || 0;

    useEffect(() => {
        getGrandTotal();
        const backAction = () => {
            navigation.goBack();
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();

    }, [totalAmountMedicine]);

    const {
        getQty,
        addToCart,
        removeFromCart,
        deccreseQty,
        isInOutOfStockList
    } = handleMedicineItems();

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

    return (

        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>

            <HeaderCommon title="Medicine Cart Items" toggleDrawer={props.navigation} />

            <FlatList
                ListFooterComponent={
                    <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                        {/* <Text style={{ fontSize: 17, color: '#111d5e', alignSelf: 'flex-start', margin: 5, fontWeight: "bold" }}>Bag Items : </Text> */}
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
                        <Text style={{ color: '#FFF', fontSize: 15 }}>{noticeDeliveryCharge}</Text>
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
                <ItemResume title='SubTotal' price={totalAmountMedicine} />
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