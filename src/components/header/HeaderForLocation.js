import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { BackgroundColor_1, logoColor_1, logoColor_2 } from '../../helpers/Constants';

const screenWidth = Dimensions.get('window').width;

export default function HeaderForLocation(props) {
    const navigation = useNavigation();
    const inputText = (text) => {
       // props.onInputText(text);
    };
    return (
        <View style={{
            height: 45,
            width: screenWidth,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 4,
            backgroundColor: BackgroundColor_1,
            //elevation: 10,
            //shadowOffset: { width: 0, height: 5 },
            //shadowOpacity: 0.3
        }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 8, marginTop: 0 }}>
                <Image source={require('../../assets/icon/ic_arrow_back.png')}
                    style={{ height: 25, width: 25, resizeMode: 'contain', tintColor: logoColor_2 }} />
            </TouchableOpacity>
            <View style={{
                width: '76%',
                alignItems: 'center',
                backgroundColor: 'white',
                marginLeft: 8,
                borderRadius: 25,
            }}>
                <TextInput placeholder='Search here....' keyboardType='default' secureTextEntry={false}
                    placeholderTextColor='grey'
                    onChangeText={text => inputText(text)}
                    style={{
                        flex: 1,
                        height: 35,
                        width: '100%',
                        borderRadius: 25,
                        paddingLeft: 15,
                        padding: 2,
                        fontSize: 18,
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: logoColor_1,
                        color: '#2c2c2c'
                    }} />
            </View>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10, alignItems: 'flex-end' }}>
                <Image source={require('../../assets/icon/ic_search_gray.png')} style={{ height: 25, width: 25, tintColor: logoColor_2, resizeMode: 'contain' }} />
            </TouchableOpacity>
        </View>
    );
}