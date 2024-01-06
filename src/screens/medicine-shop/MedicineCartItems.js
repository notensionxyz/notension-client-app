import React, { useState, useEffect } from 'react';
import { Dimensions, FlatList, Text, View, SafeAreaView, BackHandler, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useSelector } from "react-redux"
import { useNavigation } from '@react-navigation/native';
//import PlaceOrderFooter from "../appcomponents/footer/PlaceOrderFooter";
import HeaderCommon from '../../components/header/HeaderCommon';
import CartProductList from '../../components/screens-components/GroceryShop/products/CartProductList';
import { handleMedicineItems } from '../../hooks/cart-handler/handleMedicineItems';

const screenWidth = Dimensions.get('window').width;

let connectionStatus = 'true';
let isReachable = 'true';
let loading = true;

const MedicineCartItems = (props) => {
    const navigation = useNavigation();
    const visitedGroceryStore = useSelector((state) => state.dashboard.visitedGroceryStore);
    const minOrderAmount = visitedGroceryStore?.min_purchage_amount || 0;
    const deliveryCharge = visitedGroceryStore?.max_delivery_charge || 0;
    const minDeliveryCharge = visitedGroceryStore?.min_delivery_charge || 0;
    const noticeDeliveryCharge = visitedGroceryStore?.delivery_notice || '';
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

    const {
        medicineItems,
        totalAmountMedicine,
        getQty,
        addToCart,
        removeFromCart,
        deccreseQty,
        isInOutOfStockList
    } = handleMedicineItems();

    return (

        <SafeAreaView style={{ flex: 1 }}>
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
                    {parseFloat(totalAmountMedicine) < parseFloat(minOrderAmount) ?
                        <ItemResume title='Delivery Charge' price={parseFloat(totalAmountMedicine) > 0 ? (deliveryCharge).toFixed(2) : '0.00'} />
                        :
                        <ItemResume title='Delivery Charge' price={(minDeliveryCharge).toFixed(2)} />
                    }
                </View>

                {/* <PlaceOrderFooter totalSalePrice={
                    parseFloat(totalAmountMedicine) > 0 && parseFloat(totalAmountMedicine) < parseFloat(minOrderAmount) ? (
                        parseFloat(totalAmountMedicine) + parseFloat(deliveryCharge)
                    ) : parseFloat(totalAmountMedicine) > 0 && parseFloat(totalAmountMedicine) >= parseFloat(minOrderAmount) ? (
                        parseFloat(totalAmountMedicine) + parseFloat(minDeliveryCharge)
                    )
                        : 0
                }
                /> */}
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

export default MedicineCartItems;