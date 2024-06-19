import React from 'react';
import { Dimensions, StyleSheet, Text, Pressable, View, Image } from "react-native";
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { storageImageUrl } from '../../../../helpers/imageUrl';
import { logoColor_1 } from '../../../../helpers/Constants';


const screenWidth = Dimensions.get('window').width;

export const MemoizedHorizontalListView = React.memo(HorizontalListView);

function HorizontalListView({ data }) {
    let demo_doctor_pic = require('../../../../assets/gallery/services/image.jpg');
    if (data?.doctorprofile?.gender === "Female") {
        demo_doctor_pic = require('../../../../assets/gallery/services/female.jpg');
    }
    return (
        <View style={{ width: screenWidth * 0.85 }}>
            <View style={{
                //height: (screenWidth * 0.50),
                marginHorizontal: 5,
                // marginTop: 5,
                padding: 6,
                backgroundColor: 'white',
                borderRadius: 10,
                shadowRadius: 10,
                elevation: 1,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                paddingBottom: 10,
            }}>
                <View style={{ flexDirection: 'row', marginTop: 2 }}>
                    <Image source={demo_doctor_pic}
                        style={{ height: (screenWidth * 0.28), width: (screenWidth * 0.21), resizeMode: 'cover', borderRadius: 6, }} />
                    <View style={{ paddingLeft: 15, flex: 1 }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#ad3257' }}>{data?.doctorprofile?.doctor_name}</Text>
                        <Text style={{ fontSize: 14, marginTop: 3, color: '#616161' }} numberOfLines={3} ellipsizeMode="tail">{data?.doctorprofile?.qualifications}</Text>
                    </View>
                </View>
                <View style={{
                    marginTop: 5,
                    //width: screenWidth * 0.75,
                    paddingLeft: 5,
                    backgroundColor: logoColor_1,
                    //alignItems: 'center',
                    //justifyContent: 'center'
                }}>
                    <Text style={{ fontSize: 16, color: 'white', padding: 5, fontWeight: 'bold' }} numberOfLines={1} ellipsizeMode="tail">{data?.doctorprofile?.speciality}</Text>
                </View>
                <Text adjustsFontSizeToFit style={{ fontSize: 16, marginTop: 5, paddingLeft: 5, color: '#616161', fontWeight: 'bold', lineHeight: 22 }} numberOfLines={1} ellipsizeMode="tail">{data?.consultationcenter?.center_name}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        // marginBottom: 5,
    },
    highlight: {
        fontWeight: 'bold',
    },
    tag: {
        backgroundColor: '#8bda60',
        color: 'white',
        fontWeight: 'bold',
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 5,
        position: 'absolute',
        right: 0,
        overflow: 'hidden',
    },
});


export default HorizontalListView;