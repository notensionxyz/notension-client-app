import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View } from "react-native";
import FlatListThreeColumns from './FlatListThreeColumns';
import FlatListTwoColumns from './FlatListTwoColumns';
import FlatListSingleColumns from './FlatListSingleColumns';
import { logoColor_2 } from '../../../../helpers/Constants';
import { useNavigation } from '@react-navigation/native';
let remainder = 0;

export const MemoizedSubtypeView = React.memo(ManageListView);

function ManageListView({ data }) {
    const navigation = useNavigation();
    const [reamainingInfo, setReamainingInfo] = useState([]);
    const [lastInfo, setLastInfo] = useState([]);

    useEffect(() => {

        if (data?.subtype.length > 6) {
            remainder = parseFloat(data?.subtype.length) % 3;
        } else {
            remainder = parseFloat(data?.subtype.length) % 2;
        }

        if (remainder === 2) {
            const lastTwoElements = data?.subtype.slice(-2);
            setLastInfo(lastTwoElements);
            const remainingElements = data?.subtype.slice(0, (data?.subtype.length - 2));
            setReamainingInfo(remainingElements);
        }

        if (remainder === 1) {

            const lastElement = data?.subtype.slice(-1);
            setLastInfo(lastElement);
            const remainingElements = data?.subtype.slice(0, (data?.subtype.length - 1));
            setReamainingInfo(remainingElements);
            //const lastElement = data?.subtype[data?.subtype.length - 1];
            //console.log('Length : ', data?.subtype.length, 'Remailder :', remainder, 'lastTwoElements', lastElement);
        }

        if (remainder === 0) {
            setReamainingInfo(data?.subtype);
            setLastInfo([]);
        }
        // setSubtype(data?.subtype);

        //console.log('again');
    }, []);


    const subtypeByselectedType = React.useCallback((selectedSubtype) => {
        const options = {
            searchProduct: false,
            fetchByoption: true,
            fetchBycustomType: false,
            customType: '',
            Title: data.typeName,
            subtypeByselectedType: data.subtype,
            productSubtype: selectedSubtype?.subtypeInfo?._id || '303030303030303030303030',
        };
        //console.log('again - pressss');
      
        navigation.navigate('GroceryProductList', { options });
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', marginBottom: 5, marginTop: 5 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF' }}>
                <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                    {data?.typeName}</Text>
            </View>

            {data?.subtype.length > 6 &&
                <>
                    <FlatListThreeColumns listInfo={reamainingInfo} navigateTo={subtypeByselectedType} />
                    {lastInfo.length >= 2 ?
                        <FlatListTwoColumns listInfo={lastInfo} TopPadding={0} navigateTo={subtypeByselectedType} />
                        :
                        <FlatListSingleColumns listInfo={lastInfo} TopPadding={3} navigateTo={subtypeByselectedType} />
                    }
                </>
            }

            {data?.subtype.length <= 6 &&
                <>
                    <FlatListTwoColumns listInfo={reamainingInfo} TopPadding={4} navigateTo={subtypeByselectedType} />
                    <FlatListSingleColumns listInfo={lastInfo} TopPadding={3} navigateTo={subtypeByselectedType} />
                </>
            }
        </View>
    );
}

export default ManageListView;