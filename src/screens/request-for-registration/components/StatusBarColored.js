import React from 'react';
import { View, StatusBar, Platform, Dimensions } from "react-native";
import { logoColor_1 } from '../../helpers/Constants';


const screenWidth = Dimensions.get('window').width;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;

function StatusBarColored() {
    return (
        <View style={{ height: STATUS_BAR_HEIGHT }}>
            <StatusBar translucent backgroundColor={logoColor_1} barStyle="white" />
        </View>
    );
}

export default StatusBarColored;