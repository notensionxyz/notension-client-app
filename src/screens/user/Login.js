
import React, { useState } from 'react';
import { Dimensions, TextInput, Text, TouchableOpacity, View, Alert, BackHandler } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from '@react-navigation/native';
import HeaderCommon from '../../components/header/HeaderCommon';

import Animated, {
    runOnUI,
    setNativeProps,
    useAnimatedRef,
} from 'react-native-reanimated';


export default function Login() {
    const inputRef = React.useRef();
    const navigation = useNavigation();
    const [contact, setContact] = useState('');
    const animatedRef = useAnimatedRef();

    const verifyAndGetOTP = () => {
        if (contact.length !== 11) {
            Alert.alert("Hold on!", "Please enter 11 digit Valid Mobile Number", [
                {
                    text: "OK",
                    onPress: () => null,
                    style: "OK"
                },
            ]);
        } else {
            NetInfo.fetch().then(state => {
                if (state.isConnected && state.isInternetReachable) {
                    navigation.navigate('SignUp', { mobileNo: contact });
                } else {
                    Alert.alert("Hold on!", "Internet Connection Lost", [
                        {
                            text: "OK",
                            onPress: () => null,
                            style: "OK"
                        },
                    ]);
                }
            });
        }
    }

    const handleDataChange = (text) => {
        setContact(text);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <HeaderCommon title="Login" toggleDrawer={null} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                <View style={{ margin: 10 }}>
                    <Text style={{ marginTop: 80, fontSize: 20, alignSelf: 'center', color: '#006400' }}>Please enter your phone number</Text>
                    <Text style={{ fontSize: 16, textAlign: 'center', marginVertical: 10, color: '#006400' }}>You will receive an OTP as an SMS </Text>
                    <View style={{ paddingBottom: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
                            <TouchableOpacity
                                style={{ marginHorizontal: 10 }}
                            >
                                <Text style={{ fontSize: 18, textAlign: 'center' }}>+88</Text>
                            </TouchableOpacity>
                           
                            <TextInput placeholder='01.......' keyboardType='numeric' secureTextEntry={false}
                                placeholderTextColor='gray'
                                autoFocus={true}
                                //onChangeText={(text) => { handleDataChange(text.replace(/[^0-9]/g, '')) }}
                                onChangeText={(text) => { handleDataChange(text) }}
                                ref={animatedRef}
                                value={contact}
                                maxLength={11}
                                style={{
                                    fontSize: 18,
                                    height: 44,
                                    padding: 10,
                                    marginTop: 2,
                                    backgroundColor: 'transparent',
                                    borderWidth: 0,
                                    borderColor: 'white',
                                    color: '#2c2c2c'
                                }} />
                        </View>
                        <TouchableOpacity onPress={() => { verifyAndGetOTP(); }} style={{
                            height: 44,
                            alignItems: 'center',
                            justifyContent: 'center',
                            elevation: 3,
                            backgroundColor: '#006400',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            marginTop: 25
                        }} >
                            <Text style={{ fontSize: 18, color: 'white' }}>Login with OTP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

