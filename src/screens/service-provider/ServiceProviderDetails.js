import React, { useEffect } from 'react';
import { View, Dimensions, Text, Image, SafeAreaView, BackHandler, ImageBackground, TouchableOpacity } from "react-native";
import { ScrollView } from 'react-native-virtualized-view';
import { makeCall, openUrl, storageImageUrl } from '../../helpers/imageUrl';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useNavigation } from '@react-navigation/core';
import { service_providerImages } from '../../helpers/Constants';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
let merchantType = 3;

function ServiceProviderDetails({ route }) {
    const navigation = useNavigation();
    const providerInfo = route.params.data;

    useEffect(() => {

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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                <HeaderCommon toggleDrawer={null} title="Service Provider Details" connectionStatus={false} isReachable={false} />
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                        <ImageBackground source={{ uri: storageImageUrl(service_providerImages, providerInfo?.provider_banner_app) }}
                            style={{
                                width: '100%',
                                height: screenWidth / 2,
                                backgroundColor: 'gray',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingBottom: 100,
                            }} />
                        <View style={{
                            flex: 1,
                            width: screenWidth - 20,
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: -screenHeight * 0.05,
                            backgroundColor: 'white',
                            padding: 10,
                            elevation: 3,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <View style={{ width: screenWidth * 0.9, padding: 10, backgroundColor: 'white' }}>
                                <Text style={{ fontSize: 19, color: '#006400', fontWeight: 'bold', paddingLeft: 5 }} numberOfLines={1} ellipsizeMode="tail">
                                    {providerInfo?.provider_name}
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Image source={require('../../assets/icon/ic_place_blue.png')}
                                        style={{ width: 25, height: 25, tintColor: 'blue', resizeMode: 'contain' }} />
                                    <Text style={{ fontSize: 16, color: '#003300', marginLeft: 3, marginRight: 13, textAlign: 'justify' }}>{providerInfo?.address}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 2, height: '100%', marginHorizontal: 15, backgroundColor: '#e0e0e0' }}>
                                <View style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    marginLeft: -5,
                                    marginTop: 10,
                                    backgroundColor: '#88c057'
                                }} />
                            </View>
                            <View style={{
                                flex: 1,
                                paddingTop: 10,
                                marginRight: 15,
                                padding: 15,
                                marginTop: 10,
                                backgroundColor: 'white',
                                borderRadius: 3,
                                shadowRadius: 3,
                                elevation: 3,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3
                            }}>
                                <Text style={{ fontSize: 19, color: '#006400', marginBottom: 5, fontWeight: 500 }}>
                                    <Text style={{ color: '#006400' }}>যোগাযোগের ব্যক্তির নাম :</Text>
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Image source={require('../../assets/icon/ic_account.png')}
                                        style={{ width: 18, height: 18, tintColor: 'blue', resizeMode: 'contain' }} />
                                    <Text style={{ fontSize: 17, color: '#003300', marginLeft: 3, marginRight: 13, textAlign: 'justify', fontWeight: 500 }}> {providerInfo?.contact_person_name}</Text>
                                </View>
                                {providerInfo?.alternative_contact_no &&
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <Image source={require('../../assets/icon/map5_ic_call.png')}
                                            style={{ width: 18, height: 18, tintColor: 'blue', resizeMode: 'contain' }} />
                                        <Text style={{ fontSize: 17, color: '#003300', marginLeft: 3, marginRight: 13, textAlign: 'justify', fontWeight: 500 }}> {providerInfo?.alternative_contact_no}</Text>
                                    </View>
                                }

                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 2, height: '100%', marginHorizontal: 15, backgroundColor: '#e0e0e0' }}>
                                <View style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    marginLeft: -5,
                                    marginTop: 10,
                                    backgroundColor: '#f6be1a'
                                }} />
                            </View>
                            <View style={{
                                flex: 1,
                                marginRight: 15,
                                paddingTop: 10,
                                padding: 15,
                                marginTop: 10,
                                backgroundColor: 'white',
                                borderRadius: 3,
                                shadowRadius: 3,
                                elevation: 3,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3
                            }}>
                                <Text style={{ fontSize: 19, color: '#006400', marginBottom: 5, fontWeight: 500 }}>
                                    <Text style={{ color: '#006400' }}>কাস্টমার সাভিস :</Text>
                                </Text>
                                <TouchableOpacity style={{ alignItems: 'flex-start' }} onPress={() => makeCall(providerInfo?.contact_no)}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={require('../../assets/banner/call_us.png')}
                                            style={{ width: 150, height: 28, alignItems: 'flex-start', resizeMode: 'contain' }} />
                                        <Text style={{ fontSize: 17, color: '#003300', marginLeft: 8, fontWeight: 500 }}>{providerInfo?.contact_no}</Text>
                                    </View>
                                </TouchableOpacity>
                                {providerInfo?.contact_no &&
                                    <TouchableOpacity style={{ alignItems: 'flex-start', marginTop: 8 }} onPress={() => { openUrl(`https://wa.me/88${providerInfo?.contact_no?.slice(-11)}`); }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={require('../../assets/banner/WhatsAppButtonGreenSmall.png')}
                                                style={{ width: 150, height: 25, resizeMode: 'contain', alignItems: 'flex-start', resizeMode: 'contain' }} />
                                            <Text style={{ fontSize: 17, color: '#003300', marginLeft: 8, fontWeight: 500 }}>{providerInfo?.contact_no}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#f1f5f7', marginBottom: 25 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 2, height: '100%', marginHorizontal: 15, backgroundColor: '#e0e0e0' }}>
                                <View style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    marginLeft: -5,
                                    marginTop: 10,
                                    backgroundColor: '#ff5252'
                                }} />
                            </View>
                            <View style={{
                                flex: 1,
                                marginRight: 15,
                                paddingTop: 10,
                                padding: 15,
                                marginTop: 10,
                                backgroundColor: 'white',
                                borderRadius: 3,
                                shadowRadius: 3,
                                elevation: 3,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3
                            }}>
                                <Text style={{ fontSize: 19, color: '#006400', marginBottom: 10, fontWeight: 500 }}>
                                    <Text style={{ color: '#006400' }}>পরিষেবার বিবরণ :</Text>
                                </Text>
                                <Text style={{ fontSize: 15, color: '#003300', textAlign: 'justify' }}>{providerInfo?.service_details}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default ServiceProviderDetails;