import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View, FlatList } from "react-native";
import FlatListThreeColumns from './FlatListThreeColumns';
import FlatListTwoColumns from './FlatListTwoColumns';
import FlatListSingleColumns from './FlatListSingleColumns';
import { logoColor_2 } from '../../../../helpers/Constants';
import { useNavigation } from '@react-navigation/native';
import { MemoizedHorizontalListView } from '../DoctorsInfo/HorizontalListView';
let remainder = 0;

const screenWidth = Dimensions.get('window').width;

function ManageListView({ allDeptInfo, popularDoctors, findDoctors }) {
    const navigation = useNavigation();
    const [firstFive, setFirstFive] = useState(popularDoctors?.slice(0, 5) || []);
    const [doctors6To10, setDoctors6To10] = useState(popularDoctors?.slice(5, 10) || []);
    const [doctors11To15, setDoctors11To15] = useState(popularDoctors?.slice(10, 15) || []);
    const [doctors16To20, setDoctors16To20] = useState(popularDoctors?.slice(15, 20) || []);
    const [doctors21To25, setDoctors21To25] = useState(popularDoctors?.slice(20, 25) || []);

    const [firstTwelve, setFirstTwelve] = useState(allDeptInfo?.slice(0, 12) || []);
    const [elements13To16, setElements13To16] = useState(allDeptInfo?.slice(12, 16) || []);
    const [elements17To20, setElements17To20] = useState(allDeptInfo?.slice(16, 20) || []);
    const [elements21To29, setElements21To29] = useState(allDeptInfo?.slice(20, 29) || []);
    const [lastInfo, setLastInfo] = useState(allDeptInfo?.slice(-4) || []);

    useEffect(() => {
        setFirstFive(popularDoctors?.slice(0, 5) || []);
        setDoctors6To10(popularDoctors?.slice(5, 10) || []);
        setDoctors11To15(popularDoctors?.slice(10, 15) || []);
        setDoctors16To20(popularDoctors?.slice(15, 20) || []);
        setDoctors21To25(popularDoctors?.slice(20, 25) || []);

        setFirstTwelve(allDeptInfo?.slice(0, 12) || []);
        setElements13To16(allDeptInfo?.slice(12, 16) || []);
        setElements17To20(allDeptInfo?.slice(16, 20) || []);
        setElements21To29(allDeptInfo?.slice(20, 29) || []);
        setLastInfo(allDeptInfo?.slice(-4) || []);

    }, [allDeptInfo]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
            {firstFive.length > 0 &&
                <View style={{ flex: 1, backgroundColor: '#daf5e1', paddingBottom: 10, marginTop: 10, marginBottom: 15 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#daf5e1' }}>
                        <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                            {'জনপ্রিয় বিশেষজ্ঞ'}</Text>
                    </View>
                    <FlatList
                        contentContainerStyle={{ paddingTop: 5, paddingBottom: 5 }}
                        horizontal
                        data={firstFive}
                        renderItem={({ item }) => <MemoizedHorizontalListView data={item} backgroundColor={'#daf5e1'} />}
                        keyExtractor={item => item._id}
                    />
                </View>
            }


            <View style={{ flex: 1, screenWidth: screenWidth, backgroundColor: '#f5e1bc', paddingBottom: 10, marginBottom: 15, alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#f5e1bc' }}>
                    <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                        {'বিভাগ অনুযায়ী ডাক্তার খুঁজুন'}</Text>
                </View>
                <FlatListThreeColumns listInfo={firstTwelve} navigateTo={findDoctors} />
            </View>

            {doctors6To10.length > 0 &&
                <View style={{ flex: 1, backgroundColor: '#f5dfeb', paddingBottom: 10, alignItems: 'center', marginBottom: 15 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#f5dfeb' }}>
                        <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                            {'জনপ্রিয় বিশেষজ্ঞ'}</Text>
                    </View>
                    <FlatList
                        contentContainerStyle={{ paddingTop: 5, paddingBottom: 5 }}
                        horizontal
                        data={doctors6To10}
                        renderItem={({ item }) => <MemoizedHorizontalListView data={item} backgroundColor={'#f5dfeb'} />}
                        keyExtractor={item => item._id}
                    />
                </View>
            }

            <View style={{ flex: 1, screenWidth: screenWidth, backgroundColor: '#f7d2cb', paddingBottom: 10, marginBottom: 15, alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#f7d2cb' }}>
                    <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                        {'বিভাগ অনুযায়ী ডাক্তার খুঁজুন'}</Text>
                </View>
                <FlatListTwoColumns listInfo={elements13To16} TopPadding={0} navigateTo={findDoctors} />
            </View>

            {doctors11To15.length > 0 &&
                <View style={{ flex: 1, backgroundColor: '#e5dff5', paddingBottom: 10, marginBottom: 15, }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#e5dff5' }}>
                        <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                            {'জনপ্রিয় বিশেষজ্ঞ'}</Text>
                    </View>
                    <FlatList
                        contentContainerStyle={{ paddingTop: 5, paddingBottom: 5 }}
                        horizontal
                        data={doctors11To15}
                        renderItem={({ item }) => <MemoizedHorizontalListView data={item} backgroundColor={'#e5dff5'} />}
                        keyExtractor={item => item._id}
                    />
                </View>
            }

            <View style={{ flex: 1, screenWidth: screenWidth, backgroundColor: '#f7dff4', paddingBottom: 10, marginBottom: 15, alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#f7dff4' }}>
                    <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                        {'বিভাগ অনুযায়ী ডাক্তার খুঁজুন'}</Text>
                </View>
                <FlatListTwoColumns listInfo={elements17To20} TopPadding={0} navigateTo={findDoctors} />
            </View>

            {doctors16To20.length > 0 &&
                <View style={{ flex: 1, backgroundColor: '#daf5e1', paddingBottom: 10, marginBottom: 15, }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#daf5e1' }}>
                        <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                            {'জনপ্রিয় বিশেষজ্ঞ'}</Text>
                    </View>
                    <FlatList
                        contentContainerStyle={{ paddingTop: 5, paddingBottom: 5 }}
                        horizontal
                        data={doctors16To20}
                        renderItem={({ item }) => <MemoizedHorizontalListView data={item} backgroundColor={'#daf5e1'} />}
                        keyExtractor={item => item._id}
                    />
                </View>
            }

            <View style={{ flex: 1, screenWidth: screenWidth, backgroundColor: '#d7e9f7', paddingBottom: 10, marginBottom: 15, alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#d7e9f7' }}>
                    <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                        {'বিভাগ অনুযায়ী ডাক্তার খুঁজুন'}</Text>
                </View>
                <FlatListThreeColumns listInfo={elements21To29} navigateTo={findDoctors} />
            </View>

            {doctors21To25.length > 0 &&
                <View style={{ flex: 1, backgroundColor: '#f7d2cb', paddingBottom: 10, marginBottom: 15, }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#f7d2cb' }}>
                        <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                            {'জনপ্রিয় বিশেষজ্ঞ'}</Text>
                    </View>
                    <FlatList
                        contentContainerStyle={{ paddingTop: 5, paddingBottom: 5 }}
                        horizontal
                        data={doctors21To25}
                        renderItem={({ item }) => <MemoizedHorizontalListView data={item} backgroundColor={'#f7d2cb'} />}
                        keyExtractor={item => item._id}
                    />
                </View>
            }

            <View style={{ flex: 1, screenWidth: screenWidth, backgroundColor: '#d7f7f4', paddingBottom: 10, marginBottom: 15, alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#d7f7f4' }}>
                    <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                        {'বিভাগ অনুযায়ী ডাক্তার খুঁজুন'}</Text>
                </View>
                <FlatListTwoColumns listInfo={lastInfo} TopPadding={0} navigateTo={findDoctors} />
            </View>

        </View>
    );
}

export default ManageListView;