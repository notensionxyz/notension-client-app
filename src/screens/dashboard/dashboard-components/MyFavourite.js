import React, { useState } from 'react';
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { logoColor_1, logoColor_2 } from '../../../helpers/Constants';
import { storageImageUrl } from '../../../helpers/imageUrl';
import FastImage from 'react-native-fast-image';
import NotificationSuccess from '../../../components/popup-notification/NotificationSuccess';
import { useNavigation } from '@react-navigation/native';

function MyFavourite({ title, data, height }) {
    const navigation = useNavigation();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [message, setMessage] = useState('Coming soon');
    const navigate = (id) => {
        if (id === '1') {
            navigation.navigate('FavouriteStore', { merchantType: 0 });
        } else if (id === '2') {
            navigation.navigate('FavouriteStore', { merchantType: 1 });
        } else if (id === '3') {
            navigation.navigate('FavouriteStore', { merchantType: 2 });
        } else if (id === '4') {
            navigation.navigate('FavouriteServiceProvider', { merchantType: 4 });
        } else if (id === '5') {
            navigation.navigate('FavouriteServiceProvider', { merchantType: 3 });
        } else {
            console.log(id);
            //setShowSuccessMessage(true);
        }
    }
    return (
        <>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
                backgroundColor: 'white',
            }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: logoColor_2 }}>{title}</Text>
            </View>
            <FlatList
                contentContainerStyle={{ padding: 5 }}
                horizontal
                data={data}
                renderItem={({ item }) => <ItemImage data={item} height={height} navigate={navigate} />}
                keyExtractor={item => item._id}
            />
            <NotificationSuccess visible={showSuccessMessage} setVisible={setShowSuccessMessage} message={message} />
        </>
    );
}

function ItemImage({ data, height, navigate }) {

    return (
        <Pressable onPress={() => { navigate(data.id) }}>
            <View style={{ height: height, width: (height * 1.5), padding: 5 }}>
                <FastImage
                    source={{ uri: storageImageUrl('app-dashboard', data.file_name) }}
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
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </View>
        </Pressable>
    );
}

export default MyFavourite;