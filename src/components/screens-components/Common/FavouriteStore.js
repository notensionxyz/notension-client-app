import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Text, BackHandler, View, Pressable, Alert } from "react-native";
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux';
import ProgressStyle2 from '../../../components/progress-animation/ProgressStyle2';
import { storageImageUrl } from '../../../helpers/imageUrl';
import { useNavigation } from '@react-navigation/native';
import { handleDashboardReducer } from '../../../store/reducers/dashboardReducer';
import { useFavouriteStore } from '../../../hooks/user/favorite-shop';

const screenWidth = Dimensions.get('window').width;

function FavouriteStore({ merchantType }) {
   // console.log('merchantType353535 : ', merchantType);
    const navigation = useNavigation();
    const [shopBannerFolder, setShopBannerFolder] = useState('');
    const [title, setTitle] = useState('');
    const [favouriteInfo, setFavouriteInfo] = useState([]);

    const { favouriteGroceryStore,
        favouriteMedicineStore,
        favouriteFoodShop } = useSelector((state) => state.userChoice);

    const {
        visible,
        removeFromfavoriteList,
    } = useFavouriteStore();

    useEffect(() => {
        if (merchantType === 0) {
            setShopBannerFolder('grocery-store-docs');
            setFavouriteInfo(favouriteGroceryStore);
        } else if (merchantType === 1) {
            setShopBannerFolder('medicine-store-docs');
            setFavouriteInfo(favouriteMedicineStore);
        } else {
            setShopBannerFolder('food-store-docs');
            setFavouriteInfo(favouriteFoodShop)
        }
    }, []);


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
        <>
            <ProgressStyle2 visible={visible} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
                <FlatList
                    contentContainerStyle={{ padding: 5 }}
                    data={favouriteInfo}
                    renderItem={({ item }) =>
                        <ListItem
                            data={item}
                            removeFromfavoriteList={removeFromfavoriteList}
                            merchantType={merchantType}
                            shopBannerFolder={shopBannerFolder}
                        />}
                    keyExtractor={item => item.storeId}
                />
            </View>
        </>
    );
}

function ListItem({ data, removeFromfavoriteList, merchantType, shopBannerFolder }) {
    let cardMargin = 4;
    let cardWidth = screenWidth - (cardMargin * 4.5);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const favouriteInfo = {
        _id: data?.storeId,
        custom_store_id: data?.custom_store_id,
        shop_name: data?.shop_name,
        shop_address: data?.shop_address,
        shop_banner_app: data?.shop_banner_app,
        contact_no: data?.contact_no,
        alternative_contact_no: data?.alternative_contact_no,
    };

    const navigateToExploreShop = () => {
        if (merchantType === 0) {
            navigation.navigate('ExploreGroceryShop');
            dispatch(
                handleDashboardReducer({
                    type: 'VISITED_STORE',
                    data: favouriteInfo,
                })
            );
        } else if (merchantType === 1) {
            navigation.navigate('ExploreMedicineShop');
            dispatch(
                handleDashboardReducer({
                    type: 'VISITED_MED_STORE',
                    data: favouriteInfo,
                })
            );
        } else {
            //navigation.navigate('FoodShopNavigation');
            navigation.navigate('ExploreFoodShop');
            dispatch(
                handleDashboardReducer({
                    type: 'VISITED_FOOD_STORE',
                    data: favouriteInfo,
                })
            );
        }
    }

    const removeStore = () => {

        Alert.alert("একটু অপেক্ষা করুন!!!", "আপনি কি আপনার পছন্দের তালিকা থেকে এই দোকানটি মুছে ফেলতে চান?", [
            {
                text: "No",
                onPress: () => null,
                style: "No"
            },
            { text: "Yes", onPress: () => removeFromfavoriteList(data, merchantType) }
        ]);

    }

    return (
        <Pressable onPress={() => { navigateToExploreShop(); }}>
            <View style={{
                backgroundColor: 'white',
                width: cardWidth,
                margin: cardMargin,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                borderRadius: 10,
                elevation: 3,
            }} >
                <FastImage source={{ uri: storageImageUrl(shopBannerFolder, data.shop_banner_app) }}
                    style={{
                        width: "100%",
                        height: (screenWidth / 2) - 2,
                        justifyContent: 'flex-end',
                        padding: 10,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        //shadowRadius: 10,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        overflow: 'hidden'
                    }} />
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 18, color: '#263238', fontWeight: 'bold', paddingLeft: 5 }}>{data.shop_name}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                        <Image source={require('../../../assets/icon/ic_place_blue.png')}
                            style={{ width: 25, height: 25, tintColor: 'blue', resizeMode: 'contain' }} />
                        <Text style={{ fontSize: 16, color: 'black', marginLeft: 3, marginRight: 13 }}>{data.shop_address}</Text>
                    </View>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        right: screenWidth / 30,
                        top: screenWidth / 2,
                    }}>
                    <Pressable onPress={() => { removeStore(); }}>
                        <Image source={require('../../../assets/icon/remove.png')}
                            style={{ width: 100, height: 50, resizeMode: 'contain' }} />
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
}

export default FavouriteStore;