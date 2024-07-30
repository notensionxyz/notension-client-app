import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Pressable, View, BackHandler, Alert } from "react-native";
import FastImage from 'react-native-fast-image';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { storageImageUrl } from '../../helpers/imageUrl';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { useFood } from '../../hooks/fetch-data-by-module/useFood';
import { useSelector } from 'react-redux';
import { food_sliderTypeSubtypeImagesFolderName } from '../../helpers/Constants';
import { ScrollView } from 'react-native-virtualized-view';
import SliderMedium from '../../components/screens-components/Common/slider/slider-medium';
import SliderLarge from '../../components/screens-components/Common/slider/slider-large';
import HeaderFoodModule from '../../components/header/HeaderFoodModule';
import LocationInfo from '../../components/screens-components/Common/LocationInfo';

const screenWidth = Dimensions.get('window').width;

export default function ExploreFoodModule() {
    const navigation = useNavigation();
    const { shopCategory, DashboardSlider } = useSelector((state) => state.dashboard);
    const { exploreFoodModule, progressing, resetReducer } = useFood();

    useEffect(() => {
        resetReducer();
        exploreFoodModule();
        const backAction = () => {
            navigation.goBack();
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);

    return (
        <>
            <ProgressStyle2 visible={progressing} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', marginBottom: 8 }}>
                <HeaderFoodModule toggleDrawer={navigation} />

                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                        <LocationInfo />
                        <SliderMedium data={DashboardSlider[0]?.first_slider} folder_name={food_sliderTypeSubtypeImagesFolderName} />
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable onPress={() => { navigation.navigate('NearestFoodShop', { data: shopCategory[0] }) }}>
                                <View style={{ height: ((screenWidth / 4) * 3) - 13, width: (screenWidth / 2) - 5, padding: 5, borderRadius: 10 }}>
                                    <View style={{
                                        justifyContent: 'space-between',
                                        borderRadius: 10,
                                        shadowRadius: 10,
                                        elevation: 3,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        alignItems: 'center',
                                        backgroundColor: 'white'
                                    }}>
                                        <FastImage
                                            source={{ uri: storageImageUrl(food_sliderTypeSubtypeImagesFolderName, shopCategory[0]?.banner) }}
                                            resizeMode={FastImage.resizeMode.contain}
                                            style={{
                                                height: '100%',
                                                width: '100%',
                                                justifyContent: 'flex-end',
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
                            <Pressable onPress={() => { navigation.navigate('NearestFoodShop', { data: shopCategory[1] }) }}>
                                <View style={{ height: ((screenWidth / 4) * 3) - 13, width: (screenWidth / 2) - 5, padding: 5, borderRadius: 10 }}>
                                    <View style={{
                                        justifyContent: 'space-between',
                                        borderRadius: 10,
                                        shadowRadius: 10,
                                        elevation: 3,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        backgroundColor: 'white'
                                    }}>
                                        <FastImage
                                            source={{ uri: storageImageUrl(food_sliderTypeSubtypeImagesFolderName, shopCategory[1]?.banner) }}
                                            resizeMode={FastImage.resizeMode.contain}
                                            style={{
                                                height: '100%',
                                                width: '100%',
                                                justifyContent: 'flex-end',
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
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <Pressable onPress={() => { navigation.navigate('NearestFoodShop', { data: shopCategory[2] }) }}>
                                <View style={{ height: (screenWidth / 3) - 5, width: screenWidth - 18, borderRadius: 10, margin: 5 }}>
                                    <View style={{
                                        borderRadius: 10,
                                        shadowRadius: 10,
                                        elevation: 3,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        backgroundColor: 'white'
                                    }}>
                                        <FastImage
                                            source={{ uri: storageImageUrl(food_sliderTypeSubtypeImagesFolderName, shopCategory[2]?.banner) }}
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
                        </View>

                        <SliderLarge data={DashboardSlider[0]?.second_slider} folder_name={food_sliderTypeSubtypeImagesFolderName} />
                        <View style={{ flexDirection: 'row', }}>
                            <Pressable onPress={() => { navigation.navigate('NearestFoodShop', { data: shopCategory[7] }) }}>
                                <View style={{ height: (screenWidth / 2) - 8, width: screenWidth - 16, borderRadius: 10, margin: 5 }}>
                                    <View style={{
                                        borderRadius: 10,
                                        shadowRadius: 10,
                                        elevation: 3,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        backgroundColor: 'white'
                                    }}>
                                        <FastImage
                                            source={{ uri: storageImageUrl(food_sliderTypeSubtypeImagesFolderName, shopCategory[7]?.banner) }}
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
                        </View>
                        <SliderLarge data={DashboardSlider[0]?.third_slider} folder_name={food_sliderTypeSubtypeImagesFolderName} />
                        <View style={{ flexDirection: 'row', }}>
                            <Pressable onPress={() => { navigation.navigate('NearestFoodShop', { data: shopCategory[3] }) }}>
                                <View style={{ height: (screenWidth / 3) - 5, width: screenWidth - 18, borderRadius: 10, margin: 5 }}>
                                    <View style={{
                                        borderRadius: 10,
                                        shadowRadius: 10,
                                        elevation: 3,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        backgroundColor: 'white'
                                    }}>
                                        <FastImage
                                            source={{ uri: storageImageUrl(food_sliderTypeSubtypeImagesFolderName, shopCategory[3]?.banner) }}
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
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <Pressable onPress={() => { navigation.navigate('NearestFoodShop', { data: shopCategory[4] }) }}>
                                <View style={{ height: (screenWidth / 3) - 5, width: screenWidth - 18, borderRadius: 10, margin: 5 }}>
                                    <View style={{
                                        borderRadius: 10,
                                        shadowRadius: 10,
                                        elevation: 3,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        backgroundColor: 'white'
                                    }}>
                                        <FastImage
                                            source={{ uri: storageImageUrl(food_sliderTypeSubtypeImagesFolderName, shopCategory[4]?.banner) }}
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
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable onPress={() => { navigation.navigate('NearestFoodShop', { data: shopCategory[5] }) }}>
                                <View style={{ height: (screenWidth / 2) - 15, width: (screenWidth / 2) - 15, borderRadius: 10, margin: 5 }}>
                                    <View style={{
                                        borderRadius: 10,
                                        shadowRadius: 10,
                                        elevation: 3,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        backgroundColor: 'white'
                                    }}>
                                        <FastImage
                                            source={{ uri: storageImageUrl(food_sliderTypeSubtypeImagesFolderName, shopCategory[5]?.banner) }}
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
                            <Pressable onPress={() => { navigation.navigate('NearestFoodShop', { data: shopCategory[6] }) }}>
                                <View style={{ height: (screenWidth / 2) - 15, width: (screenWidth / 2) - 15, borderRadius: 10, margin: 5 }}>
                                    <View style={{
                                        borderRadius: 10,
                                        shadowRadius: 10,
                                        elevation: 3,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        backgroundColor: 'white'
                                    }}>
                                        <FastImage
                                            source={{ uri: storageImageUrl(food_sliderTypeSubtypeImagesFolderName, shopCategory[6]?.banner) }}
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
                        </View>

                        <SliderLarge data={DashboardSlider[0]?.fourth_slider} folder_name={food_sliderTypeSubtypeImagesFolderName} />
                    </View >
                </ScrollView>
            </View >
        </>
    );
}

const styles = StyleSheet.create({
    imageBanner: {
        height: screenWidth / 2,
        width: screenWidth - 1,
        borderRadius: 2,
        marginHorizontal: 1
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});