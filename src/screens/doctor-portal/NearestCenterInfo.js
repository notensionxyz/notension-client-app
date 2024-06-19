import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, FlatList, Pressable, ActivityIndicator, BackHandler } from 'react-native';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { useCenter } from '../../hooks/fetch-data-by-module/health-care/useCenter';
import { MemoizedVerticalListView } from '../../components/screens-components/HealthCare/ConsultationCenter/VerticalListView';

const screenWidth = Dimensions.get('window').width;
const hight = (screenWidth / 3) - 7;
const width = (screenWidth / 3) - 5;
const screenHeight = Dimensions.get('window').height;

function NearestCenterInfo({ route }) {
    const ref = useRef(null);
    const navigation = useNavigation();
    const options = route.params.options;
    const [centerInfo, setCenterInfo] = useState([]);

    const {
        progressing,
        getNearestCenterInfo,
    } = useCenter();

    useEffect(() => {
        getNearestCenterInfo(options?.centerType, setCenterInfo);
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
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', }}>
                <HeaderCommon title={options.Title} />
                <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
                    <FlatList
                        contentContainerStyle={{ padding: 5 }}
                        data={centerInfo}
                        keyExtractor={item => item?._id}
                        renderItem={({ item, index }) =>
                            <MemoizedVerticalListView data={item} showDept={options?.findNearestDoctors} />}
                    />
                </View>
            </View>
        </>
    );
}

export default NearestCenterInfo;