import React from 'react';
import { Dimensions, StyleSheet, Text, Pressable, View, Image } from "react-native";
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { storageImageUrl } from '../../../../helpers/imageUrl';
import { health_careImages, logoColor_1, logoColor_2 } from '../../../../helpers/Constants';


const screenWidth = Dimensions.get('window').width;

export const MemoizedVerticalListView = React.memo(VerticalListView);

function VerticalListView({ data, showDept, showCenter }) {
    const navigation = useNavigation();
    let cardMargin = 4;
    let cardWidth = screenWidth - (cardMargin * 3);

    let demo_doctor_pic = require('../../../../assets/gallery/services/male.jpg');
    if (data?.doctorInfo?.gender === "Female") {
        demo_doctor_pic = require('../../../../assets/gallery/services/female.jpg');
    }

    return (
        <React.Fragment key={data?._id}>
            <Pressable onPress={() => { navigation.navigate('ProfileOfDoctor', { data }) }}>
                <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{
                        //height: (screenWidth * 0.50),
                        width: cardWidth,
                        margin: cardMargin,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        shadowRadius: 10,
                        elevation: 2,
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        justifyContent: 'center',
                        paddingBottom: 7
                    }}>
                        <View style={{ flexDirection: 'row', marginTop: 2, padding: 6 }}>
                            <FastImage source={data?.doctorInfo?.profile_pic && data?.doctorInfo?.profile_pic !== '' && data?.doctorInfo?.profile_pic !== null ? {
                                uri: storageImageUrl(health_careImages, data?.doctorInfo?.profile_pic)
                            } : demo_doctor_pic}
                                style={{ height: (screenWidth * 0.28), width: (screenWidth * 0.21), resizeMode: 'cover', borderRadius: 6, }}
                                resizeMode={FastImage.resizeMode.contain}
                            />

                            <View style={{ paddingLeft: 15, flex: 1 }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#ad3257' }}>{data?.doctorInfo?.doctor_name}</Text>
                                <Text style={{ fontSize: 15, marginTop: 4, color: '#616161' }} numberOfLines={4} ellipsizeMode="tail">{data?.doctorInfo?.qualifications}</Text>
                            </View>
                        </View>
                        {showDept &&
                            <View style={{
                                marginTop: 2,
                                marginBottom: 3,
                                //width: screenWidth * 0.75,
                                paddingLeft: 5,
                                backgroundColor: '#ccb7f7',
                                //alignItems: 'center',
                                //justifyContent: 'center'
                            }}>
                                <Text style={{ fontSize: 16, color: 'white', padding: 5, paddingLeft: 10, fontWeight: 'bold' }} numberOfLines={1} ellipsizeMode="tail">{data?.doctorInfo?.speciality}</Text>
                            </View>
                        }
                        {showCenter &&
                            <Text adjustsFontSizeToFit style={{ fontSize: 16, marginTop: 2, paddingLeft: 15, color: '#5a9e67', fontWeight: 'bold', lineHeight: 22 }} numberOfLines={1} ellipsizeMode="tail">{data?.consultationcenter?.center_name}</Text>
                        }
                    </View>
                </View>
            </Pressable>
        </React.Fragment >
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


export default VerticalListView;