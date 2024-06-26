import React, { useState } from 'react';
import { Dimensions, FlatList, Pressable, View } from "react-native";
import FastImage from 'react-native-fast-image';
import { storageImageUrl } from '../../../helpers/imageUrl';
import NotificationSuccess from '../../../components/popup-notification/NotificationSuccess';
import { useNavigation } from '@react-navigation/native';
import { handleDashboardReducer } from '../../../store/reducers/dashboardReducer';
import { useDispatch, useSelector } from 'react-redux';

const screenWidth = Dimensions.get('window').width;
const viewHeight = (screenWidth / 2);
const viewWidth = ((viewHeight / 2) * 3);

function MedicalServices({ data }) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isLoggedin = useSelector((state) => state.user.isLoggedin);
    let newData = data.slice(0, data.length - 1);
    let ambulance = data[data.length - 1];
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [message, setMessage] = useState('Coming soon');

    const navigate = (data) => {
        if (isLoggedin) {
            if (data?.id === "1") {
                navigation.navigate('ExploreFindDoctors');
            } else if (data?.id === "2") {
                const options = {
                    centerType: 'Hospital',
                    Title: 'Hospital Info',
                };
                navigation.navigate('CenterInformation', { options });
            } else if (data?.id === "3") {
                navigation.navigate('ExploreMedicalService');
            } else if (data?.id === "4") {
                const options = {
                    centerType: 'Diagnostic Centre',
                    Title: 'Diagnostic Centre Info',
                };
                navigation.navigate('CenterInformation', { options });
                //setShowSuccessMessage(true);
            } else if (data?.id === "5") {
                //console.log(data?.id);
                setShowSuccessMessage(true);
            } else if (data?.id === "6") {
                setShowSuccessMessage(true);
            }
        } else {
            dispatch(
                handleDashboardReducer({
                    type: 'SET_CURRENT_MODULE',
                    data: 'dashboard',
                })
            );
            navigation.navigate('Login')
        }
    }

    return (
        <>
            {/* <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
                backgroundColor: 'white',
            }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#616161' }}>{title}</Text>
            </View> */}
            {/* <AutoSlider data={MedicalServicesData} /> */}

            <FlatList
                contentContainerStyle={{ padding: 5 }}
                horizontal
                data={newData}
                renderItem={({ item }) => <ItemImage data={item} navigate={navigate} />}
                keyExtractor={item => item.id}
            />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', marginTop: -5 }}>
                <Pressable onPress={() => { navigation.navigate('FindAmbulance') }}>
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
                                source={{ uri: storageImageUrl('app-dashboard', ambulance?.file_name) }}
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
                </Pressable>
            </View>
            <NotificationSuccess visible={showSuccessMessage} setVisible={setShowSuccessMessage} message={message} />
        </>
    );
}

function ItemImage({ data, navigate }) {
    return (
        <Pressable onPress={() => { navigate(data) }}>
            <View style={{ padding: 5 }}>
                <View style={{
                    height: viewHeight,
                    width: viewWidth,
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
        </Pressable>
    );
}

export default MedicalServices;