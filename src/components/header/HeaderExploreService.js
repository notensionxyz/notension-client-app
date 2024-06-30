import React from 'react';
import { Image, TouchableOpacity, View, Text, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

export default function HeaderExploreService({ Title, centerType }) {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const navigateTo = () => {
        const options = {
            searchCenter: true,
            findNearestCenter: false,
            findCenterByDistrict: false,
            centerType: centerType,
            Title: `${centerType} Info`,
        };
        navigation.navigate('NearestCenterInfo', { options });
    }

    return (
        <View style={{ width: '100%', backgroundColor: 'white', flexDirection: 'row', borderBottomWidth: 0.8, borderBottomColor: '#006400' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}
                style={{ padding: 9, marginTop: 7, paddingLeft: 18 }}>
                <Image source={require('../../assets/icon/ic_arrow_back.png')}
                    style={{ height: 23, width: 23, resizeMode: 'contain', tintColor: '#006400' }} />
            </TouchableOpacity>
            <Pressable
                style={{
                    flex: 1,
                    height: 40,
                    paddingLeft: 2,
                    padding: 2,
                    fontSize: 19,
                    marginTop: 5,
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: '#006400',
                    color: '#2c2c2c',
                    marginHorizontal: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={() => navigateTo()}
            >
                <Text style={{ fontSize: 16, color: '#006400', fontWeight: "bold", textAlign: 'center' }}>{Title}</Text>
            </Pressable>
            <TouchableOpacity onPress={() => { navigation.toggleDrawer(); }}
                style={{ paddingLeft: 15, paddingRight: 20, padding: 10, marginTop: 7 }}>
                <Image source={require('../../assets/icon/ic_home.png')} style={{ height: 18, width: 18, tintColor: '#48d7ff', resizeMode: 'contain', tintColor: '#006400' }} />
            </TouchableOpacity>
        </View>
    );
}
