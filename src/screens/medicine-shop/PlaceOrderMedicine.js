import React, { useEffect, useState } from 'react';
import { TextInput, Text, TouchableOpacity, ScrollView, View, Image, Alert, BackHandler } from "react-native";
import NetInfo from "@react-native-community/netinfo";

import { useSelector } from 'react-redux';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { useNavigation } from '@react-navigation/native';
import HeaderCommon from '../../components/header/HeaderCommon';
import MultipleImageUploader from '../../components/form-elements/MultipleImageUploader';
import NotificationError from '../../components/popup-notification/NotificationError';
import { useOrder } from '../../hooks/fetch-data-by-module/useOrder';
import { handleMedicineItems } from '../../hooks/cart-handler/handleMedicineItems';

let connectionStatus = 'false';
let isReachable = 'false';
let isInputValid = 1;

const paymentData = [
    { id: '1', image: require('../../assets/icon/cashOnDelivery.png'), detail: 'Cash On Delivery' },
    { id: '2', image: require('../../assets/icon/visa_logo.png'), detail: 'Credit / Debit card (BD)' },
    { id: '3', image: require('../../assets/icon/mobile_banking.png'), detail: 'Mobile Banking' },
];

export default function PlaceOrderMedicine() {
    const navigation = useNavigation();
    const [discount, setDiscount] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [shippingCharge, setShippingCharge] = useState(0);
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const {
        medicineStoreInfo,
        medicineItems,
        totalAmountMedicine,
    } = useSelector((state) => state.cartItems);

    const { merchantId, customstore_id } = useSelector((state) => state.itemsByStoreReducer);
    const { isLoggedin, userInfo } = useSelector((state) => state.user);

    const minOrderAmount = medicineStoreInfo?.min_purchage_amount || 0;
    const deliveryCharge = medicineStoreInfo?.max_delivery_charge || 0;
    const minDeliveryCharge = medicineStoreInfo?.min_delivery_charge || 0;
    const less = medicineStoreInfo?.less || 0;
    const less_type = medicineStoreInfo?.less_type || 'Percent'
    const maximum_less = medicineStoreInfo?.maximum_less || 0;
    const minimum_order_for_less = medicineStoreInfo?.minimum_order_for_less || 0;

    const [paymentOption, setPaymentOption] = useState(paymentData[0]);
    const [remarks, setRemarks] = useState('');

    const {
        progressing,
        showErrorMessage,
        message,
        setMessage,
        setShowErrorMessage,
        placceOrder
    } = useOrder();

    const {proceedToPlaceOrder} = handleMedicineItems();

    useEffect(() => {
        proceedToPlaceOrder();
        getGrandTotal();
        const backAction = () => {
            navigation.goBack();
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [medicineStoreInfo]);

    const getGrandTotal = () => {
        let shippingCost = deliveryCharge;
        if (parseFloat(totalAmountMedicine) >= parseFloat(minOrderAmount)) {
            shippingCost = minDeliveryCharge;
        }
        let total = 0;
        let Discount = 0;
        if (parseFloat(less) > 0 && parseFloat(maximum_less) > 0 && parseFloat(totalAmountMedicine) >= parseFloat(minimum_order_for_less)) {
            if (less_type === 'Percent') {
                Discount = ((parseFloat(less) / 100) * parseFloat(totalAmountMedicine)).toFixed(2);
                if (parseFloat(Discount) > parseFloat(maximum_less)) {
                    Discount = parseFloat(maximum_less).toFixed(2);
                }
            } else {
                Discount = less;
            }
        }
        setShippingCharge(shippingCost);
        setDiscount(Discount);
        total = ((parseFloat(totalAmountMedicine) + parseFloat(shippingCost)) - parseFloat(Discount)).toFixed(2);
        setGrandTotal(total);
    };

    const handleImagesDetailProduct = (imageFiles) => {
        setImages((prevImages) => [...prevImages, ...imageFiles]);
    };

    const handleImageDelete = (index) => {
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    };

    const handleCustomerOrder = () => {
        if (medicineItems.length > 0 || images.length > 0) {
            const itemOrderObj = {
                customer_id: userInfo?._id,
                custom_customer_id: userInfo?.custom_id,
                customerInfo: {
                    customer_name: userInfo?.customer_name,
                    customer_address: userInfo?.customer_address,
                    contact_no: userInfo?.contact_no,
                    alternative_contact_no: userInfo?.alternative_contact_no,
                    latitude: 1232323,
                    longitude: 2432343,
                },
                merchant_id: merchantId,
                custom_merchant_id: customstore_id,
                merchantInfo: {
                    shop_name: medicineStoreInfo?.shop_name,
                    shop_address: medicineStoreInfo?.shop_address,
                    contact_no: medicineStoreInfo?.contact_no,
                    alternative_contact_no: medicineStoreInfo?.alternative_contact_no,
                },
                order_list_image: [],
                orderItems: medicineItems,
                subTotal: (totalAmountMedicine).toFixed(2),
                less_amount: discount,
                vatAmount: 0,
                deliveryCharge: shippingCharge,
                totalAmount: grandTotal,
                paymet_method: paymentOption?.detail,
                customer_rating: 0,
                customer_review: '',
            };

            const formData = new FormData();
            formData.append('orderObj', JSON.stringify(itemOrderObj));

            images?.forEach((image, i) => {
                if (i < 2) {
                    formData.append('order_list_image', image);
                }
            });

            placceOrder(formData);
        } else {
            setShowErrorMessage(true);
            setMessage('Please Pick Prescription !!');
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
            <HeaderCommon title={'Place Order'} />
            <ProgressStyle2 visible={progressing} />
            <ScrollView>

                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <View style={{
                        marginTop: 5,
                        backgroundColor: '#7903d1',
                        paddingHorizontal: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <View style={{ flex: 1, paddingTop: 5, paddingBottom: 5 }}>
                            <Text style={{ color: '#FFF', fontSize: 15 }}>{medicineStoreInfo?.shop_notice}</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#006400', marginBottom: 5, marginTop: 7 }}>Contact Details</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate('EditContactDetails') }}>
                                <Text style={{ fontSize: 15, color: 'blue', lineHeight: 20, marginTop: 15 }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            backgroundColor: 'white',
                            minheight: 120,
                            marginBottom: 2,
                            padding: 15,
                            paddingTop: 5,
                            elevation: 3,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                        }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 14, color: '#263238', lineHeight: 23, fontWeight: 'bold' }}>{userInfo?.customer_name}</Text>
                                <TouchableOpacity onPress={() => { navigation.navigate('ChangeDefaultLocation'); }}>
                                    <Image source={require('../../assets/icon/ic_edit2.png')}
                                        style={{ height: 16, width: 16, tintColor: '#757575', resizeMode: 'contain' }} />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 14, color: '#263238', lineHeight: 20 }}>{userInfo?.customer_address}</Text>
                            <Text style={{ fontSize: 14, color: '#263238', lineHeight: 20 }}>{userInfo?.alternative_contact_no}</Text>
                        </View>

                        <View style={{
                            marginTop: 10,
                            marginBottom: 3,
                            backgroundColor: 'white',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 3,
                            borderRadius: 3,
                            elevation: 3,
                        }}>
                            <ItemResume title='Total Payable' price={grandTotal} />
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 5, color: '#006400' }}>Remarks</Text>
                        <TextInput placeholder='' keyboardType='default' secureTextEntry={false} multiline={true}
                            placeholderTextColor='gray'
                            onChangeText={(text) => setRemarks(text)} value={remarks}
                            style={{
                                height: 100,
                                padding: 10,
                                fontSize: 15,
                                marginTop: 2,
                                backgroundColor: 'white',
                                borderWidth: 0,
                                borderColor: 'white',
                                color: '#2c2c2c'
                            }} />
                        <MultipleImageUploader
                            title={'Pick Prescription'}
                            selectedImages={selectedImages}
                            setSelectedImages={setSelectedImages}
                            handleImage={handleImagesDetailProduct}
                            handleImageDelete={handleImageDelete}
                        />
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 5, color: '#006400' }}>Payment Option</Text>
                        <View style={{
                            backgroundColor: 'white',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 3,
                            borderRadius: 3,
                            elevation: 3,
                            marginBottom: 30,
                        }}>
                            {paymentData.map((dt) =>
                                <ItemPayment key={dt.id}
                                    data={dt}
                                    selected={paymentOption.id === dt.id}
                                    onItemPress={() => setPaymentOption(dt)} />)}
                        </View>

                        {/* {clickOnSubmit && errors?.detail_product_image && (<Text style={styles.alert}>{errors?.detail_product_image}</Text>)} */}
                    </View>
                </View>
            </ScrollView>
            <View style={{ flex: 1, justifyContent: 'space-around', marginHorizontal: 20, marginBottom: 20, marginTop: 20, }}>
                <TouchableOpacity onPress={() => { handleCustomerOrder() }} style={{
                    height: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 3,
                    shadowOffset: { width: 0, height: 2 },
                    backgroundColor: '#006400',
                    marginBottom: 20,
                    shadowOpacity: 0.3
                }} >
                    <Text style={{ fontSize: 18, color: 'white' }}>Finish Order</Text>
                </TouchableOpacity>
            </View>
            <NotificationError visible={showErrorMessage} setVisible={setShowErrorMessage} message={message} />
        </View>
    );
}

function ItemResume({ title, price }) {
    return (
        <View style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 3,
            alignItems: 'flex-end',
            borderTopWidth: 0.5,
            borderTopColor: '#e0e0e0'
        }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#006400', flex: 1 }}>{title} :</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ff9800' }}>৳ {price}</Text>
        </View>
    );
}

function ItemPayment({ data, onItemPress, selected }) {
    return (
        <TouchableOpacity onPress={onItemPress} style={{
            width: '100%',
            flexDirection: 'row',
            padding: 8,
            alignItems: 'center',
            borderTopWidth: 0.5,
            borderTopColor: '#e0e0e0'
        }}>
            <View style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: '#f1f5f7',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {selected && (
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#ff9800' }} />
                )}
            </View>
            <View style={{ flex: 1 }}>
                <Image source={data.image} style={{ width: 100, height: 32, marginLeft: 20 }} />
            </View>
            {data.detail !== undefined && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15 }}>{data.detail}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}


