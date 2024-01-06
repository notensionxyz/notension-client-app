import React from 'react';
import { Dimensions, FlatList, Text, Pressable, View } from "react-native";
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';
import { medicine_sliderTypeSubtypeImagesFolderName } from '../../../../helpers/Constants';
import { storageImageUrl } from '../../../../helpers/imageUrl';

const screenWidth = Dimensions.get('window').width;

function FlatListThreeColumns({ listInfo, navigateTo }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', marginBottom: -5 }}>
            <FlatList
                contentContainerStyle={{ padding: 3 }}
                showsHorizontalScrollIndicator={false}
                numColumns={3}
                data={listInfo}
                renderItem={({ item }) => <ItemData data={item} navigateTo={navigateTo} />}
                keyExtractor={item => item._id}
            />
        </View>
    );
}

function ItemData({ data, navigateTo }) {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => { navigateTo(data) }}>
            <View style={{ height: (screenWidth / 3) - 3, width: (screenWidth / 3) - 3, padding: 3 }}>
                <View style={{
                    justifyContent: 'space-between',
                    borderRadius: 6,
                    shadowRadius: 6,
                    elevation: 3,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    backgroundColor: 'white'
                }}>
                    <FastImage
                        source={{
                            uri: storageImageUrl(medicine_sliderTypeSubtypeImagesFolderName, data?.subtypeInfo?.banner_type_1),
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            height: '100%', width: '100%',
                            justifyContent: 'flex-end',
                            padding: 10,
                            borderRadius: 6,
                            shadowRadius: 6,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            overflow: 'hidden'
                        }} />
                </View>
            </View>
        </Pressable>
    );
}

export default FlatListThreeColumns;