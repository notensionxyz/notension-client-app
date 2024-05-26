import React, { useState, useEffect } from 'react';
import { Dimensions, TextInput, Text, TouchableOpacity, View, Alert, ScrollView, Keyboard, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import RNOtpVerify from 'react-native-otp-verify';
import {
    getHash, requestHint,
    startOtpListener,
    useOtpVerify,
} from 'react-native-otp-verify';
import useValidation from '../../helpers/useValidation';
import { useUser } from '../../hooks/useUser';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import HeaderCommon from '../../components/header/HeaderCommon';

const screenWidth = Dimensions.get('window').width;
const hight = (screenWidth / 2) - 7;

let connectionStatus = true;
let isReachable = true;
let isInputValid = 1;
let RandomNumber = 1;
let hashKey = '1';

export default function SignUp({ route }) {
    // using hook - you can use the startListener and stopListener to manually trigger listeners again.
    const { hash, otp, timeoutError, stopListener, startListener } = useOtpVerify();
    //console.log('otp : ', otp);
    const mobileNo = route.params.mobileNo;
    const [errors, setErrors] = React.useState([]);
    const [clickOnSubmit, setClickOnSubmit] = useState(false);
    const [inputOtp, setInputOtp] = useState('');
    const {
        isUserRegistered,
        progressing,
        setProgressing,
        userInfo,
        handleDataChange,
        getOtp,
        registerUser
    } = useUser();

    useEffect(() => {
        RandomNumber = Math.floor(Math.random() * 8999 + 1000);

        getHash().then(hash => {
            hashKey = hash[0];
            setTimeout(() => { sendSms(); }, 200);
        }).catch(console.log);

        startOtpListener(message => {
            // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
            const otp = /(\d{4})/g.exec(message)[1];
            setInputOtp(otp);
        });

        const removeListener = () => {
            // Call the function to stop the OTP listener
            stopListener();
        };

        return () => removeListener();
    }, []);



    const removeOtpListener = () => {
        RNOtpVerify.removeListener();
    };

    const getConnectionStatus = () => {
        connectionStatus = 'false';
        isReachable = 'false';
        NetInfo.fetch().then(state => {
            connectionStatus = state.isConnected;
            isReachable = state.isInternetReachable;
        });
    }

    const sendSms = () => {
        setProgressing(true);
        if (connectionStatus && isReachable) {
            getOtp({
                contact_no: mobileNo,
                otp: RandomNumber,
                smsKey: hashKey,
            });
        } else {
            setProgressing(false);
            Alert.alert("Hold on!", "Internet Connection Lost", [
                {
                    text: "OK",
                    onPress: () => null,
                    style: "OK"
                },
            ]);
        }
    }

    const resendOPT = () => {
        startListener();
        setTimeout(() => {
            sendSms();
        }, 200);
    }

    const { validateUserInformation } = useValidation();

    const verifyAndSave = () => {
        setClickOnSubmit(true);
        const isInputValid = validateUserInformation(userInfo, setErrors);
        getConnectionStatus();
        if (parseFloat(RandomNumber) !== parseFloat(inputOtp)) {
            Alert.alert("Hold on!", "Please enter Valid OTP", [
                {
                    text: "OK",
                    onPress: () => null,
                    style: "OK"
                },
            ]);

        } else {
            setProgressing(true);
            setTimeout(() => {
                if (isInputValid) {
                    saveInformation();
                } else {
                    setProgressing(false);
                    Alert.alert("Something went wrong!", "Please Check !!!!", [
                        {
                            text: "OK",
                            onPress: () => null,
                            style: "OK"
                        },
                    ]);
                }
            }, 500);
        }
    }

    const saveInformation = () => {
        if (connectionStatus && isReachable) {
            registerUser();
        } else {
            setProgressing(false);
            Alert.alert("Hold on!", "Internet Connection Lost", [
                {
                    text: "OK",
                    onPress: () => null,
                    style: "OK"
                },
            ]);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
            <ProgressStyle2 visible={progressing} />
            <HeaderCommon title="Sign Up" toggleDrawer={null} />
            <ScrollView>
                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <View style={{
                        marginTop: 15,
                        backgroundColor: '#7903d1',
                        paddingHorizontal: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 15
                    }}>
                        <Text style={{ fontSize: 15, color: '#FFF', paddingTop: 5, paddingBottom: 5 }}>আপনার নাম, ঠিকানা ও মোবাইলে এসএমএস এর মাধ্যমে পাঠানো চার ডিজিট এর ভেরিফিকেশন কোডটি প্রবেশ করান ।</Text>
                    </View>
                    <View style={{ marginHorizontal: 20 }}>
                        <TextInput placeholder='Full Name' keyboardType='default' secureTextEntry={false}
                            placeholderTextColor='gray'
                            onChangeText={(text) => {
                                handleDataChange(text, 'customer_name');
                            }}
                            value={userInfo?.customer_name}

                            style={{
                                height: 44,
                                padding: 10,
                                marginTop: 10,
                                backgroundColor: 'white',
                                borderWidth: 0,
                                borderColor: 'white',
                                color: '#2c2c2c'
                            }} />
                        {clickOnSubmit && errors?.customer_name && (<Text style={styles.alert}>{errors?.customer_name}</Text>)}

                        <TextInput placeholder='Address' keyboardType='default' secureTextEntry={false} multiline={true}
                            placeholderTextColor='gray'
                            onChangeText={(text) => {
                                handleDataChange(text, 'customer_address');
                            }}
                            value={userInfo?.customer_address}
                            style={{
                                height: 80,
                                padding: 10,
                                marginTop: 10,
                                backgroundColor: 'white',
                                borderWidth: 0,
                                borderColor: 'white',
                                color: '#2c2c2c'
                            }} />

                        {clickOnSubmit && errors?.customer_address && (<Text style={styles.alert}>{errors?.customer_address}</Text>)}

                        <TextInput placeholder='Alternative Contact (Optional)' keyboardType='numeric' secureTextEntry={false}
                            placeholderTextColor='gray'
                            onChangeText={(text) => {
                                handleDataChange(text.replace(/[^0-9]/g, ''), 'alternative_contact_no')
                            }}
                            value={userInfo?.alternative_contact_no}
                            style={{
                                height: 44,
                                padding: 10,
                                marginTop: 10,
                                backgroundColor: 'white',
                                borderWidth: 0,
                                borderColor: 'white',
                                color: '#2c2c2c'
                            }} />

                        {clickOnSubmit && errors?.alternative_contact_no && (<Text style={styles.alert}>{errors?.alternative_contact_no}</Text>)}

                        {!isUserRegistered &&
                            <>
                                <TextInput placeholder='Ref. Contact (Optional)' keyboardType='numeric' secureTextEntry={false}
                                    placeholderTextColor='gray'
                                    onChangeText={(text) => {
                                        handleDataChange(text.replace(/[^0-9]/g, ''), 'ref_contact')
                                    }}
                                    value={userInfo?.ref_contact}
                                    style={{
                                        height: 44,
                                        padding: 10,
                                        marginTop: 10,
                                        backgroundColor: 'white',
                                        borderWidth: 0,
                                        borderColor: 'white',
                                        color: '#2c2c2c'
                                    }} />
                                {clickOnSubmit && errors?.ref_contact && (<Text style={styles.alert}>{errors?.ref_contact}</Text>)}
                            </>
                        }


                        <TextInput placeholder='OTP কোডটি এখানে লিখুন ' keyboardType='numeric' secureTextEntry={false}
                            placeholderTextColor='gray'
                            onChangeText={(text) => { setInputOtp(text); }} value={inputOtp}
                            style={{
                                height: 44,
                                padding: 10,
                                marginTop: 10,
                                backgroundColor: 'white',
                                borderWidth: 0,
                                borderColor: 'white',
                                color: '#2c2c2c'
                            }} />

                        <TouchableOpacity onPress={() => { verifyAndSave(); }} style={{
                            height: 44,
                            alignItems: 'center',
                            justifyContent: 'center',
                            elevation: 3,
                            marginTop: 25,
                            backgroundColor: '#006400',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3
                        }} >
                            <Text style={{ fontSize: 18, color: 'white' }}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            height: 44,
                            marginVertical: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }} onPress={() => resendOPT()}>
                            <Text style={{ fontSize: 15, textAlign: 'center', color: '#006400' }}>
                                <Text>Didn't receive the code?</Text>
                                <Text style={{ fontWeight: 'bold' }}> Resend OTP</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    alert: {
        fontSize: 16,
        color: 'red',
        marginLeft: 5,
        marginTop: 3
    },
});


