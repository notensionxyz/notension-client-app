import React, { useState } from 'react';
import { Alert, Dimensions, FlatList, Pressable, View } from "react-native";
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
    const registration_banner = useSelector((state) => state.dashboard.registration_banner);
    let newData = data.slice(0, data.length - 1);
    let ambulance = data[data.length];
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [message, setMessage] = useState('Coming soon');

    const navigateTo = (data) => {
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
                const options = {
                    centerType: 'Diagnostic Centre',
                    Title: 'Diagnostic Centre Info',
                };
                navigation.navigate('CenterInformation', { options });

            } else if (data?.id === "4") {
                //alert('Eye Care Centre Info');
                const options = {
                    centerType: 'Eye Care Centre',
                    Title: 'Eye Care Centre Info',
                };
                navigation.navigate('CenterInformation', { options });
            } else if (data?.id === "5") {
                //alert('Dental Care Centre Info');
                const options = {
                    centerType: 'Deltal Care Centre',
                    Title: 'Dental Care Centre Info',
                };
                navigation.navigate('CenterInformation', { options });
            } else if (data?.id === "6") {
                navigation.navigate('FindAmbulance');
            }
            else if (data?.id === "7") {
                navigation.navigate('ExploreMedicalService');
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
            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 5, backgroundColor: '#f1f5f7' }}>
                    <Pressable onPress={() => { navigateTo(data[0]) }}>
                        <View style={{ height: (screenWidth / 3) - 7, width: ((screenWidth / 3) * 2) - 8, padding: 5, borderRadius: 10 }}>
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
                                    source={{ uri: storageImageUrl('app-dashboard', data[0]?.file_name) }}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={{
                                        height: (screenWidth / 3) - 12,
                                        width: ((screenWidth / 3) * 2) - 20,
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
                    <Pressable onPress={() => { navigateTo(data[1]) }}>
                        <View style={{ height: (screenWidth / 3) - 7, width: (screenWidth / 3) - 2, padding: 5, borderRadius: 10 }}>
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
                                    source={{ uri: storageImageUrl('app-dashboard', data[1]?.file_name) }}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={{
                                        height: (screenWidth / 3) - 12,
                                        width: (screenWidth / 3) - 12,
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
                <FlatList
                    contentContainerStyle={{ paddingTop: 5, paddingBottom: 5 }}
                    showsHorizontalScrollIndicator={false}
                    numColumns={3}
                    data={data?.slice(2, 5)}
                    renderItem={({ item }) => <ItemData data={item} navigateTo={navigateTo} />}
                    keyExtractor={(item, index) => index.toString()}
                //keyExtractor={item => item._id}
                />
                <View style={{ flexDirection: 'row', marginBottom: 9, marginTop: 1, backgroundColor: '#f1f5f7' }}>
                    <Pressable onPress={() => { navigateTo(data[5]) }}>
                        <View style={{ height: (screenWidth / 3) - 8, width: (screenWidth / 3) - 2, padding: 5, borderRadius: 10 }}>
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
                                    source={{ uri: storageImageUrl('app-dashboard', data[5]?.file_name) }}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={{
                                        height: (screenWidth / 3) - 12,
                                        width: (screenWidth / 3) - 12,
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
                    <Pressable onPress={() => { navigateTo(data[6]) }}>
                        <View style={{ height: (screenWidth / 3) - 8, width: ((screenWidth / 3) * 2) - 8, padding: 5, borderRadius: 10 }}>
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
                                    source={{ uri: storageImageUrl('app-dashboard', data[6]?.file_name) }}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={{
                                        height: (screenWidth / 3) - 12,
                                        width: ((screenWidth / 3) * 2) - 20,
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
            </View>

            <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                <Pressable onPress={() => { navigation.navigate('ExploreAllService'); }}>
                    <View style={{ height: ((screenWidth / 8) * 3.06), width: screenWidth - 8, padding: 5, borderRadius: 10 }}>
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
                </Pressable>
            </View>
            <NotificationSuccess visible={showSuccessMessage} setVisible={setShowSuccessMessage} message={message} />
        </>
    );
}

function ItemData({ data, navigateTo }) {
    let cardMargin = 5;
    let cardWidth = (screenWidth / 3) - (cardMargin * 2.6);

    return (
        <Pressable onPress={() => { navigateTo(data); }}>
            <View style={{
                backgroundColor: 'white',
                width: cardWidth,
                margin: cardMargin,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                borderRadius: 8,
                elevation: 2,
            }}>
                <View style={{ height: screenWidth * 0.30, overflow: 'hidden', }}>
                    <FastImage style={{ height: '100%', width: '100%', borderRadius: 8, shadowRadius: 8, shadowOpacity: 0.2, }}
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

export default MedicalServices;