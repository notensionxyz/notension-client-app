import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, Text, Image, Pressable, Alert, BackHandler } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useGrocery } from '../../hooks/fetch-data-by-module/useGrocery';
import FastImage from 'react-native-fast-image';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import SliderMedium from '../../components/screens-components/Common/slider/slider-medium';
import PopularProduct from '../../components/screens-components/GroceryShop/products/PopularProduct';
import { ScrollView } from 'react-native-virtualized-view';
import HeaderExploreStore from '../../components/header/HeaderExploreStore';
import FooterExploreStore from '../../components/footer/FooterExploreStore';
import { grocery_sliderTypeSubtypeImagesFolderName } from '../../helpers/Constants';
import { useFavouriteStore } from '../../hooks/user/favorite-shop';
import FilterOptionBySubtype, { MemoizedFilterOptionBySubtype } from '../../components/screens-components/GroceryShop/FilterOptionBySubtype';

let merchantType = 0;

const screenWidth = Dimensions.get('window').width;

function ExploreGroceryShop() {
    const ref = useRef(null);

    const navigation = useNavigation();
    const isLoggedin = useSelector((state) => state.user.isLoggedin);
    const { typeInfoByShop, DashboardSlider, visitedGroceryStore } = useSelector((state) => state.dashboard);

    const { exploreStore, progressing } = useGrocery();

    const {
        isAddedToFavouriteList,
        addToFavouriteList,
        visible
    } = useFavouriteStore();

    useEffect(() => {
        if (visitedGroceryStore?._id && visitedGroceryStore?.custom_store_id) {
            exploreStore(visitedGroceryStore)
        }
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

    const checkIsLoggedinAndProcess = (action) => {
        if (isLoggedin) {
            if (action === 'placerOrder') {
                navigation.navigate('PlaceOrderGrocery');
            } else {
                addToFavouriteList(visitedGroceryStore, merchantType);
            }
        } else {
            navigation.navigate('Login')
        }
    }

    //console.log('typeInfoByShop?.length : ', typeInfoByShop?.length);

    return (
        <React.Fragment>
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                <HeaderExploreStore
                    Title='Search here.... e.g milk, চিনি'
                    module='Grocery' />
                <ProgressStyle2 visible={progressing || visible} />

                <ScrollView>
                    {typeInfoByShop?.length > 0 &&
                        <>
                            <View style={{ width: screenWidth, padding: 10, backgroundColor: 'white' }}>
                                <Text style={{ fontSize: 18, color: '#006400', fontWeight: 'bold', paddingLeft: 5 }} numberOfLines={1} ellipsizeMode="tail">
                                    {visitedGroceryStore?.shop_name}
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Image source={require('../../assets/icon/ic_place_blue.png')}
                                        style={{ width: 25, height: 25, tintColor: 'blue', resizeMode: 'contain' }} />
                                    <Text style={{ fontSize: 16, color: '#006400', marginLeft: 3, marginRight: 13 }}>{visitedGroceryStore?.shop_address}</Text>
                                </View>
                            </View>

                            {!isAddedToFavouriteList(visitedGroceryStore?._id, merchantType) &&
                                <View
                                    style={{
                                        position: 'absolute',
                                        right: screenWidth / 30,
                                        top: screenWidth / 30,
                                    }}>
                                    <Pressable onPress={() => { checkIsLoggedinAndProcess('addToFavourite'); }}>
                                        <Image source={require('../../assets/icon/add_favourite.png')}
                                            style={{ width: 100, height: 50, resizeMode: 'contain', backgroundColor: 'white' }} />
                                    </Pressable>
                                </View>
                            }

                            <SliderMedium data={DashboardSlider[0]?.first_slider} folder_name={grocery_sliderTypeSubtypeImagesFolderName} />

                            <Pressable onPress={() => { checkIsLoggedinAndProcess('placerOrder'); }}>
                                <View style={{ height: (((screenWidth / 8) * 3) - 4), width: screenWidth - 10, borderRadius: 10, margin: 5 }}>
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

                            <FilterOptionBySubtype />

                            <Pressable onPress={() => { navigation.navigate('FavouriteItems', { merchantType: 0 }); }}>
                                <View style={{ height: (((screenWidth / 8) * 3) - 4), width: screenWidth - 10, borderRadius: 10, margin: 5, justifyContent: 'center' }}>
                                    <View style={{
                                        borderRadius: 10,
                                        shadowRadius: 10,
                                        elevation: 3,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        backgroundColor: 'white'
                                    }}>
                                        <FastImage
                                            source={require('../../assets/banner/grocery-list.webp')}
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

                            <PopularProduct />
                        </>
                    }
                </ScrollView>
                <FooterExploreStore module='Grocery' contact={visitedGroceryStore?.contact_no} />
            </View>
        </React.Fragment>
    );
}



export default ExploreGroceryShop;