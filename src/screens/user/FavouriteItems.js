import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Text, BackHandler, View, Pressable } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useNavigation } from '@react-navigation/native';
import MedicineItem from '../../components/screens-components/User/MedicineItem';
import GroceryItem from '../../components/screens-components/User/GroceryItem';
import { useFavouriteItem } from '../../hooks/user/favorite-item';

import NotificationError from '../../components/popup-notification/NotificationError';

const screenWidth = Dimensions.get('window').width;

function FavouriteItems({ route }) {
    const merchantType = route.params.merchantType;
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [favouriteInfo, setFavouriteInfo] = useState([]);
    const { favouriteGroceryItems, favouriteMedicineItems } = useSelector((state) => state.userChoice);

    const {
        visible,
        removeFromfavoriteItems,
        getGroceryProductDetails,
        getMedicineProductDetails,
        showErrorMessage,
        message,
        setShowErrorMessage
    } = useFavouriteItem();

    useEffect(() => {
        if (merchantType === 0) {
            setTitle('Favourite Grocery Items Info');
            setFavouriteInfo(favouriteGroceryItems);
        } else {
            setTitle('Favourite Medicine Items Info');
            setFavouriteInfo(favouriteMedicineItems);
        }
    }, [favouriteGroceryItems, favouriteMedicineItems]);

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
                <HeaderCommon title={title} toggleDrawer={navigation} />
                {merchantType === 0 ?
                    <FlatList
                        contentContainerStyle={{ padding: 5 }}
                        data={favouriteInfo}
                        renderItem={({ item }) =>
                            <GroceryItem
                                data={item}
                                removeFromfavoriteItems={removeFromfavoriteItems}
                                merchantType={merchantType}
                                getGroceryProductDetails={getGroceryProductDetails}
                            />}
                        keyExtractor={item => item.productId}
                    />
                    :
                    <FlatList
                        contentContainerStyle={{ padding: 5 }}
                        data={favouriteInfo}
                        renderItem={({ item }) =>
                            <MedicineItem
                                data={item}
                                removeFromfavoriteItems={removeFromfavoriteItems}
                                merchantType={merchantType}
                                getMedicineProductDetails={getMedicineProductDetails}
                            />}
                        keyExtractor={item => item.productId}
                    />
                }
                <NotificationError visible={showErrorMessage} setVisible={setShowErrorMessage} message={message} />
            </View>
        </>
    );
}

export default FavouriteItems;