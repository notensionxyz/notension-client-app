import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { logoColor_2 } from '../../../helpers/Constants';
import GooglePlacesInput from './GooglePlacesAutocomplete';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function HeaderForLocation({ updateState }) {
    const navigation = useNavigation();
    const inputText = (text) => {
        // props.onInputText(text);
    };

    return (
        <>
            <TouchableOpacity onPress={() => navigation.goBack()}
                style={{
                    height: screenWidth * 0.10,
                    width: screenWidth * 0.10,
                    left: screenWidth * 0.03,
                    position: 'absolute',
                    top: screenHeight * 0.03,
                    borderRadius: screenWidth * 0.05,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 4
                }}>
                <Image source={require('../../../assets/icon/ic_arrow_back.png')}
                    style={{ height: 25, width: 25, resizeMode: 'contain', tintColor: logoColor_2 }} />
            </TouchableOpacity>
            <View style={{
                position: 'absolute',
                top: screenHeight * 0.025,
                left: screenWidth * 0.15,
                flexDirection: 'row',
                alignItems: 'center',
                // paddingHorizontal: 10,
                // paddingVertical: 4,
                justifyContent: 'center',
                //marginRight: 70,
            }}>

                <View style={{
                    width: screenWidth * 0.80,
                    zIndex: 5,
                }}>
                    <GooglePlacesInput updateState={updateState} />
                </View>

                {/* <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', padding: 10, alignItems: 'flex-end' }}>
                <Image source={require('../../assets/icon/ic_search_gray.png')} style={{ height: 25, width: 25, tintColor: logoColor_2, resizeMode: 'contain' }} />
            </TouchableOpacity> */}
            </View>
        </>
    );
}