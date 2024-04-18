import React, { useEffect, useState } from 'react';
import { Dimensions, View, Text, FlatList, Pressable } from "react-native";
import { useSelector } from 'react-redux';
import ManageListView, { MemoizedSubtypeView } from './ManageListView';
import SliderMedium from '../../Common/slider/slider-medium';

import DealOfTheDay from '../products/DealOfTheDay';
import OfferItems from '../products/OfferItems';
import { grocery_sliderTypeSubtypeImagesFolderName } from '../../../../helpers/Constants';

const screenWidth = Dimensions.get('window').width;

function FilterOptionBySubtype() {

    const { typeInfo, DashboardSlider } = useSelector((state) => state.dashboard);

    const [typeInfoGeneral, setTypeInfoGeneral] = useState(typeInfo);

    // useEffect(() => {
    //     if (typeInfoByShop.length > 0) {
    //         let generaltypeInfo = typeInfoByShop?.filter(
    //             (type) => type.statusType === 'General'
    //         );

    //         generaltypeInfo?.forEach((info, i) => {
    //             let eachTypeInfo = {
    //                 _id: info?.typeInfo?._id,
    //                 custom_type_id: info.custom_type_id,
    //                 typeName: info?.typeName,
    //                 subtype: subtypeInfoByShop?.filter(
    //                     (subtype) => subtype.typeInfo === info?.typeInfo
    //                 )
    //             };
    //             typeInfo = { ...typeInfo, [info.custom_type_id]: eachTypeInfo };
    //         });

    //         setTypeInfoGeneral(generaltypeInfo);
    //     }

    // }, [typeInfoByShop]);

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>


            {typeInfoGeneral['PT15'] && typeInfoGeneral['PT15']?.subtype?.length > 0 &&
                <MemoizedSubtypeView data={typeInfoGeneral['PT15']} />
            }

            <OfferItems />

            {typeInfo['PT12'] && typeInfo['PT12']?.subtype?.length > 0 &&
                <ManageListView data={typeInfo['PT12']} />
            }

            <SliderMedium data={DashboardSlider[0]?.second_slider} folder_name={grocery_sliderTypeSubtypeImagesFolderName} />

            {typeInfo['PT16'] && typeInfo['PT16']?.subtype?.length > 0 &&
                <ManageListView data={typeInfo['PT16']} />
            }

            {typeInfo['PT17'] && typeInfo['PT17']?.subtype?.length > 0 &&
                <ManageListView data={typeInfo['PT17']} />
            }

            <DealOfTheDay />

            {typeInfo['PT18'] && typeInfo['PT18']?.subtype?.length > 0 &&
                <ManageListView data={typeInfo['PT18']} />
            }

            <SliderMedium data={DashboardSlider[0]?.third_slider} folder_name={grocery_sliderTypeSubtypeImagesFolderName} />

            {typeInfo['PT19'] && typeInfo['PT19']?.subtype?.length > 0 &&
                <ManageListView data={typeInfo['PT19']} />
            }

            {typeInfo['PT20'] && typeInfo['PT20']?.subtype?.length > 0 &&
                <ManageListView data={typeInfo['PT20']} />
            }

            <SliderMedium data={DashboardSlider[0]?.fourth_slider} folder_name={grocery_sliderTypeSubtypeImagesFolderName} />

            {typeInfo['PT21'] && typeInfo['PT21']?.subtype?.length > 0 &&
                <ManageListView data={typeInfo['PT21']} />
            }

            {typeInfo['PT22'] && typeInfo['PT22']?.subtype?.length > 0 &&
                <ManageListView data={typeInfo['PT22']} />
            }
        </View>
    );
}

export default FilterOptionBySubtype;