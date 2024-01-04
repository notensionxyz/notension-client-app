import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ListView, { MemoizedListView } from './ListView';
import { usePopularItem } from '../../../../hooks/fetch-data-by-module/usePopularItem';
import { handleGroceryItems } from '../../../../hooks/cart-handler/handleGroceryItems';

function PopularProduct({ pageNo, setPageNo }) {
    const { merchantId, customstore_id } = useSelector((state) => state.itemsByStoreReducer);
    const popularItem = useSelector((state) => state.itemsByStoreReducer.popularItem);
    const { loadingMore, itemNotfound, allLoaded } = useSelector((state) => state.appState);
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
            getPopularItems(parameter, 'from_grocery', pageNo, setPageNo);
        }, 500);
    }

    const {
        getQty,
        addToCart,
        removeFromCart,
        deccreseQty,
        isInOutOfStockList
    } = handleGroceryItems();

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <FlatList
                ListHeaderComponent={
                    null
                }
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
                initialNumToRender={30}
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