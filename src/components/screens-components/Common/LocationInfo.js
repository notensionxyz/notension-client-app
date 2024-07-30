import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Dimensions, View, Image, Text, TouchableOpacity } from "react-native";
import { logoColor_2 } from '../../../helpers/Constants';
import { useSelector } from "react-redux"

const screenWidth = Dimensions.get('window').width;

const LocationInfo = () => {
    const { defaultUserLocation } = useSelector((state) => state.user);
    const navigation = useNavigation();
    return (
        <View style={{ width: screenWidth, flexDirection: 'row', padding: 8, paddingRight: 15, justifyContent: 'space-between', backgroundColor: '#fff5e6' }}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={require('../../../assets/icon/ic_place_blue.png')}
                    style={{ width: 25, height: 25, tintColor: '#ff3300', resizeMode: 'contain' }} />
                <Text style={{ fontSize: 16, color: logoColor_2, marginLeft: 3 }}>Location : {defaultUserLocation?.districtName}</Text>
            </View>
            <TouchableOpacity
                style={{
                    width: 30, height: 25,
                    backgroundColor: 'transparent'
                }} onPress={() => { navigation.navigate('ResetLocation'); }}>
                <Image source={require('../../../assets/icon/ic_edit.png')}
                    style={{ width: 20, height: 20, tintColor: '#009933', resizeMode: 'contain' }} />
            </TouchableOpacity>
        </View>
    );
};
///uYvm6_ZLMS4t8GdlG8NZZIhLfWk=
export default LocationInfo;