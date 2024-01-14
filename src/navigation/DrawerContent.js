import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
//import { PRIVACY_URL } from "../assets/icon";
// import { openUrl, makeCall } from "../appurl/Helpers";
import {
  DrawerContentScrollView,
  useDrawerStatus
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { handleUserReducer } from '../store/reducers/userReducer';

export default function DrawerContent({ navigation }) {
  const dispatch = useDispatch();
  const { isLoggedin, userInfo } = useSelector((state) => state.user);
  const currentModule = useSelector((state) => state.dashboard.currentModule);

  const isDrawerOpen = useDrawerStatus();

  useEffect(() => {
    return () => {
      if (isDrawerOpen === 'open') {
        //getCustomerInfo();
      }
    }
  }, [isDrawerOpen]);


  const [selected, setSelected] = useState(0);

  // const getCustomerInfo = async () => {
  //   try {
  //     let user = await AsyncStorage.getItem('user');
  //     let parsed = JSON.parse(user);
  //     if (parsed !== null) {
  //       setIsLogin(1);
  //       setName(parsed.name);
  //       setPhone(parsed.mobile);
  //       setKey(parsed.accessKey);
  //     } else {
  //       setIsLogin(0);
  //       setName('');
  //       setPhone('');
  //       setKey('');
  //     }
  //   }
  //   catch (error) {
  //     alert(error)
  //   }
  // };

  const logoutUser = () => {
    dispatch(
      handleUserReducer({
        type: 'LOGOUT_USER',
        data: {},
      })
    );
  };

  const processToLogin = async () => {
    try {
      // let user = await AsyncStorage.getItem('user');
      // let parsed = JSON.parse(user);
      // if (parsed !== null) {
      //   navigation.navigate('Home');
      // } else {
      //   navigation.navigate('Login', { fromDrawer: 1 })
      // }
    }
    catch (error) {
      alert(error)
    }

  };

  const showMyOrder = () => {
    if (isLoggedin) {
      navigation.navigate('OrderInfo');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            marginBottom: 50,
            padding: 10,
            elevation: 3,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3
          }}>

            {isLoggedin ?
              <>
                <Image source={require('../assets/icon/logo_profile.png')}
                  style={{ height: 40, width: 40, resizeMode: 'contain', marginRight: 5, marginLeft: 5 }} />
                <View style={{ flex: 1, padding: 5 }}>
                  <Text style={{ fontSize: 16, color: '#616161', fontWeight: 'bold' }}>{userInfo?.customer_name}</Text>
                  <Text style={{ fontSize: 16, color: '#616161' }}>{userInfo?.contact_no}</Text>
                </View>
              </>
              :
              <>
                <Image source={require('../assets/icon/logo_profile.png')}
                  style={{ height: 40, width: 40, resizeMode: 'contain', marginRight: 5, marginLeft: 5 }} />
                <View>
                  <Text style={{ fontSize: 18, color: '#616161', fontWeight: 'bold' }}>Guest</Text>
                  <Text style={{ fontSize: 16, color: '#616161' }}>01........</Text>
                </View>
              </>
            }
          </View>
        </View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: 'transparent'
          }} onPress={() => { navigation.navigate('Home') }}>
          <Image source={require('../assets/icon/home.png')}
            style={{ height: 28, width: 28, resizeMode: 'contain', tintColor: selected === 'bag' ? '#48d7ff' : '#111d5e' }} />
          <Text style={{
            fontSize: 18,
            color: '#212121',
            fontWeight: 'bold',
            marginLeft: 17
          }}>Home</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: 'transparent'
          }} onPress={() => { navigation.navigate('SpecialOffer') }}>
          <Image source={require('../assets/bottom/Offer-Icon.png')}
            style={{ height: 32, width: 34, resizeMode: 'contain', tintColor: selected === 'bag' ? '#48d7ff' : '#111d5e' }} />
          <Text style={{
            fontSize: 18,
            color: '#212121',
            fontWeight: 'bold',
            marginLeft: 11
          }}>Special Offer</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: 'transparent'
          }} onPress={() => { navigation.navigate('PopularItem') }}>
          <Image source={require('../assets/bottom/Popular-ICon.png')}
            style={{ height: 30, width: 30, resizeMode: 'contain', tintColor: selected === 'bag' ? '#48d7ff' : '#111d5e' }} />
          <Text style={{
            fontSize: 18,
            color: '#212121',
            fontWeight: 'bold',
            marginLeft: 15
          }}>Popular Items</Text>
        </TouchableOpacity> */}
        {currentModule !== 'dashboard' &&
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: 'transparent'
            }} onPress={() => { showMyOrder(); }}>
            <Image source={require('../assets/icon/My-Order.png')}
              style={{ height: 34, width: 34, resizeMode: 'contain', tintColor: selected === 'bag' ? '#48d7ff' : '#111d5e' }} />
            <Text style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: '#212121',
              fontWeight: 'bold',
              marginLeft: 11
            }}>My Order</Text>
          </TouchableOpacity>
        }
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: 'transparent'
          }}>
          <Image source={require('../assets/icon/eye.png')}
            style={{ height: 28, width: 28, resizeMode: 'contain', tintColor: selected === 'bag' ? '#48d7ff' : '#111d5e' }} />
          <Text style={{
            fontWeight: 'bold',
            fontSize: 18,
            color: '#212121',
            fontWeight: 'bold',
            marginLeft: 17
          }}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: 'transparent'
          }}>
          <Image source={require('../assets/icon/map5_ic_call.png')}
            style={{ height: 28, width: 28, resizeMode: 'contain', tintColor: selected === 'bag' ? '#48d7ff' : '#111d5e' }} />
          <Text style={{
            fontWeight: 'bold',
            fontSize: 18,
            color: '#212121',
            fontWeight: 'bold',
            marginLeft: 17
          }}>Call Us</Text>
        </TouchableOpacity>
        {isLoggedin ?
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: 'transparent'
            }} onPress={() => { logoutUser(); }}>
            <Image source={require('../assets/icon/ic_menu4_logout.png')}
              style={{ height: 27, width: 27, resizeMode: 'contain', tintColor: selected === 'bag' ? '#48d7ff' : '#111d5e' }} />
            <Text style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: '#212121',
              fontWeight: 'bold',
              marginLeft: 18
            }}>Logout</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: 'transparent'
            }} onPress={() => { navigation.navigate('Login'); }}>
            <Image source={require('../assets/icon/logo_login.png')}
              style={{ height: 30, width: 30, resizeMode: 'contain', tintColor: selected === 'bag' ? '#48d7ff' : '#111d5e' }} />
            <Text style={{

              fontSize: 18,
              color: '#212121',
              fontWeight: 'bold',
              marginLeft: 15
            }}>Login</Text>
          </TouchableOpacity>

        }
      </DrawerContentScrollView>
    </View >
  );
}

//export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});