import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, Text, Image, Alert, Pressable } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import SliderMedium from '../../components/screens-components/Common/slider/slider-medium';
import ManageListView from '../../components/screens-components/MedicineShop/FilterOptionBySubtype/ManageListView';
import PopularProduct from '../../components/screens-components/MedicineShop/products/PopularProduct';
import { ScrollView } from 'react-native-virtualized-view';
import { usePopularItem } from '../../hooks/fetch-data-by-module/usePopularItem';
import OfferItems from '../../components/screens-components/MedicineShop/products/OfferItems';
import HeaderExploreStore from '../../components/header/HeaderExploreStore';
import FooterExploreStore from '../../components/footer/FooterExploreStore';
import FastImage from 'react-native-fast-image';
import { useMedicine } from '../../hooks/fetch-data-by-module/useMedicine';
import { medicine_sliderTypeSubtypeImagesFolderName } from '../../helpers/Constants';
import { useFavouriteStore } from '../../hooks/user/favorite-shop';
import { handleCartReducer } from '../../store/reducers/cartReducer';

let merchantType = 1;
let typeInfo = {};
const screenWidth = Dimensions.get('window').width;

function ExploreMedicineShop() {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const navigation = useNavigation();
    const isLoggedin = useSelector((state) => state.user.isLoggedin);
    const { medicineStoreInfo, medicineItems } = useSelector((state) => state.cartItems);
    const { typeInfoByShop, subtypeInfoByShop, DashboardSlider, visitedMedicineStore } = useSelector((state) => state.dashboard);
    const [typeInfoGeneral, setTypeInfoGeneral] = useState([]);
    const [customTypeInfo, setCustomTypeInfo] = useState([]);
    const {
        isAddedToFavouriteList,
        addToFavouriteList,
        visible
    } = useFavouriteStore();
    const { exploreStore, progressing } = useMedicine();
    const { resetState } = usePopularItem();
    const [pageNo, setPageNo] = useState(2);

    useEffect(() => {
        resetState();
        setPageNo(2);
        if (visitedMedicineStore?._id && visitedMedicineStore?.custom_store_id) {
            exploreStore(visitedMedicineStore)
        }
    }, []);

    useEffect(() => {

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

    const checkIsLoggedinAndProcess = (action) => {
        if (isLoggedin) {
            if (action === 'placerOrder') {
                navighateToPlaceOrder();
            } else {
                addToFavouriteList(visitedMedicineStore, merchantType);
            }
        } else {
            navigation.navigate('Login')
        }
    }

    const navighateToPlaceOrder = () => {
        if (medicineItems.length > 0) {
            if (medicineStoreInfo?._id && medicineStoreInfo?._id !== visitedMedicineStore?._id) {
                Alert.alert("Hold on! Proceeding to place order will clear your bag. Proceed any way?", "You alresdy have items from another store in your bag !!", [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: 'cancel'
                    },
                    {
                        text: "Proceed",
                        onPress: () => emptyCartItems(),
                        style: 'default'
                    },
                ]);
            }
        } else {
            navigation.navigate('PlaceOrderMedicine');
        }
    }

    const emptyCartItems = () => {
        dispatch(
            handleCartReducer({
                type: 'MEDICINE_ORDER_PLACED',
                data: [],
            })
        );
        navigation.navigate('PlaceOrderMedicine');
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <HeaderExploreStore Title='Search here.... e.g Napa, Maxpro' module='Medicine' />
            <ProgressStyle2 visible={progressing || visible} />
            {/* {!progressing &&
                <FilterOptionBySubtype  />
            } */}
            <ScrollView>
                {typeInfoGeneral?.length > 0 &&
                    <>
                        <View style={{ width: screenWidth - 8, padding: 10, backgroundColor: 'white' }}>
                            <Text style={{ fontSize: 18, color: '#006400', fontWeight: 'bold', paddingLeft: 5 }}>{visitedMedicineStore?.shop_name}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Image source={require('../../assets/icon/ic_place_blue.png')}
                                    style={{ width: 25, height: 25, tintColor: 'blue', resizeMode: 'contain' }} />
                                <Text style={{ fontSize: 16, color: '#006400', marginLeft: 3, marginRight: 13 }}>{visitedMedicineStore?.shop_address}</Text>
                            </View>
                        </View>

                        {!isAddedToFavouriteList(visitedMedicineStore?._id, merchantType) &&
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

                        <SliderMedium data={DashboardSlider[0]?.first_slider} folder_name={medicine_sliderTypeSubtypeImagesFolderName} />

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
                                        source={require('../../assets/banner/medicine-order.webp')}
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
                        {typeInfo['MPT14'] && typeInfo['MPT14']?.subtype.length > 0 &&
                            <ManageListView data={typeInfo['MPT14']} />
                        }

                        <OfferItems />

                        {typeInfo['MPT15'] && typeInfo['MPT15']?.subtype.length > 0 &&
                            <ManageListView data={typeInfo['MPT15']} />
                        }

                        <SliderMedium data={DashboardSlider[0]?.second_slider} folder_name={medicine_sliderTypeSubtypeImagesFolderName} />

                        {typeInfo['MPT16'] && typeInfo['MPT16']?.subtype.length > 0 &&
                            <ManageListView data={typeInfo['MPT16']} />
                        }

                        {typeInfo['MPT17'] && typeInfo['MPT17']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['MPT17']} />
                        }

                        <SliderMedium data={DashboardSlider[0]?.third_slider} folder_name={medicine_sliderTypeSubtypeImagesFolderName} />

                        {typeInfo['MPT18'] && typeInfo['MPT18']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['MPT18']} />
                        }

                        {typeInfo['MPT19'] && typeInfo['MPT19']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['MPT19']} />
                        }

                        <SliderMedium data={DashboardSlider[0]?.fourth_slider} folder_name={medicine_sliderTypeSubtypeImagesFolderName} />

                        {typeInfo['MPT20'] && typeInfo['MPT20']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['MPT20']} />
                        }

                        <Pressable onPress={() => { navigation.navigate('FavouriteItems', { merchantType: 1 }) }}>
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
                                        source={require('../../assets/banner/medicine-list.webp')}
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

                        <PopularProduct pageNo={pageNo} setPageNo={setPageNo} />
                    </>
                }
            </ScrollView>
            <FooterExploreStore module='Medicine' contact={visitedMedicineStore?.contact_no} />
        </View>
    );
}

export default ExploreMedicineShop;