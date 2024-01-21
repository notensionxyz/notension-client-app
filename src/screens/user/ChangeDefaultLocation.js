import React, { useState, useEffect } from 'react';
import { Dimensions, TextInput, Text, TouchableOpacity, View, Alert, ScrollView, Keyboard, BackHandler } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import useValidation from '../../helpers/useValidation';
import { useUser } from '../../hooks/useUser';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const hight = (screenWidth / 2) - 7;

let connectionStatus = true;
let isReachable = true;

export default function ChangeDefaultLocation() {
    const [errors, setErrors] = React.useState([]);
    const [clickOnSubmit, setClickOnSubmit] = useState(false);

    const {
        progressing,
        setProgressing,
        userInfo,
        handleDataChange,
        registerUser
    } = useUser();

    //console.log(userInfo);

    const navigation = useNavigation();
    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            // setVisible(false);
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const getConnectionStatus = () => {
        connectionStatus = 'false';
        isReachable = 'false';
        NetInfo.fetch().then(state => {
            connectionStatus = state.isConnected;
            isReachable = state.isInternetReachable;
        });
    }

    const { validateUserInformation } = useValidation();

    const verifyAndSave = () => {
        setClickOnSubmit(true);
        const isInputValid = validateUserInformation(userInfo, setErrors);
        getConnectionStatus();
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
            <HeaderCommon title="Update Location" toggleDrawer={null} />
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
                        <Text style={{ fontSize: 15, color: '#FFF', paddingTop: 5, paddingBottom: 5 }}>আপনার নাম, বর্তমান ঠিকানা ও বিকল্প মোবাইল নম্বর ( থাকলে ) প্রবেশ করান ।</Text>
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
                            <Text style={{ fontSize: 18, color: 'white' }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}