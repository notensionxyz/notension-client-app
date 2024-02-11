import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Pressable,
  BackHandler,
  ScrollView,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Animated from 'react-native-reanimated';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { food_itemsImages } from '../../helpers/Constants';
import { storageImageUrl } from '../../helpers/imageUrl';
import HeaderCommon from '../../components/header/HeaderCommon';
import FooterCommon from '../../components/footer/FooterCommon';
import { handleFoodItems } from '../../hooks/cart-handler/handleFoodItems';

const screenWidth = Dimensions.get('window').width;
const IMAGE_HEIGHT = Dimensions.get('window').height * 0.4;
let connectionStatus = 'true';
let isReachable = 'true';
export default function FoodProductDetails() {
  const { params } = useRoute();
  const data = params?.data;
  const navigation = useNavigation();
  const {
    getQty,
    addToCart,
    removeFromCart,
    deccreseQty,
  } = handleFoodItems();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }, [navigation])
  );

  let currentQty = getQty(data?._id);

  let isAvailable = 1;


  let [quantity, setQuantity] = useState(currentQty);
  quantity = currentQty;

  let isInStock = 1;

  return (
    <View style={styles.container}>
      <HeaderCommon toggleDrawer={navigation} title="Product Details" connectionStatus={connectionStatus} isReachable={isReachable} />
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
          <View style={styles.center}>
            <Animated.Image
              style={{ width: '100%', height: screenWidth }}
              sharedTransitionTag={data?._id}
              source={{
                uri: storageImageUrl(food_itemsImages, data?.app_image),
              }}
            />
          </View>
          <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <View style={{
              width: screenWidth,
              flexDirection: 'row',
              backgroundColor: 'white',
              borderTopWidth: 0.5,
              borderTopColor: '#e0e0e0',
              alignItems: 'center',
              justifyContent: 'center',
            }}>

              <View style={{ flex: 1, padding: 10 }}>

                {/* <Text style={{ fontSize: 18, color: '#263238', fontWeight: 'bold' }}>{data?.product_title_eng}</Text> */}
                <Text style={{ fontSize: 18, color: '#263238', fontWeight: 'bold' }}>{data?.product_title_beng}</Text>

                <Text>
                  <Text style={{ fontSize: 18, color: '#616161', fontWeight: 'bold' }}>{data?.pack_size}    </Text>
                  {parseFloat(data?.less) > 0 && parseFloat(data?.max_retail_price) > 0 ?
                    <Text style={{
                      fontSize: 18,
                      color: '#800000',
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid'
                    }}>৳ {data?.max_retail_price}</Text>
                    : null
                  }
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                  <View style={{ width: "40%" }}>
                    <Text style={{ fontSize: 18, color: '#ff9800', marginTop: 5, fontWeight: 'bold' }}>৳ {data?.sale_price}</Text>

                  </View>
                  {isInStock > 0 ?
                    <View style={{ width: "60%", paddingRight: 5, alignItems: 'flex-end' }}>

                      {quantity < 1 ?
                        <Pressable style={{
                          height: 34,
                          width: 110,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingHorizontal: 11,
                          borderWidth: 2,
                          borderColor: '#006400',
                          borderRadius: 4,
                          paddingLeft: 8,

                        }}
                          onPress={() => {
                            setQuantity(quantity + 1);
                            addToCart(data);
                          }}
                        >
                          <Image style={{ width: 100, height: 33, tintColor: '#006400' }}
                            resizeMode={'contain'}
                            source={require('../../assets/icon/Add-to-Bag.png')} />
                          {/* <Text style={{ color: '#111d5e', fontSize: 18, }}>Add to Bag</Text> */}
                        </Pressable>
                        :
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0 }}>
                          {quantity > 1 ?
                            <FloatingButton size={34} style={{ position: 'relative' }}
                              image={require('../../assets/icon/ic_minus.png')}
                              imageStyle={{ tintColor: '#006400', width: 28, height: 28 }}
                              onPress={() => {
                                setQuantity(quantity - 1);
                                deccreseQty(data?._id);
                              }}
                            />
                            : <FloatingButton size={34} style={{ position: 'relative' }}
                              image={require('../../assets/icon/ic_minus.png')}
                              imageStyle={{ tintColor: '#006400', width: 28, height: 28 }}
                              onPress={() => {
                                setQuantity(quantity - 1);
                                removeFromCart(data?._id);
                              }}
                            />
                          }
                          <Text style={{ width: 35, textAlign: 'center', fontSize: 18, color: '#E3319D' }}>{currentQty}</Text>
                          {data?.max_allowed < 1 || data?.max_allowed > currentQty ?
                            <FloatingButton size={34} style={{ position: 'relative' }}
                              image={require('../../assets/icon/ic_plus.png')}
                              imageStyle={{ tintColor: '#006400', width: 28, height: 28 }}
                              onPress={() => {
                                setQuantity(quantity + 1);
                                addToCart(data);
                              }} />
                            :
                            <FloatingButton2 size={34} style={{ position: 'relative' }} />
                          }
                        </View>
                      }
                    </View>
                    :
                    <>
                      <View style={{ width: "60%", paddingRight: 5, alignItems: 'flex-end' }}>
                        <Pressable style={{
                          height: 30,
                          width: 120,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingHorizontal: 11,
                          borderWidth: 2,
                          borderColor: '#800000',
                          borderRadius: 4,
                          paddingLeft: 10,
                        }}
                        >
                          <Image style={{ width: 120, height: 27, tintColor: '#800000' }}
                            resizeMode={'contain'}
                            source={require('../../assets/icon/Out-Of-Stock.png')} />
                        </Pressable>
                      </View>
                    </>
                  }
                </View>
                {/* <HTML source={{ html: "<p style='text-align:justify; text-justify: inter-word'; >" + data?.product_desc_eng || null + "<br><br>" + data?.product_desc_beng || null + "<p>" }} contentWidth={deviceWidth} /> */}
              </View>
            </View >
          </View>
        </View>
      </ScrollView>
      <FooterCommon module='Food' />
    </View>
  );
}

