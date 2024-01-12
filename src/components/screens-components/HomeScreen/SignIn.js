import React, { useState, useEffect } from 'react';
import { Image, StatusBar, ImageBackground, Text, TouchableOpacity, View, TextInput, StyleSheet } from "react-native";
import { internetConnectionStatus } from '../../../helper/urlLinking';
import { useAdminInformation } from '../../../hooks/useUser';

let margin = 10;

function Login() {
    const [contact_no, setContact] = useState('01719662995')
    const [pin_code, setPin] = useState('40041')
    const [isInternetConnected, setIsInternetConnected] = useState(true);
    const [invalidInput, setInvalidInput] = useState(false)
    const [verifying, setVerifying] = useState(false)
    const { verifyUser } = useAdminInformation();

    useEffect(() => {
        internetConnectionStatus(setIsInternetConnected);
    }, []);

    const timerRef = React.useRef(null);
    const signIn = async () => {
        setVerifying(true);
        internetConnectionStatus(setIsInternetConnected);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            if (isInternetConnected) {
                verifyUser({
                    contact_no,
                    pin_code,
                    setInvalidInput,
                    setVerifying,
                });
            } else {
                setVerifying(false);
            }
        }, 1000);
    };

    return (
        <>
            <StatusBar translucent backgroundColor='transparent' />
            <ImageBackground source={require('../../../assets/banner/login.jpg')}
                style={{ flex: 1, backgroundColor: 'gray' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, margin: margin, justifyContent: 'center' }}>
                        <View style={{ padding: margin, backgroundColor: 'white' }}>
                            <View style={styles.iconView}>
                                <Image source={require('../../../assets/icon/ic_diamond.png')}
                                    style={{ height: 50, width: 50, resizeMode: 'contain' }} />
                            </View>

                            <TextInput placeholder='Username' keyboardType='numeric' secureTextEntry={false}
                                placeholderTextColor='gray'
                                style={styles.textBox} />

                            <TextInput placeholder='Password' keyboardType='numeric' secureTextEntry={true}
                                placeholderTextColor='gray'
                                style={styles.textBox} />
                        </View>
                        <TouchableOpacity
                            onPress={() => { signIn(); }}
                            style={styles.signInBtn} >
                            <Text style={{ fontSize: 14, color: 'white', backgroundColor: '#ff5722' }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({

    iconView: {
        width: 86,
        height: 86,
        marginTop: -60,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        borderRadius: 50,
    },

    textBox: {
        height: 44,
        padding: 10,
        marginTop: 10,
        backgroundColor: '#f1f5f7',
        borderWidth: 0,
        borderColor: 'white',
        color: '#2c2c2c'
    },

    signInBtn: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        marginTop: 25,
        backgroundColor: '#ff5722'
    },
});

export default Login;