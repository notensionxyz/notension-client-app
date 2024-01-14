import React, { useState, useEffect } from 'react';
import { Dimensions, FlatList, Text, View, Image, BackHandler, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
//import PlaceOrderFooter from "../appcomponents/footer/PlaceOrderFooter";
import HeaderCommon from '../../components/header/HeaderCommon';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import OrderedProductList from '../../components/screens-components/MedicineShop/products/OrderedProductList';
import { storageImageUrl } from '../../helpers/imageUrl';
import OrderedItemList from '../../components/screens-components/GroceryShop/products/OrderedItemList';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

let folderName = '';

export default function OrderDetails({ route }) {
    const data = route.params.data;
    const currentModule = route.params.currentModule
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [orderedImages, setOrderedImages] = useState([]);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = new Date(data?.createdAt).toLocaleDateString('en-GB', options);

    useEffect(() => {
        let images = [];
        if (currentModule === 'Medicine') {
            folderName = 'medicine-order-images';
        } else {
            folderName = 'grocery-order-images';
        }

        data?.order_list_image?.forEach((image, i) => {
            images.push({
                url: storageImageUrl(folderName, image),
                width: screenWidth - 10,
                height: ((screenWidth / 2) * 3) - 20,
            });
        });
        setOrderedImages(images);

        const backAction = () => {
            navigation.goBack();
            // setVisible(false);
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <HeaderCommon title="Ordered Items" toggleDrawer={null} />

            <Modal style={{ margin: 0, backgroundColor: '#000000' }}
                isVisible={visible}
                transparent={true}
                deviceWidth={screenWidth}
                deviceHeight={((screenWidth / 2) * 3) - 10}
                onBackButtonPress={() => setVisible(false)}
                customBackdrop={<View style={{ flex: 1 }} />}
            >
                <View style={{ height: 50, backgroundColor: 'white' }}>
                    <ButtonClose onClose={() => setVisible(false)} />
                </View>
                <View style={{ flex: 1, backgroundColor: '#000000' }}>
                    <ImageViewer visible={visible} imageUrls={orderedImages} imageIndex={0} backgroundColor='#000000' />
                </View>
            </Modal>

            <FlatList
                ListHeaderComponent={
                    <>
                        <View style={{ width: screenWidth - 8, padding: 10, backgroundColor: 'white' }}>
                            <Text style={{ fontSize: 18, color: '#006400', fontWeight: 'bold', paddingLeft: 5 }}>{data?.merchantInfo?.shop_name}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Image source={require('../../assets/icon/ic_place_blue.png')}
                                    style={{ width: 25, height: 25, tintColor: 'blue', resizeMode: 'contain' }} />
                                <Text style={{ fontSize: 16, color: '#006400', marginLeft: 3, marginRight: 13 }}>{data?.merchantInfo?.shop_address}</Text>

                            </View>
                            <Text style={{ fontSize: 16, color: '#006400', marginLeft: 3, marginRight: 13 }}>Date : {formattedDate}</Text>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                            {currentModule === 'Grocery' &&
                                <FlatList
                                    contentContainerStyle={{ padding: 5 }}
                                    data={data?.orderItems}
                                    keyExtractor={item => item._id}
                                    renderItem={({ item }) => <OrderedItemList data={item} />}
                                />
                            }

                            {currentModule === 'Medicine' &&
                                <FlatList
                                    contentContainerStyle={{ padding: 5 }}
                                    data={data?.orderItems}
                                    keyExtractor={item => item._id}
                                    renderItem={({ item }) => <OrderedProductList data={item} />}
                                />
                            }
                        </View>
                    </>
                }
                ListFooterComponent={
                    <>
                        {data?.order_list_image?.length > 0 &&
                            <>
                                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#006400', paddingBottom: 10, marginTop: 15 }} >
                                    {currentModule === 'Medicine' ?
                                        'Prescription'
                                        :
                                        'Bazar list'
                                    }
                                </Text>
                                <View style={styles.ImageSections}>
                                    <View>
                                        {
                                            data?.order_list_image.map((image) => (
                                                <Pressable onPress={() => { setVisible(true) }}>
                                                    <Image
                                                        key={image}
                                                        source={{ uri: storageImageUrl(folderName, image) }}
                                                        style={styles.images}
                                                    />
                                                </Pressable>
                                            ))}
                                    </View>
                                </View>
                            </>
                        }
                        <View style={{
                            marginHorizontal: 2,
                            backgroundColor: 'white',
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 3,
                            borderRadius: 3,
                            elevation: 1,
                        }}>
                            <ItemResume title='SubTotal' price={(data?.subTotal).toFixed(2)} />
                            <ItemResume title='Delivery Charge' price={(data?.deliveryCharge).toFixed(2)} />
                            <ItemResume title='Less (-)' price={(data?.less_amount).toFixed(2)} />
                            <ItemResume title='Total' price={(data?.totalAmount).toFixed(2)} />
                        </View>
                    </>
                }
            />
        </View >
    );
}

function ItemResume({ title, price }) {
    return (
        <View style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 25,
            paddingRight: 22,
            alignItems: 'flex-end',
            borderTopWidth: 0.5,
            borderTopColor: '#e0e0e0'
        }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#263238', flex: 1 }}>{title} :</Text>
            <Text style={{ fontSize: 17, color: '#111d5e', fontWeight: 'bold' }}>৳ {price}</Text>
        </View>
    );
}

function ButtonClose({ onClose, tintColor = '#000000' }) {
    return (
        <TouchableOpacity onPress={onClose}
            style={{
                position: 'absolute',
                right: 10,
                top: 10,
                height: 33,
                width: 33,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Image style={{ width: 15, height: 15, tintColor: tintColor }}
                source={require('../../assets/icon/ic_close.png')} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
    },

    images: {
        width: (screenWidth - 20),
        height: (screenWidth / 2) * 3,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3,
        marginBottom: 25,
    },
});