function FloatingButton({ onPress, size = 40, style = { position: 'absolute' }, disabled = false, image = require('../../assets/icon/ic_plus_white.png'), imageStyle = {} }) {

  return (
    <Pressable disabled={disabled} style={[{
      height: size,
      width: size,
      borderWidth: 2,
      borderColor: '#006400',
      bottom: style.position === 'relative' ? undefined : 20,
      right: style.position === 'relative' ? undefined : 20,
      borderRadius: size / 2,
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: '#f44336',
      elevation: 0,
      //shadowOffset: { width: 0, height: 2 },
      //shadowOpacity: 0.3
    }, style]} onPress={onPress}>
      <Image source={image}
        style={[{ width: size * 0.5, height: size * 0.5, resizeMode: 'contain' }, imageStyle]} />
    </Pressable>

  );
}

function FloatingButton2({ size = 40, style = { position: 'absolute' }, disabled = false }) {

  return (
    <Pressable disabled={disabled} style={[{
      height: size,
      width: size,
      borderWidth: 0,
      borderColor: '#111d5e',
      bottom: style.position === 'relative' ? undefined : 20,
      right: style.position === 'relative' ? undefined : 20,
      borderRadius: size / 2,
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: '#f44336',
      elevation: 0,
      //shadowOffset: { width: 0, height: 2 },
      //shadowOpacity: 0.3
    }, style]}>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f7',
    alignItems: 'center'
  },
  center: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  weight: {
    color: 'grey',
    fontSize: 17,
  },
  foodInfo: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  whiteColor: {
    color: 'white',
  },
  backBtnWrapper: {
    position: 'absolute',
    left: 0,
    top: 20,
    backgroundColor: '#e1e1e5',
    padding: 10,
    borderRadius: 5,
  },
});