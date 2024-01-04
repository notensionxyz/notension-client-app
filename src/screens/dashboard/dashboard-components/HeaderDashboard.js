import React from 'react';
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { BackgroundColor_1, logoColor_1, logoColor_2 } from '../../../helpers/Constants';

const screenWidth = Dimensions.get('window').width;

export default function HeaderHomePage(props) {
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

            <TouchableOpacity onPress={() => { props.toggleDrawer.toggleDrawer(); }}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignItems: 'flex-start', padding: 10 }}>
                <Image source={require('../../../assets/icon/ic_home.png')} style={{ height: 16, width: 18, tintColor: logoColor_2, resizeMode: 'contain' }} />
            </TouchableOpacity>

            <View style={{ height: 40, width: screenWidth - 30, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../../../assets/banner/App-Heading.png')} style={{ height: 36, width: 198 }} />
            </View>

        </View>
    );
}


