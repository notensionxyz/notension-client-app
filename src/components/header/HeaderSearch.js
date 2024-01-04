import React from 'react';
import { Image, TouchableOpacity, View, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function HeaderSearch(props) {

    const navigation = useNavigation();
    const inputText = (text) => {
        props.onInputText(text);
    };

    return (

        <View style={{ width: '100%', backgroundColor: 'white', flexDirection: 'row', borderBottomWidth: 0.8, borderBottomColor: '#006400' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}
                style={{ padding: 9, marginTop: 7, paddingLeft: 18 }}>
                <Image source={require('../../assets/icon/ic_arrow_back.png')}
                    style={{ height: 23, width: 23, resizeMode: 'contain', tintColor: '#006400' }} />
            </TouchableOpacity>
            <View style={{ flex: 1, paddingVertical: 4 }}>
                <View style={{
                    width: '93%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    marginHorizontal: 2,
                }}>
                    <TextInput placeholder='Search here.... e.g milk, চিনি' keyboardType='default' secureTextEntry={false}
                        placeholderTextColor='grey'
                        autoFocus={true}
                        onChangeText={text => inputText(text)}
                        style={{
                            flex: 1,
                            height: 36,
                            paddingLeft: 10,
                            padding: 2,
                            fontSize: 19,
                            marginTop: 5,
                            backgroundColor: 'transparent',
                            borderWidth: 1,
                            borderColor: '#006400',
                            color: '#2c2c2c'
                        }} />
                </View>
            </View>
            {props.connectionStatus && props.isReachable ?
                <TouchableOpacity onPress={() => { props.toggleDrawer.toggleDrawer(); }}
                    style={{ paddingLeft: 0, paddingRight: 13, padding: 10, marginTop: 7 }}>
                    <Image source={require('../../assets/icon/ic_home.png')} style={{ height: 18, width: 18, tintColor: '#48d7ff', resizeMode: 'contain', tintColor: '#006400' }} />
                </TouchableOpacity>
                : <TouchableOpacity style={{ paddingLeft: 0, paddingRight: 13, padding: 10, marginTop: 7 }}>
                    <Image source={require('../../assets/icon/ic_home.png')} style={{ height: 18, width: 18, tintColor: '#48d7ff', resizeMode: 'contain', tintColor: '#006400' }} />
                </TouchableOpacity>
            }
        </View>

    );
}
