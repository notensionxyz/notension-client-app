import React, { useEffect, useState } from 'react';
import NetInfo from "@react-native-community/netinfo";
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Dimensions,
    Pressable,
    Alert
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import HeaderCommon from './components/HeaderCommon';
import MultipleImageUploader from './components/MultipleImageUploader';
import ConfirmLocation from './components/ConfirmLocation';
import ProgressStyle1 from './components/ProgressStyle1';
import { useRegistration } from '../../hooks/request-for-registration/request-for-registration';
import useValidation from '../../helpers/request-for-registration/useValidation';

const screenWidth = Dimensions.get('window').width;
let connectionStatus = 'true';
let isReachable = 'true';

const RequestForRegistration = (props) => {
    const [errors, setErrors] = React.useState([]);
    const [clickOnSubmit, setClickOnSubmit] = React.useState(false);
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [inputOtp, setInputOtp] = useState('');

    const {
        progressing,
        setProgressing,
        requestToAdd,
    } = useRegistration();

    const initialInformation = {
        retail_type: 'Banking Outlet',
        outlet_info: '',
        incharge_name: '',
        incharge_contact: '',
        shop_longitude: '',
        shop_latitude: '',
        outlet_head_name: '',
        outlet_head_contact: '',
        customer_care_contact: '',
        customer_care_whatsapp_contact: '',
        district_info: '',
        districtName: '',
        district_area_info: '',
        districtAreaName: '',
        //district_subarea_info: '',
        //districtSubAreaName: '',
        shop_pic: [],
        ref_contact: '',
    };

    let [information, setInformation] = useState(initialInformation);
    //console.log('information : ', information);
    const { validateBankingOutletInformation } = useValidation();

    const timerRef = React.useRef(null);
    const resetLocation = () => {
        setInformation(initialInformation);
    }

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
                validateBankingOutletInformation(information, setErrors);
            }
        }, 500);
    };

    const handleImagesDetailProduct = (imageFiles) => {
        setImages((prevImages) => [...prevImages, ...imageFiles]);
        handleDataChange({
            target: {
                name: 'shop_pic',
                value: [...images, ...imageFiles],
            },
        });
    };

    const handleImageDelete = (index) => {
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            handleDataChange({
                target: { name: 'shop_pic', value: updatedImages },
            });
            return updatedImages;
        });
    };

    const getConnectionStatus = () => {
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
            setClickOnSubmit(true);
            const isInputValid = validateBankingOutletInformation(information, setErrors);
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
    }

    const saveInformation = () => {
        if (connectionStatus && isReachable) {
            // const {
            //     districtName,
            //     districtAreaName,
            //     districtSubAreaName,
            //     ...retailInfo
            // } = information;

            const formData = new FormData();

            for (const key in information) {
                if (key !== 'shop_pic') {
                    formData.append(key, information[key]);
                } else {
                    information[key].forEach((image, i) => {
                        if (i < 4) {
                            formData.append('shop_pic', image);
                        }
                    });
                }
            }

            requestToAdd(formData);

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

    let cardMargin = 4;
    let cardWidth = screenWidth - (cardMargin * 3);

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', width: screenWidth }}>
            <ProgressStyle1 visible={progressing} />
            {information?.district_info === '' && information?.shop_latitude === '' && information?.shop_longitude === '' ?
                <ConfirmLocation setInformation={setInformation} />
                :
                <>
                    <HeaderCommon title={`Banking outlet info`} toggleDrawer={props.navigation} />
                    <ScrollView>
                        {information.shop_longitude !== '' && information.shop_latitude !== '' &&
                            <View style={styles.body}>
                                <View style={{
                                    backgroundColor: 'gray',
                                    width: cardWidth,
                                    margin: cardMargin,
                                    flexDirection: 'row',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 10,
                                    borderRadius: 10,
                                    elevation: 3,
                                }} >
                                    <View style={{ flex: 1, padding: 10, backgroundColor: '#e4ebe5', borderRadius: 10 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#F68F1E' }}>{information?.districtName}</Text>
                                        {information?.districtAreaName &&
                                            <Text style={{ fontSize: 18, color: '#F68F1E' }}>{information?.districtAreaName}</Text>}
                                        {information?.districtSubAreaName &&
                                            <Text style={{ fontSize: 16, color: '#F68F1E' }}>{information?.districtSubAreaName}</Text>}
                                        <Pressable onPress={() => { resetLocation(); }} style={styles.changeLocBtn} >
                                            <Text style={{
                                                fontSize: 18, color: 'white', fontWeight: 'bold', alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>Change Location</Text>
                                        </Pressable>
                                    </View>
                                </View>

                                <View style={{ marginHorizontal: 8 }}>
                                    <Text style={styles.level}>Outlet Info</Text>
                                    <TextInput placeholder='' keyboardType='default' secureTextEntry={false} multiline={true}
                                        placeholderTextColor='gray'
                                        onChangeText={(text) => {
                                            handleDataChange({
                                                target: {
                                                    name: 'outlet_info',
                                                    value: text,
                                                },
                                            });
                                        }}
                                        value={information.outlet_info}
                                        style={styles.address} />
                                    {clickOnSubmit && errors?.outlet_info && (<Text style={styles.alert}>{errors?.outlet_info}</Text>)}

                                    <Text style={styles.level}>
                                        <Text style={styles.level}>Incharge Name</Text>
                                    </Text>
                                    <TextInput placeholder='' keyboardType='default' secureTextEntry={false} multiline={true}
                                        placeholderTextColor='gray'
                                        onChangeText={(text) => {
                                            handleDataChange({
                                                target: {
                                                    name: 'incharge_name',
                                                    value: text,
                                                },
                                            });
                                        }}
                                        value={information.incharge_name}
                                        style={styles.textBox} />
                                    {clickOnSubmit && errors?.incharge_name && (<Text style={styles.alert}>{errors?.incharge_name}</Text>)}

                                    <View style={{ flexDirection: 'row', marginTop: 3 }}>
                                        <View style={{ width: "60%" }}>
                                            <Text style={styles.level}>Incharge Contact No</Text>
                                            <TextInput placeholder='' keyboardType='numeric' secureTextEntry={false} multiline={true}
                                                placeholderTextColor='gray'
                                                onChangeText={(text) => {
                                                    handleDataChange({
                                                        target: {
                                                            name: 'incharge_contact',
                                                            value: text.replace(/[^0-9]/g, ""),
                                                        },
                                                    });
                                                }}
                                                value={information.incharge_contact}
                                                style={styles.textBox} />
                                        </View>
                                        <View style={{ width: "5%" }}></View>
                                        <View style={{ width: "35%" }}>
                                            <Pressable onPress={() => { sendVerificationCode(); }} style={styles.otpBtn} >
                                                <Text style={{ fontSize: 17, color: 'white' }}>Get OTP</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                    {clickOnSubmit && errors?.incharge_contact && (<Text style={styles.alert}>{errors?.incharge_contact}</Text>)}

                                    <Text style={styles.level}>Outlet Owner</Text>
                                    <TextInput placeholder='' keyboardType='default' secureTextEntry={false} multiline={true}
                                        placeholderTextColor='gray'
                                        onChangeText={(text) => {
                                            handleDataChange({
                                                target: {
                                                    name: 'outlet_head_name',
                                                    value: text,
                                                },
                                            });
                                        }}
                                        value={information.outlet_head_name}
                                        style={styles.textBox} />
                                    {clickOnSubmit && errors?.outlet_head_name && (<Text style={styles.alert}>{errors?.outlet_head_name}</Text>)}

                                    <Text style={styles.level}>Owner Contact No.</Text>
                                    <TextInput placeholder='' keyboardType='numeric' secureTextEntry={false} multiline={true}
                                        placeholderTextColor='gray'
                                        onChangeText={(text) => {
                                            handleDataChange({
                                                target: {
                                                    name: 'outlet_head_contact',
                                                    value: text,
                                                },
                                            });
                                        }}
                                        value={information.outlet_head_contact}
                                        style={styles.textBox} />
                                    {clickOnSubmit && errors?.outlet_head_contact && (<Text style={styles.alert}>{errors?.outlet_head_contact}</Text>)}

                                    <Text style={styles.level}>Customer Care No.</Text>
                                    <TextInput placeholder='' keyboardType='numeric' secureTextEntry={false} multiline={true}
                                        placeholderTextColor='gray'
                                        onChangeText={(text) => {
                                            handleDataChange({
                                                target: {
                                                    name: 'customer_care_contact',
                                                    value: text,
                                                },
                                            });
                                        }}
                                        value={information.customer_care_contact}
                                        style={styles.textBox} />
                                    {clickOnSubmit && errors?.customer_care_contact && (<Text style={styles.alert}>{errors?.customer_care_contact}</Text>)}

                                    <Text style={styles.level}>Customer Care No (Whatsapp)</Text>
                                    <TextInput placeholder='' keyboardType='numeric' secureTextEntry={false} multiline={true}
                                        placeholderTextColor='gray'
                                        onChangeText={(text) => {
                                            handleDataChange({
                                                target: {
                                                    name: 'customer_care_whatsapp_contact',
                                                    value: text,
                                                },
                                            });
                                        }}
                                        value={information.customer_care_whatsapp_contact}
                                        style={styles.textBox} />
                                    {clickOnSubmit && errors?.customer_care_whatsapp_contact && (<Text style={styles.alert}>{errors?.customer_care_whatsapp_contact}</Text>)}

                                    <MultipleImageUploader
                                        selectedImages={selectedImages}
                                        setSelectedImages={setSelectedImages}
                                        handleImage={handleImagesDetailProduct}
                                        handleImageDelete={handleImageDelete}
                                    />
                                    {clickOnSubmit && errors?.shop_pic && (<Text style={styles.alert}>{errors?.shop_pic}</Text>)}

                                    <Text style={styles.level}>Ref Number</Text>
                                    <TextInput placeholder='Ref Number' keyboardType='numeric' secureTextEntry={false}
                                        placeholderTextColor='gray'
                                        onChangeText={(text) => {
                                            handleDataChange({
                                                target: {
                                                    name: 'ref_contact',
                                                    value: text,
                                                },
                                            });
                                        }}
                                        value={information?.ref_contact}
                                        style={styles.textBox} />
                                    {clickOnSubmit && errors?.ref_contact && (<Text style={styles.alert}>{errors?.ref_contact}</Text>)}

                                    <Pressable onPress={() => { getConnectionStatus(); }} style={styles.saveBtn} >
                                        <Text style={{ fontSize: 17, color: 'white' }}>Save</Text>
                                    </Pressable>
                                </View>
                            </View>
                        }
                    </ScrollView>
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    // scrollView: {
    //   backgroundColor: Colors.white,
    // },

    body: {
        backgroundColor: Colors.white,
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        width: Dimensions.get('screen').width
    },

    level: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#006400',
        marginLeft: 5,
        marginTop: 15
    },

    level_change: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    },

    textBox: {
        height: 44,
        padding: 10,
        fontSize: 20,
        marginTop: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        color: '#2c2c2c'
    },

    alert: {
        fontSize: 16,
        color: 'red',
        marginLeft: 5,
        marginTop: 3
    },

    address: {
        height: 180,
        padding: 10,
        fontSize: 20,
        marginTop: 5,
        backgroundColor: 'white',
        borderWidth: 1,
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
    },

    otpBtn: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: '#ff5722',
        marginTop: 45,
        shadowOpacity: 0.3,
        //marginBottom: 45
    }

});

export default RequestForRegistration;