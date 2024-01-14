import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, Text, Image, Pressable } from "react-native";
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useGrocery } from '../../hooks/fetch-data-by-module/useGrocery';
import FastImage from 'react-native-fast-image';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import SliderMedium from '../../components/screens-components/Common/slider/slider-medium';
import ManageListView from '../../components/screens-components/GroceryShop/FilterOptionBySubtype/ManageListView';
import PopularProduct from '../../components/screens-components/GroceryShop/products/PopularProduct';
import { ScrollView } from 'react-native-virtualized-view';
import { usePopularItem } from '../../hooks/fetch-data-by-module/usePopularItem';
import OfferItems from '../../components/screens-components/GroceryShop/products/OfferItems';
import DealOfTheDay from '../../components/screens-components/GroceryShop/products/DealOfTheDay';
import HeaderExploreStore from '../../components/header/HeaderExploreStore';
import FooterExploreStore from '../../components/footer/FooterExploreStore';
import { grocery_sliderTypeSubtypeImagesFolderName } from '../../helpers/Constants';

let typeInfo = {};
const screenWidth = Dimensions.get('window').width;

function ExploreGroceryShop() {
    const ref = useRef(null);
    const navigation = useNavigation();
    const isLoggedin = useSelector((state) => state.user.isLoggedin);
    const { typeInfoByShop, subtypeInfoByShop, DashboardSlider, visitedGroceryStore } = useSelector((state) => state.dashboard);
    const [typeInfoGeneral, setTypeInfoGeneral] = useState([]);
    const [customTypeInfo, setCustomTypeInfo] = useState([]);

    const { exploreStore, progressing } = useGrocery();
    const { resetState } = usePopularItem();
    const [pageNo, setPageNo] = useState(2);

    useEffect(() => {
        console.log('Render Page');
        resetState();
        setPageNo(2);
        if (visitedGroceryStore?._id && visitedGroceryStore?.custom_store_id) {
            exploreStore(visitedGroceryStore)
        }
    }, []);

    useEffect(() => {
        console.log('Render Page3333');
        if (typeInfoByShop.length > 0) {
            let generaltypeInfo = typeInfoByShop?.filter(
                (type) => type.statusType === 'General'
            );

            generaltypeInfo?.forEach((info, i) => {
                let eachTypeInfo = {
                    _id: info?.typeInfo?._id,
                    custom_type_id: info.custom_type_id,
                    typeName: info?.typeName,
                    subtype: subtypeInfoByShop?.filter(
                        (subtype) => subtype.typeInfo === info?.typeInfo
                    )
                };

                typeInfo = { ...typeInfo, [info.custom_type_id]: eachTypeInfo };

            });

            setTypeInfoGeneral(generaltypeInfo);

            let customTypeInfo = typeInfoByShop?.filter(
                (type) => type.statusType === 'Custom'
            );

            setCustomTypeInfo(customTypeInfo);
        }

    }, [typeInfoByShop]);

    const processToPlaceOrder = () => {
        if (isLoggedin) {
            navigation.navigate('PlaceOrderGrocery');
        } else {
            navigation.navigate('Login')
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <HeaderExploreStore
                Title='Search here.... e.g milk, চিনি'
                module='Grocery' />
            <ProgressStyle2 visible={progressing} />
            {/* {!progressing &&
                <FilterOptionBySubtype navigateTo={navigateTo} />
            } */}
            <ScrollView>
                {typeInfoGeneral?.length > 0 &&
                    <>
                        <View style={{ width: screenWidth - 8, padding: 10, backgroundColor: 'white' }}>
                            <Text style={{ fontSize: 18, color: '#006400', fontWeight: 'bold', paddingLeft: 5 }}>{visitedGroceryStore?.shop_name}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Image source={require('../../assets/icon/ic_place_blue.png')}
                                    style={{ width: 25, height: 25, tintColor: 'blue', resizeMode: 'contain' }} />
                                <Text style={{ fontSize: 16, color: '#006400', marginLeft: 3, marginRight: 13 }}>{visitedGroceryStore?.shop_address}</Text>
                            </View>
                        </View>

                        <SliderMedium data={DashboardSlider[0]?.first_slider} folder_name={grocery_sliderTypeSubtypeImagesFolderName} />

                        <Pressable onPress={() => { processToPlaceOrder() }}>
                            <View style={{ height: (((screenWidth / 8) * 3) - 3), width: screenWidth - 10, borderRadius: 10, margin: 5 }}>
                                <View style={{
                                    borderRadius: 10,
                                    shadowRadius: 10,
                                    elevation: 3,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.3,
                                    backgroundColor: 'white'
                                }}>
                                    <FastImage
                                        source={require('../../assets/banner/grocery-order.webp')}
                                        resizeMode={FastImage.resizeMode.contain}
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            //padding: 10,
                                            borderRadius: 10,
                                            shadowRadius: 10,
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.3,
                                            overflow: 'hidden'
                                        }} />

                                </View>
                            </View>
                        </Pressable>

                        {typeInfo['PT15'] && typeInfo['PT15']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['PT15']} />
                        }

                        <OfferItems />

                        {typeInfo['PT12'] && typeInfo['PT12']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['PT12']} />
                        }

                        <SliderMedium data={DashboardSlider[0]?.second_slider} folder_name={grocery_sliderTypeSubtypeImagesFolderName} />

                        {typeInfo['PT16'] && typeInfo['PT16']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['PT16']} />
                        }

                        {typeInfo['PT17'] && typeInfo['PT17']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['PT17']} />
                        }

                        <DealOfTheDay />

                        {typeInfo['PT18'] && typeInfo['PT18']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['PT18']} />
                        }

                        <SliderMedium data={DashboardSlider[0]?.third_slider} folder_name={grocery_sliderTypeSubtypeImagesFolderName} />

                        {typeInfo['PT19'] && typeInfo['PT19']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['PT19']} />
                        }

                        {typeInfo['PT20'] && typeInfo['PT20']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['PT20']} />
                        }

                        <SliderMedium data={DashboardSlider[0]?.fourth_slider} folder_name={grocery_sliderTypeSubtypeImagesFolderName} />

                        {typeInfo['PT21'] && typeInfo['PT21']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['PT21']} />
                        }

                        {typeInfo['PT22'] && typeInfo['PT22']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['PT22']} />
                        }

                        <PopularProduct pageNo={pageNo} setPageNo={setPageNo} />
                    </>
                }
            </ScrollView>
            <FooterExploreStore module='Grocery' contact={visitedGroceryStore?.contact_no} />
        </View>
    );
}

export default ExploreGroceryShop;