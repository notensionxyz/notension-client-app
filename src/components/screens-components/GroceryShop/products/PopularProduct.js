import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { MemoizedListView } from './ListView';
import { usePopularItem } from '../../../../hooks/fetch-data-by-module/usePopularItem';
import { handleGroceryItems } from '../../../../hooks/cart-handler/handleGroceryItems';
import { logoColor_2 } from '../../../../helpers/Constants';

function PopularProduct() {
    const { merchantId, customstore_id, popularItem, pageNoForPopular } = useSelector((state) => state.itemsByStoreReducer);
    const { loadingMore, itemNotfound, allLoaded } = useSelector((state) => state.appState);
    const showProductPrice = useSelector((state) => state.dashboard.showProductPrice);

    const { getPopularItems, setLoadingMore } = usePopularItem();

    let parameter = {
        groceryStoreId: merchantId,
        custom_store_id: customstore_id,
        customType: "64f5b63a256e0838327efaef",
    }

    const loadMoreResults = async () => {

        // if already loading more, or all loaded, return
        if (loadingMore || allLoaded)
            return

        // set loading more (also updates footer text)
        setLoadingMore(true);

        setTimeout(() => {
            getPopularItems(parameter, 'from_grocery', pageNoForPopular);
        }, 500);
    }

    const {
        getQty,
        addToCart,
        removeFromCart,
        deccreseQty,
        isInOutOfStockList,
        checkCartItem
    } = handleGroceryItems();

    useEffect(() => {
        if (popularItem.length > 1) {
            checkCartItem();
        }
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF' }}>
                <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                    Popular Items</Text>
            </View>
            <FlatList
                // ListHeaderComponent={
                //     null
                // }
                ListFooterComponent={
                    <View>
                        {!allLoaded &&
                            <ActivityIndicator size='large' color="#111d5e" style={{ marginTop: 0 }} />
                        }
                        {itemNotfound &&
                            <Text style={{ fontSize: 17, color: '#111d5e', alignSelf: 'flex-start', marginTop: 20, fontWeight: "bold" }}> No Item found </Text>
                        }
                    </View>
                }
                initialNumToRender={popularItem.length}
                windowSize={8}
                maxToRenderPerBatch={28}
                updateCellsBatchingPeriod={20}
                removeClippedSubviews={false}
                scrollEventThrottle={200}
                onEndReachedThreshold={1.9}
                onEndReached={() => {
                    loadMoreResults();
                }}
                contentContainerStyle={{ padding: 5 }}
                data={popularItem}
                // keyExtractor={(item, index) => index.toString()}
                keyExtractor={item => item?._id}
                renderItem={({ item, index }) =>
                    <MemoizedListView
                        data={item}
                        showPrice={showProductPrice}
                        addToBagPress={addToCart}
                        incresePress={addToCart}
                        deccresePress={deccreseQty}
                        removePress={removeFromCart}
                        qtyIncart={getQty(item._id)}
                        isOutOfStock={isInOutOfStockList(item._id)}
                    />}
            />
        </View>
    );
}

export default PopularProduct;