import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Text, BackHandler, View, Pressable, Alert } from "react-native";
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { storageImageUrl } from '../../helpers/imageUrl';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useFavouriteList } from '../../hooks/user/favorite-list';
import { MemoizedConsultationCenter } from '../../components/screens-components/HealthCare/FavouriteOption/ConsultationCenter';
import { MemoizedDoctorView } from '../../components/screens-components/HealthCare/FavouriteOption/Doctor';

const screenWidth = Dimensions.get('window').width;

function FavouriteServiceProvider({ route }) {
    const merchantType = route.params.merchantType;
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [favouriteInfo, setFavouriteInfo] = useState([]);

    const {
        favouriteConsultationCentre,
        favouriteDoctors } = useSelector((state) => state.userChoice);

    const {
        visible,
        removeFromfavoriteList,
    } = useFavouriteList();

    useEffect(() => {
        if (merchantType === 3) {
            setTitle('Favourite Consultation Info');
            setFavouriteInfo(favouriteConsultationCentre);
        } else if (merchantType === 4) {
            setTitle('Favourite Doctors Info');
            setFavouriteInfo(favouriteDoctors);
        }

    }, [favouriteDoctors, favouriteConsultationCentre]);

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

    const removeInformation = (data) => {
        Alert.alert("মুছে ফেলতে চান ??", "আপনি কি আপনার প্রিয় তালিকা থেকে তথ্যটি মুছে ফেলতে চান?", [
            {
                text: "No",
                onPress: () => null,
                style: "No"
            },
            { text: "Yes", onPress: () => removeFromfavoriteList(data, merchantType) }
        ]);
    }

    return (
        <>
            <ProgressStyle2 visible={visible} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
                <HeaderCommon title={title} toggleDrawer={navigation} />
                <View style={{
                    backgroundColor: '#FFF',
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{ flex: 1, paddingTop: 8, paddingBottom: 8 }}>
                        <Text style={{ color: '#006400', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Select Any</Text>
                    </View>
                </View>

                <FlatList
                    contentContainerStyle={{ padding: 5 }}
                    data={favouriteInfo}
                    renderItem={({ item }) =>
                        <>
                            {
                                merchantType === 3 &&
                                < MemoizedConsultationCenter
                                    info={item}
                                    removeInformation={removeInformation}
                                />
                            }
                            {
                                merchantType === 4 &&
                                < MemoizedDoctorView
                                    data={item}
                                    removeInformation={removeInformation}
                                />
                            }
                        </>
                    }
                    keyExtractor={item => item.mongodbId}
                />
            </View>
        </>
    );
}

export default FavouriteServiceProvider;