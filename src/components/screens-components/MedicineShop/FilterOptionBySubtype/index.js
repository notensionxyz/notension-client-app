import React, { useEffect, useState } from 'react';
import { Dimensions, View } from "react-native";
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-virtualized-view';
import ManageListView from './ManageListView';
import SliderMedium from '../../Common/slider/slider-medium';
import PopularProduct from '../products/PopularProduct';

const screenWidth = Dimensions.get('window').width;

let typeInfo = {};

function FilterOptionBySubtype({ navigateTo }) {
    const { loginUserInfo } = useSelector((state) => state.user);
    const { typeInfoByShop, subtypeInfoByShop, DashboardSlider } = useSelector((state) => state.itemsByStoreReducer);
    const [typeInfoGeneral, setTypeInfoGeneral] = useState([]);
    const [customTypeInfo, setCustomTypeInfo] = useState([]);
  
    useEffect(() => {
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
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <ScrollView>
                {typeInfoGeneral?.length > 0 &&
                    <>
                        <SliderMedium data={DashboardSlider[0]?.first_slider} />
                        {typeInfo['PT15'] && typeInfo['PT15']?.subtype?.length > 0 &&
                            <ManageListView data={typeInfo['PT15']} navigateTo={navigateTo} />
                        }

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

                        <PopularProduct />
                    </>
                }
            </ScrollView>
        </View>
    );
}

export default FilterOptionBySubtype;