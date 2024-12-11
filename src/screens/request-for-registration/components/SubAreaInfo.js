import React from 'react';
import { Dimensions, FlatList, Text, View, Pressable } from "react-native";

const screenWidth = Dimensions.get('window').width;

function SubAreaInfo({ subAdminArea, setInformation }) {
    const seletedSubArea = (subArea) => {
        setInformation((prev) => ({
            ...prev,
            district_subarea_info: subArea._id,
            districtSubAreaName: subArea.subarea_name,
        }));
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#F68F1E', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#003B95', paddingVertical: 5, textAlign: 'center' }}>Select Subarea</Text>
            </View>
            <FlatList
                contentContainerStyle={{ paddingVertical: 5 }}
                data={subAdminArea}
                renderItem={({ item }) => <ItemData data={item} seletedSubArea={seletedSubArea} />}
                keyExtractor={item => item._id}
            />
        </View>
    );
}

function ItemData({ data, seletedSubArea }) {
    let cardMargin = 4;
    let cardWidth = screenWidth - (cardMargin * 2);

    return (
        <Pressable onPress={() => { seletedSubArea(data); }}>
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
                <View style={{ flex: 1, padding: 15 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#F68F1E' }}>{data.subarea_name}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default SubAreaInfo;