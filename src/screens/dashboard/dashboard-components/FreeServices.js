import React from 'react';
import { Dimensions, FlatList, View, Text } from "react-native";
import FastImage from 'react-native-fast-image';
//import {storageImageUrl} from "../../../assets";
const screenWidth = Dimensions.get('window').width;
const viewHeight = ((screenWidth / 6) * 2);
const viewWidth = (viewHeight * 2);
import { logoColor_1, logoColor_2 } from '../../../helpers/Constants';
import { storageImageUrl } from '../../../helpers/imageUrl';
import { useSelector } from 'react-redux';

function FreeServices() {
    const {
        free_services_banner,
        tutorial_banner,
        show_tutorial_banner,
        registration_banner,
    } = useSelector((state) => state.dashboard);
    return (
        <>
            <View style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
                backgroundColor: 'white',
            }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: logoColor_2 }}>You can watch free!!</Text>
            </View>
            <FlatList
                contentContainerStyle={{ padding: 5 }}
                horizontal
                data={free_services_banner}
                renderItem={({ item }) => <ItemImage data={item} />}
                keyExtractor={item => item.id}
            />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', marginTop: -5 }}>
                <View style={{ height: ((screenWidth / 3) * 2) - 3, width: screenWidth - 10, padding: 5, borderRadius: 10 }}>
                    <View style={{
                        justifyContent: 'space-between',
                        borderRadius: 10,
                        shadowRadius: 10,
                        elevation: 3,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        backgroundColor: 'white'
                    }}>
                        <FastImage
                            source={{ uri: storageImageUrl('app-dashboard', registration_banner) }}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                height: '100%',
                                width: '100%',
                                justifyContent: 'flex-end',
                                //padding: 10,
                                borderRadius: 10,
                                shadowRadius: 10,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3,
                                overflow: 'hidden'
                            }} />

                    </View>
                </View>
            </View>
        </>
    );
}

function ItemImage({ data }) {
    return (
        <View style={{ padding: 5 }}>
            <View style={{
                height: viewHeight - 1,
                width: viewWidth - 4,
                justifyContent: 'space-between',
                borderRadius: 8,
                shadowRadius: 8,
                elevation: 3,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                backgroundColor: 'white'
            }}>
                <FastImage
                    source={{ uri: storageImageUrl('app-dashboard', data.file_name) }}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                        height: '100%',
                        width: '100%',
                        justifyContent: 'flex-end',
                        padding: 10,
                        borderRadius: 8,
                        shadowRadius: 8,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        overflow: 'hidden'
                    }} />

            </View>
        </View>
    );
}

export default FreeServices;