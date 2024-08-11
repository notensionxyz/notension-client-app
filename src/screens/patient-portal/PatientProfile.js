import React, { useEffect, useState, useRef } from 'react';
import NetInfo from "@react-native-community/netinfo";
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Dimensions,
    Pressable,
    Alert,
    BackHandler,
    TouchableOpacity
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/core';
import HeaderCommon from '../../components/header/HeaderCommon';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import Select from '../../components/screens-components/Common/Select';
import DatePicker from 'react-native-date-picker'
import useValidation from '../../helpers/useValidation';
import { usePatient } from '../../hooks/fetch-data-by-module/health-care/usePatient';

const screenWidth = Dimensions.get('window').width;
let connectionStatus = 'true';
let isReachable = 'true';

const typeOfDiscount = [
    {
        text: 'Male',
        value: 'Male',
    },
    {
        text: 'Female',
        value: 'Female',
    }
];

let initialValue = '';

let initialCustomType = 'Select Gender';

const PatientProfile = ({ route }) => {
    //console.log(route?.params?.data)
    const data = route?.params?.data;
    const action = route?.params?.action;
    const timerRef = useRef(null);
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [open, setOpen] = useState(false)
    const [errors, setErrors] = useState([]);
    const [clickOnSubmit, setClickOnSubmit] = useState(false);

    let [information, setInformation] = useState(data);

    const {
        progressing,
        setProgressing,
        registerPatient,
        updatePatientProfile,
    } = usePatient();

    useEffect(() => {
        initialValue = data?.gender;
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate = new Date(data?.date_of_birth).toLocaleDateString('en-GB', options);
        setDateOfBirth(formattedDate);

        const backAction = () => {
            navigation.goBack();
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);

    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setInformation((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            if (clickOnSubmit) {
                information[name] = value;
                validatePatientInformation(information, setErrors);
            }
        }, 500);
    };

    const onPick = (name) => {
        return (e) => {
            handleDataChange({
                target: {
                    name: name,
                    value: e.value,
                },
            });
        };
    };

    let cardMargin = 4;
    let cardWidth = screenWidth - (cardMargin * 3);

    const { validatePatientInformation } = useValidation();

    const getConnectionStatus = () => {
        setProgressing(true);
        setClickOnSubmit(true);
        const isInputValid = validatePatientInformation(information, setErrors);
        NetInfo.fetch().then(state => {
            connectionStatus = state.isConnected;
            isReachable = state.isInternetReachable;
        });
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
        }, 800);
    }

    const saveInformation = () => {
        if (connectionStatus && isReachable) {
            if (action === 'register') {
                registerPatient(information);
            } else {
                updatePatientProfile(information);
            }
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
        <View style={{ flex: 1, backgroundColor: '#d7daf7', alignItems: 'center', width: screenWidth }}>
            <ProgressStyle2 visible={progressing} />
            <HeaderCommon toggleDrawer={navigation} title="Patient's Profile" connectionStatus={false} isReachable={false} />
            <ScrollView>
                <View style={styles.body}>
                    <View style={{
                        backgroundColor: '#7903d1',
                        //paddingHorizontal: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                        marginBottom: 10
                    }}>
                        <View style={{ flex: 1, paddingTop: 5 }}>
                            <Text style={{ color: '#FFF', fontSize: 15, textAlign: 'justify', fontWeight: '600' }}>## রোগীর জন্ম তারিখ নিশ্চিত করা কেন গুরুত্বপূর্ণ?</Text>
                            <Text style={{ color: '#FFF', fontSize: 14, textAlign: 'justify' }}>রোগীর যত্নের সাথে সঠিক চিকিৎসা, ওষুধ এবং সম্ভাব্য সমস্যা এড়াতে রোগীর বয়স গুরুত্বপূর্ণ। রোগীর বয়সও বহুলাংশে নির্ধারণ করতে পারে যে ধরনের মেডিকেল পরীক্ষাগুলি প্রয়োজনীয় এবং ফলাফলের জন্য প্রভাব রয়েছে। বয়স্ক রোগীদের আরও গভীরভাবে পরীক্ষার প্রয়োজন হতে পারে।</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 8 }}>
                        <Text>
                            <Text style={styles.level}>Patient Name ( রোগীর নাম )</Text><Text style={styles.alert}> *</Text>
                        </Text>
                        <TextInput placeholder='' keyboardType='default' secureTextEntry={false} multiline={true}
                            placeholderTextColor='gray'
                            onChangeText={(text) => {
                                handleDataChange({
                                    target: {
                                        name: 'patient_name',
                                        value: text,
                                    },
                                });
                            }}
                            value={information.patient_name}
                            style={styles.textBox} />
                        {clickOnSubmit && errors?.patient_name && (<Text style={styles.alert}>{errors?.patient_name}</Text>)}

                        <Text style={styles.level}>
                            <Text style={styles.level}>Contact ( মোবাইল নাম্বার )</Text><Text style={styles.alert}> *</Text>
                        </Text>
                        <TextInput placeholder='' keyboardType='numeric' secureTextEntry={false} multiline={true}
                            placeholderTextColor='gray'
                            onChangeText={(text) => {
                                handleDataChange({
                                    target: {
                                        name: 'contact',
                                        value: text,
                                    },
                                });
                            }}
                            value={information.contact}
                            style={styles.textBox} />
                        {clickOnSubmit && errors?.contact && (<Text style={styles.alert}>{errors?.contact}</Text>)}

                        <Text style={styles.level}>Alt. Contact (বিকল্প মোবাইল নাম্বার )</Text>
                        <TextInput placeholder='' keyboardType='numeric' secureTextEntry={false} multiline={true}
                            placeholderTextColor='gray'
                            onChangeText={(text) => {
                                handleDataChange({
                                    target: {
                                        name: 'alternative_contact',
                                        value: text,
                                    },
                                });
                            }}
                            value={information.alternative_contact}
                            style={styles.textBox} />
                        {clickOnSubmit && errors?.alternative_contact && (<Text style={styles.alert}>{errors?.alternative_contact}</Text>)}

                        <DatePicker
                            modal
                            mode="date"
                            maximumDate={new Date()}
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                //console.log(date);
                                setDate(date);

                                const originalDate = date.toISOString().split('T')[0];
                                //console.log(date.toISOString().split('T')[0])
                                //const [year, month, day] = originalDate.split('-');
                                // Rearrange the components to DD-MM-YYYY format
                                //const formattedDate = `${day}-${month}-${year}`;

                                const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
                                const formattedDate = new Date(date).toLocaleDateString('en-GB', options);
                                //console.log(formattedDate);
                                setDateOfBirth(formattedDate);

                                handleDataChange({
                                    target: {
                                        name: 'date_of_birth',
                                        value: originalDate,
                                    },
                                });
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />

                        <View style={{ flexDirection: 'row', marginTop: 3 }}>
                            <View style={{ width: "60%" }}>
                                <TouchableOpacity onPress={() => setOpen(true)}>
                                    <Text style={styles.level}>Date of birth (জন্ম তারিখ)</Text>
                                    <TextInput placeholder='' keyboardType='default' secureTextEntry={false}
                                        placeholderTextColor='gray'
                                        editable={false}
                                        value={dateOfBirth}
                                        style={styles.textBox} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "5%" }}></View>
                            <View style={{ width: "35%" }}>
                                <Text style={styles.level}>Gender (লিঙ্গ)</Text>
                                <Select initial_value={initialValue} data={typeOfDiscount} selectText={'Select Gender'} onPress={onPick('gender')} />
                            </View>
                        </View>

                        <Text style={styles.level}>Email (ইমেইল)</Text>
                        <TextInput placeholder='' keyboardType='default' secureTextEntry={false} multiline={true}
                            placeholderTextColor='gray'
                            onChangeText={(text) => {
                                handleDataChange({
                                    target: {
                                        name: 'email',
                                        value: text,
                                    },
                                });
                            }}
                            value={information.email}
                            style={styles.textBox} />
                        {clickOnSubmit && errors?.email && (<Text style={styles.alert}>{errors?.email}</Text>)}

                        <Text style={styles.level}>Address ( ঠিকানা )</Text>
                        <TextInput placeholder='' keyboardType='default' secureTextEntry={false} multiline={true}
                            placeholderTextColor='gray'
                            onChangeText={(text) => {
                                handleDataChange({
                                    target: {
                                        name: 'address',
                                        value: text,
                                    },
                                });
                            }}
                            value={information.address}
                            style={styles.address} />
                        {clickOnSubmit && errors?.address && (<Text style={styles.alert}>{errors?.address}</Text>)}

                        <TouchableOpacity onPress={() => { getConnectionStatus(); }} style={styles.saveBtn} >
                            <Text style={{ fontSize: 17, color: 'white' }}>Save</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    // scrollView: {
    //   backgroundColor: Colors.white,
    // },

    body: {
        flex: 1,
        backgroundColor: '#d7daf7',
        justifyContent: 'center',
        borderColor: 'black',
        //borderWidth: 1,
        width: Dimensions.get('screen').width
    },
    level: {
        fontSize: 17,
        fontWeight: '500',
        color: '#006400',
        marginLeft: 5,
        marginTop: 10
    },

    level_change: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    },

    textBox: {
        height: 50,
        padding: 5,
        fontSize: 18,
        //fontWeight: 'bold',
        marginTop: 5,
        backgroundColor: 'white',
        //borderWidth: 1,
        borderColor: 'black',
        color: 'black'
    },

    alert: {
        fontSize: 16,
        color: 'red',
        marginLeft: 5,
        marginTop: 3
    },

    address: {
        height: 120,
        padding: 10,
        fontSize: 18,
        marginTop: 5,
        backgroundColor: 'white',
        //borderWidth: 1,
        borderColor: 'black',
        color: '#2c2c2c'
    },

    changeLocBtn: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: '#ff9800',
        borderRadius: 8,
        shadowRadius: 8,
        marginTop: 5,
        shadowOpacity: 0.3,
        marginBottom: 5
    },

    saveBtn: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: '#ff5722',
        marginTop: 55,
        shadowOpacity: 0.3,
        marginBottom: 45
    }

});

export default PatientProfile;