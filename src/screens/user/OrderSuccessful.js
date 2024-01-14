import React from 'react';
import { Dimensions, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
const screenWidth = (Dimensions.get('window').width);

function OrderSuccessful() {
    const navigation = useNavigation();
    const currentModule = useSelector((state) => state.dashboard.currentModule);
    const goBackTo = () => {
        if (currentModule === 'Grocery') {
            navigation.navigate('ExploreGroceryShop');
        } else if (currentModule === 'Food') {
            navigation.navigate('ExploreFoodModule');
        } else if (currentModule === 'Medicine') {
            navigation.navigate('ExploreMedicineShop');
        } else {
            navigation.navigate('Dashboard');
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FloatingButton size={106} style={{ backgroundColor: '#448aff', position: 'relative' }}
                    image={require('../../assets/icon/ic_check.png')}
                    imageStyle={{ width: 50, height: 50, tintColor: 'white' }}
                    onPress={() => {
                    }} />
                <Text style={{ fontSize: 20, color: '#263238', marginTop: 30 }}>Your Order is Successfull</Text>
                <Text style={{ fontSize: 14, color: '#111d5e', textAlign: 'center', marginHorizontal: 50, marginTop: 5 }}>Your
                    items will be processed as soon as possible.</Text>
            </View>
            <TouchableOpacity style={{
                width: screenWidth - 20,
                alignSelf: 'center',
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 3,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                marginBottom: 10,
                marginTop: 10,
                backgroundColor: '#111d5e'
            }} onPress={() => { goBackTo() }}>
                <Text style={{ fontSize: 14, color: 'white' }}>OK</Text>
            </TouchableOpacity>
        </View>
    );
}

function FloatingButton({ onPress, size = 57, style = { position: 'absolute' }, disabled = false, image = require('../../assets/icon/ic_plus_white.png'), imageStyle = {} }) {
    return (
        <TouchableOpacity disabled={disabled} style={[{
            height: size,
            width: size,
            bottom: style.position === 'relative' ? undefined : 20,
            right: style.position === 'relative' ? undefined : 15,
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f44336',
            elevation: 3,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3
        }, style]} onPress={onPress}>
            <Image source={image}
                style={[{ width: size * 0.3, height: size * 0.3, resizeMode: 'contain' }, imageStyle]} />
        </TouchableOpacity>

    );
}

export default OrderSuccessful;