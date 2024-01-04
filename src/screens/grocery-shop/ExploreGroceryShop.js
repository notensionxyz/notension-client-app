import React, { useEffect, useState } from 'react';
import { View, Dimensions, Text, Image } from "react-native";
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useGrocery } from '../../hooks/fetch-data-by-module/useGrocery';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import SliderMedium from '../../components/screens-components/Common/slider/slider-medium';
import ManageListView from '../../components/screens-components/GroceryShop/FilterOptionBySubtype/ManageListView';
import PopularProduct from '../../components/screens-components/GroceryShop/products/PopularProduct';
import { ScrollView } from 'react-native-virtualized-view';
import { usePopularItem } from '../../hooks/fetch-data-by-module/usePopularItem';
import OfferItems from '../../components/screens-components/GroceryShop/products/OfferItems';
import DealOfTheDay from '../../components/screens-components/GroceryShop/products/DealOfTheDay';
import HeaderSearch from '../../components/header/HeaderSearch';
let typeInfo = {};
const screenWidth = Dimensions.get('window').width;

function ExploreGroceryShop({ route }) {
    const data = route.params.data;
    const navigation = useNavigation();
    const { typeInfoByShop, subtypeInfoByShop, DashboardSlider } = useSelector((state) => state.itemsByStoreReducer);

    const { specialOfferItem, dealOfTheDay } = useSelector((state) => state.itemsByStoreReducer);

    const [typeInfoGeneral, setTypeInfoGeneral] = useState([]);
    const [customTypeInfo, setCustomTypeInfo] = useState([]);
    const [offerInfo, setOfferInfo] = useState([]);
    const [dealOfTheDayInfo, setDealOfTheDayInfo] = useState([]);
    const { exploreStore, progressing } = useGrocery();
    const { resetState } = usePopularItem();
    const [pageNo, setPageNo] = useState(2);
    const navigateTo = (data) => {
        const options = {
            searchProduct: false,
            fetchByoption: true,
            fetchBycustomType: false,
            customType: '',
            productSubtype: data?.subtypeInfo?._id || '303030303030303030303030',
        };

        navigation.navigate('GroceryProductList', { options });
    }

    useEffect(() => {
        console.log('Render Page');
        resetState();
        setPageNo(2);
        if (data?._id && data?.custom_store_id) {
            exploreStore(data?._id, data?.custom_store_id,)
        }
    }, []);

    useEffect(() => {
        console.log('Render Page3333');
        if (typeInfoByShop.length > 0) {
            setOfferInfo(specialOfferItem.slice(0, 8));
            setDealOfTheDayInfo(dealOfTheDay.slice(0, 8));

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

    console.log('main');
    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <HeaderSearch />
            <ProgressStyle2 visible={progressing} />
            {/* {!progressing &&
                <FilterOptionBySubtype navigateTo={navigateTo} />
            } */}
            <ScrollView>
                {typeInfoGeneral?.length > 0 &&
                    <>
                        <View style={{ width: screenWidth - 8, padding: 10, backgroundColor: 'white' }}>
                            <Text style={{ fontSize: 18, color: '#006400', fontWeight: 'bold', paddingLeft: 5 }}>{data?.shop_name}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Image source={require('../../assets/icon/ic_place_blue.png')}
                                    style={{ width: 25, height: 25, tintColor: 'blue', resizeMode: 'contain' }} />
                                <Text style={{ fontSize: 16, color: '#006400', marginLeft: 3, marginRight: 13 }}>{data?.shop_address}</Text>
                            </View>
                        </View>
                        <SliderMedium data={DashboardSlider[0]?.first_slider} />
                        {typeInfo['PT15'] && typeInfo['PT15']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['PT15']} navigateTo={navigateTo} />
                        }

                        <OfferItems specialOfferItem={offerInfo} />

                        {typeInfo['PT12'] && typeInfo['PT12']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['PT12']} navigateTo={navigateTo} />
                        }

                        <SliderMedium data={DashboardSlider[0]?.second_slider} />

                        {typeInfo['PT16'] && typeInfo['PT16']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['PT16']} navigateTo={navigateTo} />
                        }

                        {typeInfo['PT17'] && typeInfo['PT17']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['PT17']} navigateTo={navigateTo} />
                        }

                        <DealOfTheDay dealOfTheDay={dealOfTheDayInfo} />

                        {typeInfo['PT18'] && typeInfo['PT18']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['PT18']} navigateTo={navigateTo} />
                        }

                        <SliderMedium data={DashboardSlider[0]?.third_slider} />

                        {typeInfo['PT19'] && typeInfo['PT19']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['PT19']} navigateTo={navigateTo} />
                        }

                        {typeInfo['PT20'] && typeInfo['PT20']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['PT20']} navigateTo={navigateTo} />
                        }

                        <SliderMedium data={DashboardSlider[0]?.fourth_slider} />

                        {typeInfo['PT21'] && typeInfo['PT21']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['PT21']} navigateTo={navigateTo} />
                        }

                        {typeInfo['PT22'] && typeInfo['PT22']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['PT22']} navigateTo={navigateTo} />
                        }

                        <PopularProduct
                            pageNo={pageNo}
                            setPageNo={setPageNo}
                        />
                    </>
                }
            </ScrollView>
        </View>
    );
}

export default ExploreGroceryShop;