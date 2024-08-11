import React, { useState } from 'react';
import { Dimensions, StyleSheet, FlatList, Pressable, View } from "react-native";
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { storageImageUrl } from "../../../helpers/imageUrl";
import NotificationSuccess from '../../../components/popup-notification/NotificationSuccess';

const screenWidth = Dimensions.get('window').width;

export default function BusinessModules({ data }) {
    const navigation = useNavigation();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [message, setMessage] = useState('Coming soon');
    
    const navigateTo = (data) => {
        if (data?.id === "1") {
            navigation.navigate('NearestGroceryShop');
        } else if (data?.id === "2") {
            navigation.navigate('NearestMedicineShop');
        } else if (data?.id === "3") {
            navigation.navigate('ExploreFoodModule');
        }
    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', marginBottom: 7 }}>
                <FlatList
                    contentContainerStyle={{ paddingTop: 5, paddingBottom: 5 }}
                    showsHorizontalScrollIndicator={false}
                    numColumns={3}
                    data={data?.slice(0, 3)}
                    renderItem={({ item }) => <ItemData data={item} navigateTo={navigateTo} />}
                    keyExtractor={(item, index) => index.toString()}
                //keyExtractor={item => item._id}
                />
            </View >
            <NotificationSuccess visible={showSuccessMessage} setVisible={setShowSuccessMessage} message={message} />
        </>
    );
}

function ItemData({ data, navigateTo }) {
    let cardMargin = 5;
    let cardWidth = (screenWidth / 3) - (cardMargin * 2.5);

    return (
        <Pressable onPress={() => { navigateTo(data); }}>
            <View style={{
                backgroundColor: 'white',
                width: cardWidth,
                margin: cardMargin,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                borderRadius: 10,
                elevation: 2,
            }}>
                <View style={{ height: screenWidth * 0.40, overflow: 'hidden', }}>
                    <FastImage style={{ height: '100%', width: '100%', borderRadius: 6, }}
                        source={{
                            uri: storageImageUrl('app-dashboard', data?.file_name),
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    imageBanner: {
        height: screenWidth / 2,
        width: screenWidth - 1,
        borderRadius: 2,
        marginHorizontal: 1
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});