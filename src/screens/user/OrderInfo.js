import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View, BackHandler } from "react-native";
import { useSelector } from 'react-redux';
import { useOrder } from '../../hooks/fetch-data-by-module/useOrder';
import HeaderCommon from '../../components/header/HeaderCommon';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { makeCall } from '../../helpers/imageUrl';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

export default function OrderInfo() {
    const navigation = useNavigation();
    const currentModule = useSelector((state) => state.dashboard.currentModule);
    const [orderInfo, setOrderInfo] = useState([]);
    const [title, setTitle] = useState([]);
    const { groceryOrderInfo, medicineOrderInfo, foodOrderInfo } = useSelector((state) => state.user);
    const { getOrderInfo, progressing } = useOrder();

    useEffect(() => {
      
        getOrderInfo(currentModule);
        const backAction = () => {
            navigation.goBack();
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {

        if (currentModule === 'Grocery') {

            setTitle('Grocery Order Info');
            setOrderInfo(groceryOrderInfo);

        } else if (currentModule === 'Food') {

            setTitle('Food Order Info');
            setOrderInfo(foodOrderInfo);

        } else if (currentModule === 'Medicine') {

            setTitle('Medicine Order Info');
            setOrderInfo(medicineOrderInfo);

        }

    }, [groceryOrderInfo, medicineOrderInfo, foodOrderInfo]);

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <ProgressStyle2 visible={progressing} />
            <HeaderCommon title={title} toggleDrawer={null} />
            <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#ff9800', width: '100%' }}>
                    <Text style={{ flex: 1, color: 'white', paddingVertical: 10, fontSize: 18, textAlign: 'center' }}>Select to get order details</Text>
                </View>
                <FlatList
                    contentContainerStyle={{ padding: 5 }}
                    data={orderInfo}
                    renderItem={({ item }) => <ListItem data={item} currentModule={currentModule} />}
                    keyExtractor={item => item._id}
                />
            </View>
        </View>
    );
}

function ListItem({ data, currentModule }) {
    let cardMargin = 4;
    let cardWidth = screenWidth - (cardMargin * 4);
    const navigation = useNavigation();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  
    const formattedDate = new Date(data?.createdAt).toLocaleDateString('en-GB', options);
    return (
        <TouchableOpacity onPress={() => { navigation.navigate('OrderDetails', { data: data, currentModule: currentModule }) }}>
            <View style={{
                backgroundColor: 'white',
                width: cardWidth,
                margin: cardMargin,
                flexDirection: 'row',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                borderRadius: 10,
                elevation: 3,
            }} >
                <View style={{ flex: 1, padding: 15 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#F68F1E' }}>Order Id : {data._id.slice(-5)}</Text>
                    <Text style={{ fontSize: 15, color: '#003B95', marginTop: 8 }} numberOfLines={1} ellipsizeMode="tail">{data?.merchantInfo?.shop_name}</Text>
                    <Text style={{ fontSize: 15, color: '#003B95', marginTop: 2 }} numberOfLines={2} ellipsizeMode="tail">{data?.merchantInfo?.shop_address}</Text>
                    <Text style={{ fontSize: 15, color: '#003B95', marginTop: 2 }} numberOfLines={1} ellipsizeMode="tail">

                        <Text style={{ fontSize: 17, color: '#008000', marginTop: 2 }} onPress={() => makeCall(data?.merchantInfo?.contact_no)}>
                            {data?.merchantInfo?.contact_no} </Text>,{'  '}

                        <Text style={{ fontSize: 17, color: '#008000', marginTop: 2 }} onPress={() => makeCall(data?.merchantInfo?.contact_no)}>
                            {data?.merchantInfo?.alternative_contact_no} </Text>

                    </Text>
                    <Text style={{ fontSize: 15, color: '#008000', marginTop: 2 }} numberOfLines={3} ellipsizeMode="tail">Order Date : {formattedDate}</Text>
                    <Text style={{ fontSize: 15, color: '#FF0000', marginTop: 2 }} numberOfLines={3} ellipsizeMode="tail">Order Status : {data.order_status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}