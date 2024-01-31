import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View } from "react-native";
import FlatListThreeColumns from './FlatListThreeColumns';
import FlatListTwoColumns from './FlatListTwoColumns';
import FlatListSingleColumns from './FlatListSingleColumns';
import { logoColor_2 } from '../../../../helpers/Constants';
import { useNavigation } from '@react-navigation/native';
let remainder = 0;

function ManageListView({ productCategory }) {
    const navigation = useNavigation();
    const [reamainingInfo, setReamainingInfo] = useState([]);
    const [lastInfo, setLastInfo] = useState([]);

    useEffect(() => {

        if (productCategory?.length > 10) {
            remainder = parseFloat(productCategory?.length) % 3;
        } else {
            remainder = parseFloat(productCategory?.length) % 2;
        }

        if (remainder === 2) {
            const lastTwoElements = productCategory?.slice(-2);
            setLastInfo(lastTwoElements);
            const remainingElements = productCategory?.slice(0, (productCategory?.length - 2));
            setReamainingInfo(remainingElements);
        }

        if (remainder === 1) {

            const lastElement = productCategory?.slice(-1);
            setLastInfo(lastElement);
            const remainingElements = productCategory?.slice(0, (productCategory?.length - 1));
            setReamainingInfo(remainingElements);
            //const lastElement = productCategory?[productCategory?.length - 1];
            //console.log('Length : ', productCategory?.length, 'Remailder :', remainder, 'lastTwoElements', lastElement);
        }

        if (remainder === 0) {
            setReamainingInfo(productCategory);
            setLastInfo([]);
        }
        // setSubtype(productCategory?);
    }, []);


    const subtypeByselectedType = () => {
        // const options = {
        //     searchProduct: false,
        //     fetchByoption: true,
        //     fetchBycustomType: false,
        //     customType: '',
        //     Title: data.typeName,
        //     subtypeByselectedType: data.subtype,
        //     productSubtype: selectedSubtype?.subtypeInfo?._id || '303030303030303030303030',
        // };

        navigation.navigate('FoodProductList');
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', marginBottom: 5, paddingTop: 5 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF' }}>
                <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                    {'Product Category'}</Text>
            </View>

            {productCategory?.length > 10 &&
                <>
                    <FlatListThreeColumns listInfo={reamainingInfo} navigateTo={subtypeByselectedType} />
                    {lastInfo.length >= 2 ?
                        <FlatListTwoColumns listInfo={lastInfo} TopPadding={0} navigateTo={subtypeByselectedType} />
                        :
                        <FlatListSingleColumns listInfo={lastInfo} TopPadding={3} navigateTo={subtypeByselectedType} />
                    }
                </>
            }

            {productCategory?.length <= 10 &&
                <>
                    <FlatListTwoColumns listInfo={reamainingInfo} TopPadding={5} navigateTo={subtypeByselectedType} />
                    <FlatListSingleColumns listInfo={lastInfo} TopPadding={5} navigateTo={subtypeByselectedType} />
                </>
            }
        </View>
    );
}

export default ManageListView;