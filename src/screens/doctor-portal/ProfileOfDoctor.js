import React, { useEffect, useState } from 'react';
import { Dimensions, useWindowDimensions, StyleSheet, FlatList, Image, TouchableOpacity, View, Text, BackHandler, TouchableHighlight, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from '@react-navigation/native';
import HTML from 'react-native-render-html';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from "react-redux"
import { storageImageUrl } from '../../helpers/imageUrl';
import { grocery_itemsImages, health_careImages, logoColor_1, logoColor_2 } from '../../helpers/Constants';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useFavouriteItem } from '../../hooks/user/favorite-item';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';

const screenWidth = Dimensions.get('window').width;
const hight = Dimensions.get('window').hight;

let connectionStatus = 'true';
let isReachable = 'true';

let merchantType = 0;

export default function ProfileOfDoctor({ route }) {
    const navigation = useNavigation();

    const data = route.params.data;
    const isLoggedin = useSelector((state) => state.user.isLoggedin);
    const deviceWidth = useWindowDimensions().width;
    const deviceHeight = useWindowDimensions().height;

    //const { data } = props.route.params;
    const [isVisible, setVisible] = useState(false);

    const {
        visible,
        isAddedToFavouriteItems,
        addToFavouriteItems,
        removeFromfavoriteItems
    } = useFavouriteItem();

    useEffect(() => {

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



    const checkIsLoggedinAndProcess = () => {
        if (isLoggedin) {
            addToFavouriteItems(data, merchantType);
        } else {
            navigation.navigate('Login')
        }
    }

    let demo_doctor_pic = require('../../assets/gallery/services/male.jpg');
    if (data?.doctorInfo?.gender === "Female") {
        demo_doctor_pic = require('../../assets/gallery/services/female.jpg');
    }

    return (

        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
            <HeaderCommon toggleDrawer={navigation} title="Doctor's Profile" connectionStatus={connectionStatus} isReachable={isReachable} />
            <ProgressStyle2 visible={visible} />

            <FlatList
                ListHeaderComponent={
                    <View style={{ height: screenWidth / 2, width: screenWidth, backgroundColor: 'white', alignItems: 'center', overflow: 'hidden', justifyContent: 'center' }}>
                        <FastImage source={data?.doctorInfo?.profile_pic && data?.doctorInfo?.profile_pic !== '' && data?.doctorInfo?.profile_pic !== null ? {
                            uri: storageImageUrl(health_careImages, data?.doctorInfo?.profile_pic)
                        } : demo_doctor_pic}
                            style={{ height: (screenWidth * 0.48), width: (screenWidth * 0.36), resizeMode: 'cover', }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>

                }
                ListFooterComponent={
                    <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                        <View style={{
                            width: screenWidth,
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            borderTopWidth: 0.5,
                            borderTopColor: '#e0e0e0',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>

                            <View style={{ flex: 1, padding: 10 }}>

                                <Text style={{ fontSize: 18, color: '#263238', fontWeight: 'bold' }}>{data?.doctorInfo?.doctor_name}</Text>
                                <Text style={{ fontSize: 16, color: '#263238' }}>{data?.doctorInfo?.qualifications}</Text>

                                {!isAddedToFavouriteItems(data?._id, 'Doctor') &&
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 3 }}>
                                        <TouchableOpacity style={{
                                            height: 35,
                                            width: '50%',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingHorizontal: 11,
                                            borderWidth: 1,
                                            borderColor: logoColor_1,
                                            borderRadius: 4,
                                            paddingLeft: 8,
                                            marginTop: 20
                                        }} onPress={() => {
                                            checkIsLoggedinAndProcess();
                                        }}>
                                            <Image style={{ width: 130, height: 35, tintColor: logoColor_2 }}
                                                resizeMode={'contain'}
                                                source={require('../../assets/icon/favorite_item.png')} />
                                        </TouchableOpacity>
                                    </View>
                                }

                            </View>
                        </View >
                    </View>
                }
            />
        </View>
    );
}


const styles = StyleSheet.create({
    imageBanner: {
        padding: 2,
        height: screenWidth - 1,
        width: screenWidth - 1,
        borderRadius: 2,
        marginHorizontal: 1
    },
    paginationContainer: {
        top: 0,
    },
    pagination: {
        width: 4,
        height: 4,
        padding: 3,
        columnGap: 1,
        marginBottom: 5,
        opacity: 1.5,
        elevation: 2,
        borderRadius: 2,
    },

});