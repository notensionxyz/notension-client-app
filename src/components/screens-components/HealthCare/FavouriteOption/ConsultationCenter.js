import React from 'react';
import { Dimensions, StyleSheet, Text, Pressable, View, Image } from "react-native";
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { storageImageUrl } from '../../../../helpers/imageUrl';
import { health_careImages } from '../../../../helpers/Constants';

const screenWidth = Dimensions.get('window').width;

export const MemoizedConsultationCenter = React.memo(ConsultationCenter);

function ConsultationCenter({ info, removeInformation }) {
    const navigation = useNavigation();
    let cardMargin = 2;
    let cardWidth = screenWidth - (cardMargin * 3);

    const data = {
        _id: info?.mongodbId,
        center_name: info?.center_name,
        address: info?.address,
        medical_center_banner_app: info?.medical_center_banner_app
    };

    return (
        <React.Fragment key={data?._id}>

            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{
                    //height: screenWidth * 0.60,
                    width: cardWidth,
                    margin: cardMargin,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    shadowRadius: 3,
                    elevation: 1,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    backgroundColor: 'white',
                    padding: 8
                }}>
                    <Pressable onPress={() => { navigation.navigate('ExploreConsultationCenter', { data }); }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                height: screenWidth * 0.40,
                                width: screenWidth * 0.27,
                                overflow: 'hidden',
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <FastImage
                                    style={{ height: '180%', width: '380%', borderRadius: 10, }}
                                    source={{
                                        uri: storageImageUrl(health_careImages, data?.medical_center_banner_app),
                                        priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            </View>
                            <View style={{ paddingLeft: 15, flex: 1 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ad3257' }} numberOfLines={2} ellipsizeMode="tail">{data?.center_name}</Text>
                                <Text style={{ fontSize: 15, marginTop: 4, color: '#616161', lineHeight: 22 }} numberOfLines={4} ellipsizeMode="tail">{data?.address}</Text>
                            </View>
                        </View>
                    </Pressable>
                    <View
                        style={{
                            position: 'absolute',
                            right: screenWidth / 30,
                            top: screenWidth / 3.2,
                        }}>
                        <Pressable onPress={() => { removeInformation(info); }}>
                            <Image source={require('../../../../assets/icon/remove.png')}
                                style={{ width: 100, height: 50, resizeMode: 'contain' }} />
                        </Pressable>
                    </View>
                </View>
            </View>

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


export default ConsultationCenter;