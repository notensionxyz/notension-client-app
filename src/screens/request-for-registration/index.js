import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, FlatList, Pressable, ActivityIndicator, BackHandler, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import SliderMedium from '../../components/screens-components/Common/slider/slider-medium';
import { logoColor_1, logoColor_2, RegBannerData } from '../../helpers/Constants';
import HeaderCommon from './components/HeaderCommon';
import { openUrl } from '../../helpers/imageUrl';

const screenWidth = Dimensions.get('window').width;
const hight = (screenWidth / 3) - 7;
const width = (screenWidth / 3) - 5;
const screenHeight = Dimensions.get('window').height;
let cardMargin = 4;
let cardWidth = screenWidth - (cardMargin * 3);
function RequestForRegistration() {
    const navigation = useNavigation();

    const isLoggedin = useSelector((state) => state.user.isLoggedin);

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

    const navigateTo = (data) => {

        if (isLoggedin) {
            if (data?.id === '1') {

                navigation.navigate('GroceryShopReg');

            } else if (data?.id === '2') {

                navigation.navigate('MedicineShopReg');

            } else if (data?.id === '3') {

                navigation.navigate('FoodShopReg');

            } else if (data?.id === '4') {

                navigation.navigate('ConsultationCenterReg');

            } else if (data?.id === '5') {

                navigation.navigate('AmbulanceServiceProviderReg');

            } else if (data?.id === '6') {

                navigation.navigate('MedicalServicesProviderReg');

            } else if (data?.id === '7') {

                navigation.navigate('BankingOutletReg');

            } else if (data?.id === '8') {

                navigation.navigate('AllCareServiceReg');

            } else if (data?.id === '9') {
                openUrl(`https://wa.me/88${'01333131670'}`);
            }
        } else {
            navigation.navigate('Login')
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', }}>
            <HeaderCommon title={'Request For Registration'} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', justifyContent: 'center' }}>
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
                    <View style={{ flex: 1, padding: 10, backgroundColor: '#e4ebe5', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'justify', fontSize: 20, fontWeight: 'bold', color: logoColor_2 }}>NoTension-এর সঙ্গে অংশীদার হোন, আপনার ব্যবসার সাফল্যের নতুন দিগন্ত খুলুন!</Text>
                        <Text style={{ textAlign: 'justify', fontSize: 18, color: logoColor_2 }}>আপনার পরিষেবা বা পণ্যকে স্থানীয় গ্রাহকদের কাছে পৌঁছে দেওয়ার জন্য NoTension হল সর্বোত্তম সমাধান।
                            আমাদের সঙ্গে যোগ দিন, আপনার ব্যবসার বৃদ্ধি এবং নতুন সুযোগের দরজা খুলুন।</Text>
                    </View>
                </View>
                <FlatList
                    contentContainerStyle={{ padding: 3 }}
                    showsHorizontalScrollIndicator={false}
                    numColumns={3}
                    data={RegBannerData}
                    renderItem={({ item }) => <ItemData data={item} navigateTo={navigateTo} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
}

function ItemData({ data, navigateTo }) {

    return (
        <Pressable onPress={() => { navigateTo(data); }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ height: (screenWidth / 3) - 6, width: (screenWidth / 3) - 6, padding: 1 }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                        shadowRadius: 2,
                        elevation: 3,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        backgroundColor: 'white'
                    }}>
                        <Image source={data.image}
                            style={{
                                height: '100%', width: '100%',
                                alignItems: 'center', justifyContent: 'center',
                                borderRadius: 6,
                                shadowRadius: 6,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3,
                                overflow: 'hidden'
                            }} />
                    </View>
                </View>
            </View>
        </Pressable >
    );
}

export default RequestForRegistration;