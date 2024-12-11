import React from 'react';
import { Dimensions, FlatList, Platform, Text, TouchableOpacity, View, PermissionsAndroid, ToastAndroid } from "react-native";

import FastImage from 'react-native-fast-image'
import { storageImageUrl } from '../../../helpers/imageUrl';


const screenWidth = Dimensions.get('window').width;

function DistrictName({ districtInfo, saveSlectedDistrict }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#F68F1E', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#003B95', paddingVertical: 5, textAlign: 'center' }}>Select District</Text>
            </View>
            <FlatList
                contentContainerStyle={{ padding: 5 }}
                data={districtInfo}
                renderItem={({ item }) => <ListItem data={item} saveSlectedDistrict={saveSlectedDistrict} />}
                keyExtractor={item => item._id}
            />
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
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#F68F1E' }} numberOfLines={1} ellipsizeMode="tail">{data.district_name}</Text>
                    <Text style={{ fontSize: 15, color: '#003B95', marginTop: 8 }} numberOfLines={3} ellipsizeMode="tail">{data.description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default DistrictName;