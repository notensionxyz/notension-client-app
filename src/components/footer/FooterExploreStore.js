import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

let totalItem = 0;
let totalSalePrice = 0;

export default function FooterExploreStore(props) {
    const cartItems = useSelector((state) => state.cartItems);
    const [tab, setTab] = useState('');
    const navigation = useNavigation();
    if (props.module === 'Grocery') {
        totalItem = cartItems.groceryItems.length;
        totalSalePrice = cartItems.totalAmountGrocery;
    }

    const navigateTo = () => {
        if (props.module === 'Grocery') {
            navigation.navigate('GroceryCartItems');
        }
    }

    return (
        <View style={{ height: 48, backgroundColor: 'white', flexDirection: 'row', borderTopWidth: 0.5, borderBottomColor: '#006400' }}>

            <TouchableOpacity onPress={() => null}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ width: 22, height: 22, tintColor: tab === 'home' ? '#ff2e93' : '#006400' }}
                    resizeMode={'contain'}
                    source={require('../../assets/icon/phone.png')} />
                <Text style={{
                    color: tab === 'home' ? '#ff2e93' : '#006400',
                    fontSize: 17,
                    fontWeight: 'bold',
                    marginTop: -2,
                }}>Call Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigateTo(); }}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ width: 20, height: 20, tintColor: tab === 'bag' ? '#ff2e93' : '#006400' }}
                        resizeMode={'contain'}
                        source={require('../../assets/icon/bag.png')} />
                    {totalItem > 0 ? (
                        <View
                            style={{
                                position: 'absolute',
                                backgroundColor: '#006400',
                                width: 19,
                                height: 19,
                                borderRadius: 19 / 2,
                                right: 21,
                                top: 0,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: "#FFFFFF",
                                    fontSize: 14
                                }}>
                                {totalItem}
                            </Text>
                        </View>
                    ) : null}
                    <Text style={{
                        color: tab === 'bag' ? '#ff2e93' : '#006400',
                        fontSize: 17,
                        fontWeight: 'bold',
                        marginTop: 0,
                    }}>Place Order</Text>
                </View>
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