import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View, FlatList } from "react-native";
import FlatListThreeColumns from './FlatListThreeColumns';
import FlatListTwoColumns from './FlatListTwoColumns';
import { logoColor_2 } from '../../../../helpers/Constants';
import { useNavigation } from '@react-navigation/native';
import { MemoizedHorizontalListView } from '../DoctorsInfo/HorizontalListView';
let remainder = 0;

const screenWidth = Dimensions.get('window').width;

function ManageListView({ allDeptInfo, popularDoctors, findDoctors }) {
    const navigation = useNavigation();
    const [firstFive, setFirstFive] = useState([]);
    const [doctors6To10, setDoctors6To10] = useState([]);
    const [doctors11To15, setDoctors11To15] = useState([]);
    const [doctors16To20, setDoctors16To20] = useState([]);

    const [firstSlot, setFirstSlot] = useState([]);
    const [secondSlot, setSecondSlot] = useState([]);
    const [thirdSlot, setThirdSlot] = useState([]);
    const [lastInfo, setLastInfo] = useState([]);

    useEffect(() => {
        //console.log('allDeptInfo?.length : ', allDeptInfo?.length);
        if (allDeptInfo?.length <= 12) {
            setFirstSlot(allDeptInfo);
            setFirstFive(popularDoctors?.slice(0, 5) || []);
        }
        else if (allDeptInfo?.length >= 13 && allDeptInfo?.length <= 19) {

            setFirstSlot(allDeptInfo?.slice(0, 9) || []);

            setSecondSlot(allDeptInfo?.slice(9, allDeptInfo?.length) || []);

            setFirstFive(popularDoctors?.slice(0, 5) || []);
            setDoctors6To10(popularDoctors?.slice(5, 10) || [])
        }
        else if (allDeptInfo?.length >= 20 && allDeptInfo?.length <= 24) {

            setFirstSlot(allDeptInfo?.slice(0, 12) || []);

            setSecondSlot(allDeptInfo?.slice(12, allDeptInfo?.length) || []);

            setFirstFive(popularDoctors?.slice(0, 5) || []);
            setDoctors6To10(popularDoctors?.slice(5, 10) || [])
        }
        else if (allDeptInfo?.length >= 25 && allDeptInfo?.length <= 28) {

            setFirstSlot(allDeptInfo?.slice(0, 9) || []);

            setSecondSlot(allDeptInfo?.slice(9, 18) || []);

            setThirdSlot(allDeptInfo?.slice(18, allDeptInfo?.length) || []);

            setFirstFive(popularDoctors?.slice(0, 5) || []);
            setDoctors6To10(popularDoctors?.slice(5, 10) || [])
            setDoctors11To15(popularDoctors?.slice(10, 15) || []);

        }
        else if (allDeptInfo?.length > 28) {
            setFirstSlot(allDeptInfo?.slice(0, 9) || []);

            setSecondSlot(allDeptInfo?.slice(9, 15) || []);

            setThirdSlot(allDeptInfo?.slice(15, 24) || []);

            setLastInfo(allDeptInfo?.slice(24, allDeptInfo?.length) || []);

            setFirstFive(popularDoctors?.slice(0, 5) || []);
            setDoctors6To10(popularDoctors?.slice(5, 10) || [])
            setDoctors11To15(popularDoctors?.slice(10, 15) || []);
            setDoctors16To20(popularDoctors?.slice(15, 20) || []);
        }

    }, [allDeptInfo]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>

            <View style={{ flex: 1, backgroundColor: '#daf5e1', paddingBottom: 10, marginTop: 10, marginBottom: 15 }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#daf5e1' }}>
                    <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                        {'জনপ্রিয় বিশেষজ্ঞ'}</Text>
                </View>
                <FlatList
                    contentContainerStyle={{ paddingTop: 5, paddingBottom: 5 }}
                    horizontal
                    data={firstFive}
                    renderItem={({ item }) => <MemoizedHorizontalListView data={item} backgroundColor={'#daf5e1'} showCenter={false} />}
                    keyExtractor={item => item._id}
                />
            </View>

            <View style={{ flex: 1, screenWidth: screenWidth, backgroundColor: '#f5e1bc', paddingBottom: 10, marginBottom: 15, alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#f5e1bc' }}>
                    <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                        {'বিভাগ অনুযায়ী ডাক্তার খুঁজুন'}</Text>
                </View>
                {firstSlot.length === 9 || firstSlot.length === 11 || firstSlot.length === 12 ?
                    <FlatListThreeColumns listInfo={firstSlot} navigateTo={findDoctors} />
                    :
                    <FlatListTwoColumns listInfo={firstSlot} TopPadding={0} navigateTo={findDoctors} />
                }
            </View>

            {secondSlot.length > 0 &&
                <>
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

                    <View style={{ flex: 1, screenWidth: screenWidth, backgroundColor: '#f7d2cb', paddingBottom: 10, marginBottom: 15, alignItems: 'center', }}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#f7d2cb' }}>
                            <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                                {'বিভাগ অনুযায়ী ডাক্তার খুঁজুন'}</Text>
                        </View>
                        {secondSlot.length === 9 || secondSlot.length === 11 || secondSlot.length === 12 ?
                            <FlatListThreeColumns listInfo={secondSlot} navigateTo={findDoctors} />
                            :
                            <FlatListTwoColumns listInfo={secondSlot} TopPadding={0} navigateTo={findDoctors} />
                        }
                    </View>
                </>
            }

            {thirdSlot.length > 0 &&
                <>
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

                    <View style={{ flex: 1, screenWidth: screenWidth, backgroundColor: '#f7dff4', paddingBottom: 10, marginBottom: 15, alignItems: 'center', }}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#f7dff4' }}>
                            <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                                {'বিভাগ অনুযায়ী ডাক্তার খুঁজুন'}</Text>
                        </View>
                        {thirdSlot.length === 9 || thirdSlot.length === 11 || thirdSlot.length === 12 ?
                            <FlatListThreeColumns listInfo={thirdSlot} navigateTo={findDoctors} />
                            :
                            <FlatListTwoColumns listInfo={thirdSlot} TopPadding={0} navigateTo={findDoctors} />
                        }
                    </View>
                </>
            }

            {lastInfo.length > 0 &&
                <>
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

                    <View style={{ flex: 1, screenWidth: screenWidth, backgroundColor: '#d7e9f7', paddingBottom: 10, marginBottom: 15, alignItems: 'center', }}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#d7e9f7' }}>
                            <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                                {'বিভাগ অনুযায়ী ডাক্তার খুঁজুন'}</Text>
                        </View>
                        {lastInfo.length === 9 || lastInfo.length === 11 || lastInfo.length === 12 ?
                            <FlatListThreeColumns listInfo={lastInfo} navigateTo={findDoctors} />
                            :
                            <FlatListTwoColumns listInfo={lastInfo} TopPadding={0} navigateTo={findDoctors} />
                        }
                    </View>

                </>
            }

        </View>
    );
}

export default ManageListView;