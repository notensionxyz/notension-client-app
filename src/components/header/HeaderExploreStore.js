import React from 'react';
import { Image, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { handleItemsByStoreReducer } from '../../store/reducers/items-by-shop';
import { useDispatch } from 'react-redux';

export default function HeaderExploreStore({ Title, module }) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const navigateTo = () => {
        const options = {
            searchProduct: true,
            fetchByoption: false,
            fetchBycustomType: false,
            customType: '',
            productSubtype: '',
        };
        
        if (module === 'Grocery') {
            navigation.navigate('GroceryProductList', { options });
        }

        if (module === 'Medicine') {
            navigation.navigate('MedicineProductList', { options });
        }
        
        let TypeInfo = {
            typeName: 'Search Product',
            subtype: []
        };
        dispatch(
            handleItemsByStoreReducer({
                type: 'SAVE_SUBTYPE_INFO_BY_TYPE',
                data: TypeInfo,
            })
        );
    }
    return (

        <View style={{ width: '100%', backgroundColor: 'white', flexDirection: 'row', borderBottomWidth: 0.8, borderBottomColor: '#006400' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}
                style={{ padding: 9, marginTop: 7, paddingLeft: 18 }}>
                <Image source={require('../../assets/icon/ic_arrow_back.png')}
                    style={{ height: 23, width: 23, resizeMode: 'contain', tintColor: '#006400' }} />
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 40,
                    paddingLeft: 10,
                    padding: 2,
                    fontSize: 19,
                    marginTop: 5,
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: '#006400',
                    color: '#2c2c2c',
                    marginHorizontal: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={() => navigateTo()}
            // onPress={() => {
            //     props.onSearchBoxPress('hello');

            //     //navigation.goBack()
            // }}
            >
                <Text style={{ fontSize: 16, color: '#006400', fontWeight: "bold", textAlign: 'center' }}>{Title}</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.toggleDrawer(); }}
                style={{ paddingLeft: 15, paddingRight: 20, padding: 10, marginTop: 7 }}>
                <Image source={require('../../assets/icon/ic_home.png')} style={{ height: 18, width: 18, tintColor: '#48d7ff', resizeMode: 'contain', tintColor: '#006400' }} />
            </TouchableOpacity>
        </View>

    );
}
