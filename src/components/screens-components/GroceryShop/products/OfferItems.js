import React from 'react';
import { Dimensions, FlatList, TouchableOpacity, Text, View, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux"
import { MemoizedScrollProductList } from './ScrollProductList';
import { handleGroceryItems } from '../../../../hooks/cart-handler/handleGroceryItems';

const screenWidth = Dimensions.get('window').width;

export default function OfferItems() {
    const specialOfferItem = useSelector((state) => state.itemsByStoreReducer.specialOfferItem);
    const navigation = useNavigation();

    const {
        getQty,
        addToCart,
        removeFromCart,
        deccreseQty,
        isInOutOfStockList
    } = handleGroceryItems();

    const navigateTo = () => {

        const options = {
            searchProduct: false,
            fetchByoption: false,
            fetchBycustomType: true,
            customType: "64f5a306baa57a4707524d6e",
            Title: 'Special Offer Items',
            productSubtype: '',
        };

        navigation.navigate('GroceryProductList', { options });
    }

    return (
        <>
            <Pressable onPress={() => { navigateTo(); }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 20,
                    backgroundColor: 'white',
                }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#006400' }}>Special Offer Items</Text>
                    <Text style={{ fontSize: 13, color: '#ff3d00', fontWeight: 'bold' }}>VIEW ALL</Text>
                </View>
            </Pressable>

            <View style={{ paddingLeft: 0, paddingRight: 3 }}>
                <FlatList
                    contentContainerStyle={{ padding: 3 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={specialOfferItem.slice(0, 8)}
                    renderItem={({ item }) =>
                        <MemoizedScrollProductList
                            data={item}
                            addToBagPress={addToCart}
                            incresePress={addToCart}
                            deccresePress={deccreseQty}
                            removePress={removeFromCart}
                            qtyIncart={getQty(item._id)}
                            isOutOfStock={isInOutOfStockList(item._id)}
                        />
                    }
                    keyExtractor={item => item._id}
                />
            </View>
        </>
    );
}