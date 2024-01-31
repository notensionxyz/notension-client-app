import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, Text, Image, Alert, Pressable, FlatList } from "react-native";
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { ScrollView } from 'react-native-virtualized-view';
import FooterExploreStore from '../../components/footer/FooterExploreStore';
import { logoColor_2 } from '../../helpers/Constants';
import { useFood } from '../../hooks/fetch-data-by-module/useFood';
import { useFavouriteStore } from '../../hooks/user/favorite-shop';
import ManageListView from '../../components/screens-components/FoodShop/FilterOptionBySubtype/ManageListView';
import ListView, { MemoizedListView } from '../../components/screens-components/FoodShop/Product/ListView';
import { handleFoodItems } from '../../hooks/cart-handler/handleFoodItems';
import { storageImageUrl } from '../../helpers/imageUrl';
import HeaderFoodModule from '../../components/header/HeaderFoodModule';
import {SafeAreaView} from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
let merchantType = 2;

function ExploreFoodShop() {
    const ref = useRef(null);
    const navigation = useNavigation();
    const visitedFoodStore = useSelector((state) => state.dashboard.visitedFoodStore);
    const { customstore_id, merchantId, popularItem, productInfoByShop, productCategory } = useSelector((state) => state.itemsByStoreReducer);
    // const {
    //     foodStoreInfo,
    //     foodItems } = useSelector((state) => state.cartItems);
    const { exploreStore, progressing } = useFood();
    const isLoggedin = useSelector((state) => state.user.isLoggedin);

    const {
        isAddedToFavouriteList,
        addToFavouriteList,
        visible
    } = useFavouriteStore();

    useEffect(() => {
        if (visitedFoodStore?._id && visitedFoodStore?.custom_store_id) {
            exploreStore(visitedFoodStore)
        }
    }, []);

    const checkIsLoggedinAndProcess = (action) => {
        if (isLoggedin) {
            addToFavouriteList(visitedFoodStore, merchantType);
        } else {
            navigation.navigate('Login')
        }
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            
            backgroundColor: '#f9f9f9',
        }}>
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                <HeaderFoodModule toggleDrawer={navigation} />
                <ProgressStyle2 visible={progressing || visible} />

                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ height: screenWidth / 2, width: screenWidth, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={{ uri: storageImageUrl('food-store-docs', visitedFoodStore?.shop_banner_app) }} style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }} />
                            </View>
                        </View>
                        <View style={{ width: screenWidth - 8, padding: 10, backgroundColor: 'white' }}>
                            <Text style={{ fontSize: 18, color: '#006400', fontWeight: 'bold', paddingLeft: 5 }}>{visitedFoodStore?.shop_name}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Image source={require('../../assets/icon/ic_place_blue.png')}
                                    style={{ width: 25, height: 25, tintColor: 'blue', resizeMode: 'contain' }} />
                                <Text style={{ fontSize: 16, color: '#006400', marginLeft: 3, marginRight: 13 }}>{visitedFoodStore?.shop_address}</Text>
                            </View>
                        </View>

                        {!isAddedToFavouriteList(visitedFoodStore?._id, merchantType) &&
                            <View
                                style={{
                                    position: 'absolute',
                                    right: screenWidth / 30,
                                    top: screenWidth / 30,
                                }}>
                                <Pressable onPress={() => { checkIsLoggedinAndProcess('addToFavourite'); }}>
                                    <Image source={require('../../assets/icon/add_favourite.png')}
                                        style={{ width: 100, height: 50, resizeMode: 'contain'}} />
                                </Pressable>
                            </View>
                        }

                        <ManageListView productCategory={productCategory} />

                        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF' }}>
                                <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                                    Popular Items</Text>
                            </View>
                            <FlatList
                                contentContainerStyle={{ padding: 5 }}
                                data={popularItem}
                                keyExtractor={(_, index) => index.toString()}
                                //keyExtractor={item => item?._id}
                                renderItem={({ item, index }) => <ListView data={item} index={index} />}
                            />
                        </View>
                    </View>
                </ScrollView>
                <FooterExploreStore module='Food' contact={visitedFoodStore?.contact_no} />
            </View>
        </SafeAreaView>
    );
}

export default ExploreFoodShop;