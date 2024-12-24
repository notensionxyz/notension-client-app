import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View, FlatList } from "react-native";
import FlatListThreeColumns from './FlatListThreeColumns';
import FlatListTwoColumns from './FlatListTwoColumns';
import FastImage from 'react-native-fast-image';
import { logoColor_2, service_bannerImages } from '../../../../helpers/Constants';
import { useNavigation } from '@react-navigation/native';
import { storageImageUrl } from '../../../../helpers/imageUrl';

let remainder = 0;

const screenWidth = Dimensions.get('window').width;

const viewWidth = ((screenWidth / 8) * 6);
const viewHeight = ((screenWidth / 8) * 4) - 2;
function ManageListView({ allServicesInfo, careSlider, findServiceProvider }) {
    const navigation = useNavigation();
    const [services1To4, setServices1To4] = useState(allServicesInfo?.slice(0, 4) || []);
    const [services5To16, setServices5To16] = useState(allServicesInfo?.slice(4, 16) || []);
    const [services17To20, setServices17To20] = useState(allServicesInfo?.slice(16, 20) || []);
    const [services21To24, setServices21To24] = useState(allServicesInfo?.slice(20, 24) || []);
    const [services25To33, setServices25To33] = useState(allServicesInfo?.slice(24, 33) || []);
    const [services34To39, setServices34To45] = useState(allServicesInfo?.slice(33, 39) || []);
    const [services40To45, setServices40To45] = useState(allServicesInfo?.slice(39, 45) || []);
    
    ///console.log('careSlider : ', careSlider[0]?.fifth_slider);

    return (
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
            <FlatList
                contentContainerStyle={{ padding: 5 }}
                horizontal
                data={careSlider[0]?.first_slider}
                renderItem={({ item }) => <ItemImage data={item} />}
                keyExtractor={item => item.id}
            />
            <View style={{ flex: 1, screenWidth: screenWidth, backgroundColor: '#f7d2cb', paddingBottom: 10, marginBottom: 2, alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#f7d2cb' }}>
                    <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 16, fontWeight: 'bold', width: '100%',textAlign:"center" }}>
                        {'Your Trusted Partner for Every Service!'}</Text>
                </View>
                <FlatListTwoColumns listInfo={services1To4} navigateTo={findServiceProvider} TopPadding={0} />
            </View>

            <FlatList
                contentContainerStyle={{ padding: 5 }}
                horizontal
                data={careSlider[0]?.second_slider}
                renderItem={({ item }) => <ItemImage data={item} />}
                keyExtractor={item => item.id}
            />
            <View style={{ flex: 1, screenWidth: screenWidth, backgroundColor: '#f5e1bc', paddingBottom: 10, marginBottom: 2, alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#f5e1bc' }}>
                    <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 16, fontWeight: 'bold', textAlign:"center" , width: '100%' }}>
                        {'One Platform, Endless Solutions!'}</Text>
                </View>
                <FlatListThreeColumns listInfo={services5To16} navigateTo={findServiceProvider}/>
            </View>

            <FlatList
                contentContainerStyle={{ padding: 5 }}
                horizontal
                data={careSlider[0]?.third_slider}
                renderItem={({ item }) => <ItemImage data={item} />}
                keyExtractor={item => item.id}
            />
            <View style={{ flex: 1, screenWidth: screenWidth, backgroundColor: '#f7d2cb', paddingBottom: 10, marginBottom: 2, alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#f7d2cb' }}>
                    <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 16, fontWeight: 'bold', textAlign:"center", width: '100%' }}>
                        {'Learn, Grow, Succeed with Us!'}</Text>
                </View>
                <FlatListTwoColumns listInfo={services17To20} navigateTo={findServiceProvider} TopPadding={0} />
            </View>

            <FlatList
                contentContainerStyle={{ padding: 5 }}
                horizontal
                data={careSlider[0]?.fourth_slider}
                renderItem={({ item }) => <ItemImage data={item} />}
                keyExtractor={item => item.id}
            />
            <View style={{ flex: 1, screenWidth: screenWidth, backgroundColor: '#f7d2cb', paddingBottom: 10, marginBottom: 2, alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#f7d2cb' }}>
                    <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 16, fontWeight: 'bold', textAlign:"center", width: '100%' }}>
                        {'Building Skills, Shaping Futures'}</Text>
                </View>
                <FlatListTwoColumns listInfo={services21To24} navigateTo={findServiceProvider} TopPadding={0} />
            </View>

            <FlatList
                contentContainerStyle={{ padding: 5 }}
                horizontal
                data={careSlider[0]?.fifth_slider}
                renderItem={({ item }) => <ItemImage data={item} />}
                keyExtractor={item => item.id}
            />
            <View style={{ flex: 1, screenWidth: screenWidth, backgroundColor: '#f5e1bc', paddingBottom: 10, marginBottom: 2, alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#f5e1bc' }}>
                    <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 16, fontWeight: 'bold', textAlign:"center", width: '100%' }}>
                        {'All-in-One Service at Your Fingertips!'}</Text>
                </View>
                <FlatListThreeColumns listInfo={services25To33} navigateTo={findServiceProvider}/>
            </View>

            <FlatList
                contentContainerStyle={{ padding: 5 }}
                horizontal
                data={careSlider[0]?.sixth_slider}
                renderItem={({ item }) => <ItemImage data={item} />}
                keyExtractor={item => item.id}
            />
            <View style={{ flex: 1, screenWidth: screenWidth, backgroundColor: '#f7d2cb', paddingBottom: 10, marginBottom: 2, alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#f7d2cb' }}>
                    <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 16, fontWeight: 'bold', textAlign:"center", width: '100%' }}>
                        {'Expert Help, Anytime!'}</Text>
                </View>
                <FlatListTwoColumns listInfo={services34To39} navigateTo={findServiceProvider} TopPadding={0} />
            </View>

            <FlatList
                contentContainerStyle={{ padding: 5 }}
                horizontal
                data={careSlider[0]?.seventh_slider}
                renderItem={({ item }) => <ItemImage data={item} />}
                keyExtractor={item => item.id}
            />
            <View style={{ flex: 1, screenWidth: screenWidth, backgroundColor: '#f7d2cb', paddingBottom: 10, marginBottom: 2, alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#f7d2cb' }}>
                    <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 16, fontWeight: 'bold', textAlign:"center" , width: '100%' }}>
                        {'Connecting You to Expert Services!'}</Text>
                </View>
                <FlatListTwoColumns listInfo={services40To45} navigateTo={findServiceProvider} TopPadding={0} />
            </View>
        </View>
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
                    source={{ uri: storageImageUrl(service_bannerImages, data.file_name) }}
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

export default ManageListView;