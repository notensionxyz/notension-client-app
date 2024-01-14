import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux';
import { useUser } from '../../../hooks/useUser';
import { storageImageUrl } from '../../../helpers/imageUrl';
import { useGlobal } from '../../../hooks/global';
import ProgressStyle2 from '../../progress-animation/ProgressStyle2';

const screenWidth = Dimensions.get('window').width;

function DistrictName({ filteredInfo }) {
    const districtInfo = useSelector((state) => state.user.districtInfo);
    const [fetching, setFetching] = useState(false);
    const { saveSelectedDistrictInfo } = useUser();
    const { getDistrictInfo, progressing } = useGlobal();

    useEffect(() => {
        if (districtInfo.length < 1) {
            getDistrictInfo();
        }
    }, []);

    const saveSlectedDistrict = (slectedDistrict) => {

        let districtSelected = {
            districtId: slectedDistrict._id,
            districtName: slectedDistrict.district_name,
        };

        saveSelectedDistrictInfo(districtSelected);
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <ProgressStyle2 visible={progressing} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#ff9800', width: '100%' }}>
                    <Text style={{ flex: 1, color: 'white', paddingVertical: 10, fontSize: 18, textAlign: 'center' }}>Select District</Text>
                </View>
                <FlatList
                    contentContainerStyle={{ padding: 5 }}
                    data={filteredInfo}
                    renderItem={({ item }) => <ListItem data={item} saveSlectedDistrict={saveSlectedDistrict} />}
                    keyExtractor={item => item._id}
                />
            </View>
        </View>
    );
}

function ListItem({ data, saveSlectedDistrict }) {
    let cardMargin = 5;
    let cardWidth = screenWidth - (cardMargin * 4);

    return (
        <TouchableOpacity onPress={() => { saveSlectedDistrict(data); }}>
            <View style={{
                backgroundColor: 'white',
                width: cardWidth,
                margin: cardMargin,
                flexDirection: 'row',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                borderRadius: 10,
                elevation: 3,
            }} >
                <View style={{ height: screenWidth / 3, width: screenWidth / 3, overflow: 'hidden', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                    <FastImage
                        style={{ height: '100%', width: '100%' }}
                        source={{
                            uri: storageImageUrl('app-dashboard', data.districtImg),
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
                <View style={{ flex: 1, padding: 15 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#F68F1E' }}>{data.district_name}</Text>
                    <Text style={{ fontSize: 15, color: '#003B95', marginTop: 8 }} numberOfLines={3} ellipsizeMode="tail">{data.description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default DistrictName;