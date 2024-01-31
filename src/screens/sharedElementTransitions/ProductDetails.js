import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import React, { useRef } from 'react';
import Animated from 'react-native-reanimated';
import { useRoute } from '@react-navigation/native';
import { food_itemsImages } from '../../helpers/Constants';
import { storageImageUrl } from '../../helpers/imageUrl';

const IMAGE_HEIGHT = Dimensions.get('window').height * 0.4;

export default function ProductPage() {
  const { params } = useRoute();
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.center}>
          <Animated.Image
            style={{ width: '100%', height: IMAGE_HEIGHT }}
            sharedTransitionTag={params.data?._id}
            source={{
              uri: storageImageUrl(food_itemsImages, params.data?.app_image),
            }}
          />
        </View>
        {/* Title & description */}
        <Text style={styles.title}>Avocado Salad</Text>
        <Text style={styles.weight}>300 g</Text>
        <Text style={[styles.weight, { marginVertical: 20 }]}>
          Homemade italian dressing, cherry tomatoes, green olives,Homemade
          italian
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: '#f9f9f9',
    paddingTop: 50,
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
