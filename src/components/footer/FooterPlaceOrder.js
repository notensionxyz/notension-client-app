import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

let totalItem = 0;
let totalSalePrice = 0;

export default function FooterPlaceOrder(props) {
    const navigation = useNavigation();
    const isLoggedin = useSelector((state) => state.user.isLoggedin);
    const cartItems = useSelector((state) => state.cartItems);
    const [tab, setTab] = useState('bag');

    if (props.module === 'Grocery') {
        totalItem = cartItems.groceryItems.length;
        totalSalePrice = props.grandTotal;
    }

    if (props.module === 'Medicine') {
        totalItem = cartItems.medicineItems.length;
        totalSalePrice = props.grandTotal;
    }

    if (props.module === 'Food') {
        totalItem = cartItems.foodItems.length;
        totalSalePrice = props.grandTotal;
    }

    const processToPlaceOrder = () => {
        if (isLoggedin) {
            if (props.module === 'Grocery') {
                if (cartItems.groceryItems.length > 0) {
                    navigation.navigate('PlaceOrderGrocery');
                } else {
                    showMassage();
                }
            }

            if (props.module === 'Medicine') {
                if (cartItems.medicineItems.length > 0) {
                    navigation.navigate('PlaceOrderMedicine');
                } else {
                    showMassage();
                }
            }

            if (props.module === 'Food') {
                if (cartItems.foodItems.length > 0) {
                    navigation.navigate('PlaceOrderFood');
                } else {
                    showMassage();
                }
            }
        } else {
            navigation.navigate('Login')
        }
    }

    const showMassage = () => {
        props.setShowErrorMessage(true);
        props.setMessage('Please add Item(s) in cart!!');
    }

    const navigateToHome = () => {
        if (props.module === 'Grocery') {
            navigation.navigate('ExploreGroceryShop');
        }

        if (props.module === 'Medicine') {
            navigation.navigate('ExploreMedicineShop');
        }

        if (props.module === 'Food') {
            navigation.navigate('ExploreFoodShop');
        }
    }

    return (
        <View style={{ height: 48, backgroundColor: 'white', flexDirection: 'row', borderTopWidth: 0.5, borderBottomColor: '#006400' }}>
            <TouchableOpacity onPress={() => { navigateToHome() }}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ width: 20, height: 20, tintColor: tab === 'home' ? '#ff2e93' : '#006400' }}
                    resizeMode={'contain'}
                    source={require('../../assets/icon/home.png')} />
                <Text style={{
                    color: tab === 'home' ? '#ff2e93' : '#006400',
                    fontSize: 17,
                    fontWeight: 'bold'
                }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { processToPlaceOrder(); }}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ width: 120, height: 38, tintColor: tab === 'bag' ? '#006400' : '#006400' }}
                    resizeMode={'contain'}
                    source={require('../../assets/icon/Place-Order-1.png')} />
            </TouchableOpacity>
            <TouchableOpacity
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ width: 20, height: 20, tintColor: tab === 'nearby' ? '#ff2e93' : '#006400' }}
                    resizeMode={'contain'}
                    source={require('../../assets/icon/bdt.png')} />
                <Text style={{
                    color: tab === 'nearby' ? '#ff2e93' : '#006400',
                    fontSize: 17,
                    fontWeight: 'bold',
                    marginTop: 0,
                }}>Tk {parseFloat(totalSalePrice).toFixed(2)}</Text>
            </TouchableOpacity>
        </View>

    );
}