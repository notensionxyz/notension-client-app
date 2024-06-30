import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, Text, Image, SafeAreaView, Pressable, FlatList, BackHandler } from "react-native";
import { useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { ScrollView } from 'react-native-virtualized-view';
import FooterExploreStore from '../../components/footer/FooterExploreStore';


import ListView, { MemoizedListView } from '../../components/screens-components/FoodShop/Product/ListView';
import { storageImageUrl } from '../../helpers/imageUrl';
import HeaderFoodModule from '../../components/header/HeaderFoodModule';
import { useDoctor } from '../../hooks/fetch-data-by-module/health-care/useDoctor';
import ManageListView from '../../components/screens-components/HealthCare/FilterOptionByDept/ManageListView';
import FlatListThreeColumns from '../../components/screens-components/HealthCare/FilterOptionByDept/FlatListThreeColumns';
import FlatListTwoColumns from '../../components/screens-components/HealthCare/FilterOptionByDept/FlatListTwoColumns';

const screenWidth = Dimensions.get('window').width;
let merchantType = 2;

function FindAmbulance() {
    const ref = useRef(null);
    const navigation = useNavigation();
    const { customstore_id, merchantId, allDeptInfo, popularDoctors } = useSelector((state) => state.doctorInfo);

    const { exploreFindDoctor, progressing } = useDoctor();
    const isLoggedin = useSelector((state) => state.user.isLoggedin);

    useEffect(() => {
        exploreFindDoctor();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                navigation.goBack();
                return true;
            };

            const subscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );

            return () => subscription.remove();
        }, [navigation])
    );

    // const checkIsLoggedinAndProcess = (action) => {
    //     if (isLoggedin) {
    //         addToFavouriteList(visitedFoodStore, merchantType);
    //     } else {
    //         navigation.navigate('Login')
    //     }
    // }
    const subtypeByselectedType = () => {
        //navigation.navigate('FoodProductList');
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#f9f9f9',
        }}>
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                <HeaderFoodModule toggleDrawer={navigation} />
                <ProgressStyle2 visible={progressing} />

                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                        <FlatListThreeColumns listInfo={allDeptInfo.allDepartments} navigateTo={subtypeByselectedType} />
                        <FlatListTwoColumns listInfo={allDeptInfo.allDepartments} TopPadding={5} navigateTo={subtypeByselectedType} />
                    </View>
                </ScrollView>
                {/* <FooterExploreStore module='Food' contact={visitedFoodStore?.contact_no} /> */}
            </View>
        </SafeAreaView>
    );
}

export default FindAmbulance;