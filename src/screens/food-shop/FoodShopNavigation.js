import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExploreFoodShop from './ExploreFoodShop';
import FoodProductList from './FoodProductList';
import FoodProductDetails from './FoodProductDetails';
const Stack = createNativeStackNavigator();

export default function FoodShopNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="ExploreFoodShop"
                component={ExploreFoodShop}
            />
            <Stack.Screen
                name="FoodProductList"
                component={FoodProductList}
            />
            <Stack.Screen
                name="FoodProductDetails"
                component={FoodProductDetails}
            />
        </Stack.Navigator>
    );
}
