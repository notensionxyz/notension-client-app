import React from 'react';
import { Dimensions, FlatList, Text, Pressable, View } from "react-native";
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';
import { storageImageUrl } from '../../../../helpers/imageUrl';
import { medicine_sliderTypeSubtypeImagesFolderName } from '../../../../helpers/Constants';

const screenWidth = Dimensions.get('window').width;
let customPadding = 4;
function FlatListTwoColumns({ listInfo, TopPadding, navigateTo }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', marginBottom: -5 }}>
            <FlatList
                contentContainerStyle={{ padding: 3 }}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                data={listInfo}
                renderItem={({ item }) => <ItemData data={item} TopPadding={TopPadding} navigateTo={navigateTo} />}
                keyExtractor={item => item._id}
            />
        </View>
    );
}

function ItemData({ data, TopPadding, navigateTo }) {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => { navigateTo(data) }}>
            <View style={{ height: (screenWidth / 3) - 4, width: (screenWidth / 2) - 4, paddingTop: TopPadding, paddingBottom: 4, paddingLeft: 4, paddingRight: 4 }}>
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
                            uri: storageImageUrl(medicine_sliderTypeSubtypeImagesFolderName, data?.subtypeInfo?.banner_type_2),
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

export default FlatListTwoColumns;