import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, BackHandler } from 'react-native'
import { View, Text, Dimensions, FlatList, Pressable, ActivityIndicator } from 'react-native';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useDispatch, useSelector } from 'react-redux';
import FooterCommon from '../../components/footer/FooterCommon';
import AnimatedScroll from '../../components/screens-components/FoodShop/Product/AnimatedScroll';
import { useNavigation } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const hight = (screenWidth / 3) - 7;
const width = (screenWidth / 3) - 5;
const screenHeight = Dimensions.get('window').height;
const inRange = Math.floor(screenWidth / 9);
const outRange = Math.floor(screenWidth / 7);

function FoodProductList() {
    const ref = useRef(null);
    const navigation = useNavigation();
    const { productInfoByShop } = useSelector((state) => state.itemsByStoreReducer);

    const animScroll = useRef(new Animated.Value(0)).current;
    const tabTop = animScroll.interpolate({
        inputRange: [0, inRange],
        outputRange: [outRange, 60],
        extrapolate: "clamp",
        useNativeDriver: true
    });

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
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

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <HeaderCommon title={'Short on words, full on flavor'} />
            <AnimatedScroll
                tabs={productInfoByShop}
                ÄnimatedScrollValue={animScroll}
                topHeaderStyle={{ height: 50, translateY: tabTop, backgroundColor: "white", elevation: 2 }}
                itemListPropertyName="dishes"
                renderAboveItems={() => (
                    <View style={{ marginTop: 50, paddingHorizontal: 15, backgroundColor: "white", elevation: 2 }}></View>
                )}
            />
            <FooterCommon module='Food' />
        </View>
    );
}

export default FoodProductList;