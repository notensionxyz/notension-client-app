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

const AllCareServiceReg = (props) => {
    const [errors, setErrors] = React.useState([]);
    const [clickOnSubmit, setClickOnSubmit] = React.useState(false);
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    const {
        progressing,
        setProgressing,
        requestToAdd,
    } = useRegistration();

    const initialInformation = {
        retail_type: 'All Care Service',
        provider_name: '',
        address: '',
        shop_longitude: '',
        shop_latitude: '',
        contact_person: '',
        contact_no: '',
        alternative_contact_no: '',
        service_details: '',
        district_info: '',
        districtName: '',
        district_area_info: '',
        districtAreaName: '',
        //district_subarea_info: '',
        //districtSubAreaName: '',
        shop_pic: [],
        ref_contact: '01333131670',
    };

    let [information, setInformation] = useState(initialInformation);

    const { validateCareProviderInfo } = useValidation();
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
                validateCareProviderInfo(information, setErrors);
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

        setProgressing(true);
        setClickOnSubmit(true);
        const isInputValid = validateCareProviderInfo(information, setErrors);
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
        <>
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', width: screenWidth }}>
                <ProgressStyle1 visible={progressing} />
                {information?.district_info === '' && information?.shop_latitude === '' && information?.shop_longitude === '' ?
                    <ConfirmLocation setInformation={setInformation} />
                    :
                    <>
                        <HeaderCommon title={`All Care Service`} toggleDrawer={props.navigation} />
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

                                            <Pressable onPress={() => { resetLocation(); }} style={styles.changeLocBtn} >
                                                <Text style={{
                                                    fontSize: 18, color: 'white', fontWeight: 'bold', alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>Change Location</Text>
                                            </Pressable>
                                            <Text style={{ fontSize: 16, color: 'red' }}>ব্যক্তিগত প্রতিষ্ঠানের জন্য জাতীয় পরিচয়পত্র ও ছবি আপলোড করতে হবে</Text>

                                        </View>
                                    </View>
                                    <View style={{ marginHorizontal: 8 }}>
                                        <Text style={styles.level}>
                                            <Text style={styles.level}>প্রতিষ্ঠানের নাম</Text>
                                        </Text>
                                        <TextInput placeholder='' keyboardType='default' secureTextEntry={false} multiline={true}
                                            placeholderTextColor='gray'
                                            onChangeText={(text) => {
                                                handleDataChange({
                                                    target: {
                                                        name: 'provider_name',
                                                        value: text,
                                                    },
                                                });
                                            }}
                                            value={information.provider_name}
                                            style={styles.textBox} />
                                        {clickOnSubmit && errors?.provider_name && (<Text style={styles.alert}>{errors?.provider_name}</Text>)}

                                        <Text style={styles.level}>ঠিকানা</Text>
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

                                        <Text style={styles.level}>পরিষেবার(Service) বিবরণ</Text>
                                        <TextInput placeholder='' keyboardType='default' secureTextEntry={false} multiline={true}
                                            placeholderTextColor='gray'
                                            onChangeText={(text) => {
                                                handleDataChange({
                                                    target: {
                                                        name: 'service_details',
                                                        value: text,
                                                    },
                                                });
                                            }}
                                            value={information.service_details}
                                            style={styles.address} />
                                        {clickOnSubmit && errors?.service_details && (<Text style={styles.alert}>{errors?.service_details}</Text>)}

                                        <Text style={styles.level}>যোগাযোগের ব্যক্তির নাম</Text>
                                        <TextInput placeholder='' keyboardType='default' secureTextEntry={false} multiline={true}
                                            placeholderTextColor='gray'
                                            onChangeText={(text) => {
                                                handleDataChange({
                                                    target: {
                                                        name: 'contact_person',
                                                        value: text,
                                                    },
                                                });
                                            }}
                                            value={information.contact_person}
                                            style={styles.textBox} />
                                        {clickOnSubmit && errors?.contact_person && (<Text style={styles.alert}>{errors?.contact_person}</Text>)}

                                        <Text style={styles.level}>মোবাইল নং</Text>
                                        <TextInput placeholder='' keyboardType='numeric' secureTextEntry={false} multiline={true}
                                            placeholderTextColor='gray'
                                            onChangeText={(text) => {
                                                handleDataChange({
                                                    target: {
                                                        name: 'contact_no',
                                                        value: text,
                                                    },
                                                });
                                            }}
                                            value={information.contact_no}
                                            style={styles.textBox} />
                                        {clickOnSubmit && errors?.contact_no && (<Text style={styles.alert}>{errors?.contact_no}</Text>)}

                                        <Text style={styles.level}>বিকল্প মোবাইল নম্বর</Text>
                                        <TextInput placeholder='' keyboardType='numeric' secureTextEntry={false} multiline={true}
                                            placeholderTextColor='gray'
                                            onChangeText={(text) => {
                                                handleDataChange({
                                                    target: {
                                                        name: 'alternative_contact_no',
                                                        value: text.replace(/[^0-9]/g, ""),
                                                    },
                                                });
                                            }}
                                            value={information.alternative_contact_no}
                                            style={styles.textBox} />
                                        {clickOnSubmit && errors?.alternative_contact_no && (<Text style={styles.alert}>{errors?.alternative_contact_no}</Text>)}

                                        <MultipleImageUploader
                                            selectedImages={selectedImages}
                                            setSelectedImages={setSelectedImages}
                                            handleImage={handleImagesDetailProduct}
                                            handleImageDelete={handleImageDelete}
                                        />
                                        {clickOnSubmit && errors?.shop_pic && (<Text style={styles.alert}>{errors?.shop_pic}</Text>)}

                                        <Text style={styles.level}>Ref Number (Optional) </Text>
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
                                        <Text style={styles.alert}>Only for the marketing person</Text>
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
        </>
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
        height: 120,
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
    }

});

export default AllCareServiceReg;