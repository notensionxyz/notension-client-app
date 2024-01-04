import React, { useEffect, useState } from 'react';
import { Dimensions, Animated, Text, View, Image } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

function InternetConnectionFailed({ reTry }) {

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={reTry}>
                    <View style={{ height: screenHeight, width: screenWidth, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../../assets/banner/no-internet.png')} style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default InternetConnectionFailed;