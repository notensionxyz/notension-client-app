import React from 'react';
import { Dimensions, FlatList, TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux"
import { MemoizedScrollProductList } from './ScrollProductList';
import { handleItemsByStoreReducer } from '../../../../store/reducers/items-by-shop';
import { handleMedicineItems } from '../../../../hooks/cart-handler/handleMedicineItems';

const screenWidth = Dimensions.get('window').width;

export default function OfferItems() {
    const specialOfferItem = useSelector((state) => state.itemsByStoreReducer.specialOfferItem);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {
        getQty,
        addToCart,
        removeFromCart,
        deccreseQty,
        isInOutOfStockList
    } = handleMedicineItems();

    const navigateTo = () => {

        const options = {
            searchProduct: false,
            fetchByoption: false,
            fetchBycustomType: true,
            customType: "65128cbd20db0921f13b40b3",
            productSubtype: '',
        };

        navigation.navigate('MedicineProductList', { options });

        let TypeInfo = {
            typeName: 'Special Offer Items',
            subtype: []
        };

        dispatch(
            handleItemsByStoreReducer({
                type: 'SAVE_SUBTYPE_INFO_BY_TYPE',
                data: TypeInfo,
            })
        );
    }

    return (
        <>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 20,
                backgroundColor: 'white',
            }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#006400' }}>Special Offer Items</Text>
                <TouchableOpacity onPress={() => { navigateTo(); }}>
                    <Text style={{ fontSize: 13, color: '#ff3d00', fontWeight: 'bold' }}>VIEW ALL</Text>
                </TouchableOpacity>
            </View>

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