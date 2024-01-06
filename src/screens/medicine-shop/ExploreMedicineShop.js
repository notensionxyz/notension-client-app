import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, Text, Image, Alert } from "react-native";
import { useSelector } from 'react-redux';
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
import { useMedicine } from '../../hooks/fetch-data-by-module/useMedicine';
import { medicine_sliderTypeSubtypeImagesFolderName } from '../../helpers/Constants';

let typeInfo = {};
const screenWidth = Dimensions.get('window').width;

function ExploreMedicineShop() {
    const ref = useRef(null);
    const navigation = useNavigation();
    const { typeInfoByShop, subtypeInfoByShop, DashboardSlider, visitedMedicineStore } = useSelector((state) => state.dashboard);
    const [typeInfoGeneral, setTypeInfoGeneral] = useState([]);
    const [customTypeInfo, setCustomTypeInfo] = useState([]);

    const { exploreStore, progressing } = useMedicine();
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

        navigation.navigate('MedicineProductList', { options });
    }

    useEffect(() => {
        console.log('Render Page');
        resetState();
        setPageNo(2);
        if (visitedMedicineStore?._id && visitedMedicineStore?.custom_store_id) {
            exploreStore(visitedMedicineStore)
        }
    }, []);

    useEffect(() => {
        console.log('Render Page3333');
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

    console.log('main');

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <HeaderExploreStore Title='Search here.... e.g Napa, Maxpro' module='Medicine' />
            <ProgressStyle2 visible={progressing} />
            {/* {!progressing &&
                <FilterOptionBySubtype navigateTo={navigateTo} />
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

                        <SliderMedium data={DashboardSlider[0]?.first_slider} folder_name={medicine_sliderTypeSubtypeImagesFolderName} />

                        {typeInfo['MPT14'] && typeInfo['MPT14']?.subtype.length > 0 &&
                            <ManageListView data={typeInfo['MPT14']} navigateTo={navigateTo} />
                        }

                        <OfferItems />

                        {typeInfo['MPT15'] && typeInfo['MPT15']?.subtype.length > 0 &&
                            <ManageListView data={typeInfo['MPT15']} navigateTo={navigateTo} />
                        }

                        <SliderMedium data={DashboardSlider[0]?.second_slider} folder_name={medicine_sliderTypeSubtypeImagesFolderName}/>

                        {typeInfo['MPT16'] && typeInfo['MPT16']?.subtype.length > 0 &&
                            <ManageListView data={typeInfo['MPT16']} navigateTo={navigateTo} />
                        }

                        {typeInfo['MPT17'] && typeInfo['MPT17']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['MPT17']} navigateTo={navigateTo} />
                        }

                        <SliderMedium data={DashboardSlider[0]?.third_slider} folder_name={medicine_sliderTypeSubtypeImagesFolderName}/>

                        {typeInfo['MPT18'] && typeInfo['MPT18']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['MPT18']} navigateTo={navigateTo} />
                        }

                        {typeInfo['MPT19'] && typeInfo['MPT19']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['MPT19']} navigateTo={navigateTo} />
                        }

                        <SliderMedium data={DashboardSlider[0]?.fourth_slider} folder_name={medicine_sliderTypeSubtypeImagesFolderName}/>

                        {typeInfo['MPT20'] && typeInfo['MPT20']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['MPT20']} navigateTo={navigateTo} />
                        }

                        <PopularProduct pageNo={pageNo} setPageNo={setPageNo} />
                    </>
                }
            </ScrollView>
            <FooterExploreStore module='Medicine' contact={visitedMedicineStore?.contact_no} />
        </View>
    );
}

export default ExploreMedicineShop;