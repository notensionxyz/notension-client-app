import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import Dashboard from "../screens/dashboard";
import NearestGroceryShop from "../screens/grocery-shop/NearestGroceryShop";
import NearestMedicineShop from "../screens/medicine-shop/NearestMedicineShop";
import ExploreGroceryShop from "../screens/grocery-shop/ExploreGroceryShop";
import GroceryProductList from "../screens/grocery-shop/GroceryProductList";
import GroceryCartItems from "../screens/grocery-shop/GroceryCartItems";
import GroceryProductDetails from "../screens/grocery-shop/GroceryProductDetails";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="NearestGroceryShop"
                component={NearestGroceryShop}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ExploreGroceryShop"
                component={ExploreGroceryShop}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="GroceryProductList"
                component={GroceryProductList}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="GroceryCartItems"
                component={GroceryCartItems}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="GroceryProductDetails"
                component={GroceryProductDetails}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="NearestMedicineShop"
                component={NearestMedicineShop}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

export { MainStackNavigator };