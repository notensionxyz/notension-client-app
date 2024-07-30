import React from 'react';
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { BackgroundColor_1, logoColor_1, logoColor_2 } from '../../helpers/Constants';

const screenWidth = Dimensions.get('window').width;

export default function HeaderFoodModule() {
    const navigation = useNavigation();
    return (
        <View style={{
            height: 45,
            width: screenWidth,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 6,
            backgroundColor: BackgroundColor_1,
            borderBottomWidth: 0.5,
            borderBottomColor: logoColor_1,
        }}>
            <TouchableOpacity onPress={() => navigation.goBack()}
                style={{ padding: 9, marginTop: 7, paddingLeft: 15 }}>
                <Image source={require('../../assets/icon/ic_arrow_back.png')}
                    style={{ height: 23, width: 23, resizeMode: 'contain', tintColor: '#006400' }} />
            </TouchableOpacity>
            <View style={{ height: 50, width: '75%', overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../../assets/banner/Food-Module.png')} style={{ height: 40, width: '85%' }} />
            </View>
            <TouchableOpacity onPress={() => { navigation.toggleDrawer(); }}
                style={{ padding: 10, marginTop: 7, alignItems: 'flex-end',paddingLeft: 15, }}>
                <Image source={require('../../assets/icon/ic_home.png')} style={{ height: 18, width: 18, tintColor: '#48d7ff', resizeMode: 'contain', tintColor: '#006400', alignItems: 'flex-end' }} />
            </TouchableOpacity>
        </View>
    );
}