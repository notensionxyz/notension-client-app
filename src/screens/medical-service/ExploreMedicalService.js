import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, FlatList, Pressable, ActivityIndicator, BackHandler } from 'react-native';
import HeaderCommon from '../../components/header/HeaderCommon';
import FastImage from 'react-native-fast-image';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { useCenter } from '../../hooks/fetch-data-by-module/health-care/useCenter';
import { MemoizedVerticalListView } from '../../components/screens-components/HealthCare/ConsultationCenter/VerticalListView';
import { useServiceProvider } from '../../hooks/fetch-data-by-module/health-care/useServiceProvider';
import SliderMedium from '../../components/screens-components/Common/slider/slider-medium';
import { health_careImages } from '../../helpers/Constants';
import { storageImageUrl } from '../../helpers/imageUrl';
import LocationInfo from '../../components/screens-components/Common/LocationInfo';

const screenWidth = Dimensions.get('window').width;
const hight = (screenWidth / 3) - 7;
const width = (screenWidth / 3) - 5;
const screenHeight = Dimensions.get('window').height;

function ExploreMedicalService() {
    const ref = useRef(null);
    const navigation = useNavigation();
    const [providerBanner, setProviderBanner] = useState([]);
    const [slider, setSlider] = useState([]);
    const [module, setModule] = useState([]);

    useEffect(() => {
        //console.log(providerBanner.length-4);
        setSlider(providerBanner?.slice(0, (providerBanner.length - 4)));
        setModule(providerBanner?.slice(-4));
    }, [providerBanner]);

    const {
        progressing,
        exploreMedicalServiceProvider,
    } = useServiceProvider();

    useEffect(() => {
        exploreMedicalServiceProvider(setProviderBanner);
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

    const navigateTo = (data) => {
        parseFloat(data?.id)
        if (parseFloat(data?.id) === parseFloat(providerBanner.length)) {
            const options = {
                centerType: 'Nursing Service',
                Title: 'Nursing Service Provider Info',
            };
            navigation.navigate('MedicalServiceProvider', { options });

        } else if (parseFloat(data?.id) === parseFloat(providerBanner.length - 1)) {
            const options = {
                centerType: 'Physiotherapy Service',
                Title: 'Physiotherapy Provider Info',
            };
            navigation.navigate('MedicalServiceProvider', { options });

        } else if (parseFloat(data?.id) === parseFloat(providerBanner.length - 2)) {
            const options = {
                centerType: 'General Physician',
                Title: 'General Physician Info',
            };
            navigation.navigate('MedicalServiceProvider', { options });

        } else if (parseFloat(data?.id) === parseFloat(providerBanner.length - 3)) {
            const options = {
                centerType: 'Homeopathic doctor',
                Title: 'Homeopathic doctor Info',
            };
            navigation.navigate('MedicalServiceProvider', { options });
        }
    }

    return (
        <>
            <ProgressStyle2 visible={progressing} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', }}>
                <HeaderCommon title={'Medical Service Provider'} />
                <LocationInfo />
                <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', justifyContent: 'center' }}>
                    <SliderMedium data={slider} folder_name={health_careImages} />
                    <FlatList
                        contentContainerStyle={{ padding: 3 }}
                        showsHorizontalScrollIndicator={false}
                        numColumns={2}
                        data={module}
                        renderItem={({ item }) => <ItemData data={item} navigateTo={navigateTo} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </>
    );
}

function ItemData({ data, navigateTo }) {
    const navigation = useNavigation();
    //console.log(data);

    return (

        <Pressable onPress={() => { navigateTo(data); }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ height: (screenWidth / 2) - 16, width: (screenWidth / 2) - 16, margin: 5 }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 6,
                        shadowRadius: 6,
                        elevation: 3,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        backgroundColor: 'white'
                    }}>
                        <FastImage
                            source={{
                                uri: storageImageUrl(health_careImages, data?.file_name),
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                height: '100%', width: '100%',
                                alignItems: 'center', justifyContent: 'center',
                                borderRadius: 6,
                                shadowRadius: 6,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3,
                                overflow: 'hidden'
                            }} />
                    </View>
                </View>
            </View>
        </Pressable >

    );
}

export default ExploreMedicalService;