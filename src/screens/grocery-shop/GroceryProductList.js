import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Dimensions, FlatList, Pressable, ActivityIndicator } from 'react-native';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useDispatch, useSelector } from 'react-redux';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
//import { useManageItem } from '../../hooks/manage-item-by-shop';
import ListView, { MemoizedListView } from '../../components/screens-components/GroceryShop/products/ListView';
import { useGrocery } from '../../hooks/fetch-data-by-module/useGrocery';
import SubtypeNameScroll from '../../components/screens-components/GroceryShop/subtypeNameScroll';
import { logoColor_2 } from '../../helpers/Constants';
import { handleGroceryItems } from '../../hooks/cart-handler/handleGroceryItems';
import SearchField from '../../components/screens-components/Common/SearchField';
import FooterCommon from '../../components/footer/FooterCommon';

const screenWidth = Dimensions.get('window').width;
const hight = (screenWidth / 3) - 7;
const width = (screenWidth / 3) - 5;
const screenHeight = Dimensions.get('window').height;

function GroceryProductList({ route }) {
    const ref = useRef(null);
    const options = route.params.options;
    const dispatch = useDispatch();
    const { productInfoByShop} = useSelector((state) => state.itemsByStoreReducer);
    const [searchText, setSearchText] = useState('');
    const [pageNo, setPageNo] = useState(1);

    const {
        showActivityIndicator,
        loadingMore,
        allLoaded,
        itemNotfound,
        progressing,
        showErrorMessage,
        message,
        showSuccessMessage,
        setShowSuccessMessage,
        setShowErrorMessage,
        setLoadingMore,
        handleSearch,
        getItemsOnPress,
        reloadCustomTypeData,
        resetLoadingStatus
    } = useGrocery();



    useEffect(() => {
        if (options?.searchProduct) {
            resetLoadingStatus(true);
        } else {
            resetLoadingStatus();
        }

        if (options?.fetchByoption) {
            const iItemIndex = options.subtypeByselectedType.findIndex(
                (subtype) => subtype?.subtypeInfo?._id === options.productSubtype
            );
            setPageNo(1);
            getItemsOnPress(options, 1, setPageNo);
            scrollToClickedItem(iItemIndex);
        }

        if (options?.fetchBycustomType) {
            reloadCustomTypeData(options, setPageNo);
        }

    }, []);

    const onPress = () => { handleSearch(searchText, 1, setPageNo); }

    const loadMoreResults = async () => {

        // if already loading more, or all loaded, return
        if (loadingMore || allLoaded)
            return

        // set loading more (also updates footer text)
        setLoadingMore(true);

        setTimeout(() => {
            if (options.searchProduct) {
                handleSearch(searchText, pageNo, setPageNo);
            } else {
                getItemsOnPress(options, pageNo, setPageNo);
            }
        }, 500);
    }

    const scrollToClickedItem = (itemIndex) => {
        ref.current?.scrollToIndex({ animated: true, index: "" + itemIndex });
    }

    const getItemLayout = (data, index) => {
        return {
            length: width, offset: width * index, index
        }
    }

    const subTypeProduct = (subtype_id, index) => {
        resetLoadingStatus();
        options.productSubtype = subtype_id;
        setPageNo(1);
        getItemsOnPress(options, 1, setPageNo)
        scrollToClickedItem(index);
    }

    const {
        getQty,
        addToCart,
        removeFromCart,
        deccreseQty,
        isInOutOfStockList
    } = handleGroceryItems();


    return (
        <>
            <ProgressStyle2 visible={progressing} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
                <HeaderCommon title={options.Title} />
                {options?.searchProduct &&
                    <SearchField searchText={searchText} setSearchText={setSearchText} onPress={onPress} />
                }
                {options?.fetchByoption && (
                    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', maxHeight: 48 }}>
                        <FlatList
                            ref={ref}
                            nestedScrollEnabled
                            contentContainerStyle={{ padding: 3 }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={options.subtypeByselectedType}
                            keyExtractor={item => item._id}
                            renderItem={({ item, index }) =>
                                <SubtypeNameScroll
                                    data={item}
                                    index={index}
                                    subTypeProductInfo={subTypeProduct}
                                    subtypeId={options.productSubtype}
                                />}
                            getItemLayout={getItemLayout}
                        />
                    </View>
                )}

                <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
                    <FlatList
                        ListHeaderComponent={
                            null
                        }
                        ListFooterComponent={
                            <View>
                                {!allLoaded && showActivityIndicator &&
                                    <ActivityIndicator size='large' color="#111d5e" style={{ marginTop: pageNo === 1 ? screenHeight / 3 : 0 }} />
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
                        data={productInfoByShop}
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
                <FooterCommon module='Grocery' />
            </View>
        </>
    );
}

export default GroceryProductList;