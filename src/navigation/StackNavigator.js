import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import Dashboard from "../screens/dashboard";
import NearestGroceryShop from "../screens/grocery-shop/NearestGroceryShop";
import NearestMedicineShop from "../screens/medicine-shop/NearestMedicineShop";
import ExploreGroceryShop from "../screens/grocery-shop/ExploreGroceryShop";
import GroceryProductList from "../screens/grocery-shop/GroceryProductList";
import GroceryCartItems from "../screens/grocery-shop/GroceryCartItems";
import GroceryProductDetails from "../screens/grocery-shop/GroceryProductDetails";
import ExploreMedicineShop from "../screens/medicine-shop/ExploreMedicineShop";
import MedicineProductList from "../screens/medicine-shop/MedicineProductList";
import MedicineCartItems from "../screens/medicine-shop/MedicineCartItems";
import MedicineProductDetails from "../screens/medicine-shop/MedicineProductDetails";
import ExploreFoodModule from "../screens/food-shop/ExploreFoodModule";
import Login from "../screens/user/Login";
import SignUp from "../screens/user/SignUp";
import NearestFoodShop from "../screens/food-shop/NearestFoodShop";
import PlaceOrderMedicine from "../screens/medicine-shop/PlaceOrderMedicine";
import OrderInfo from "../screens/user/OrderInfo";
import OrderDetails from "../screens/user/OrderDetails";
import OrderSuccessful from "../screens/user/OrderSuccessful";
import PlaceOrderGrocery from "../screens/grocery-shop/PlaceOrderGrocery";
import ChangeDefaultLocation from "../screens/user/ChangeDefaultLocation";
import FavouriteStore from "../screens/user/FavouriteStore";
import FavouriteItems from "../screens/user/FavouriteItems";
import ChangeCurrentLocation from "../screens/user/ChangeCurrentLocation";
//import ExploreFoodShop from "../screens/food-shop/ExploreFoodShop";
//import FoodProductList from "../screens/food-shop/FoodProductList";
import FoodCartItems from "../screens/food-shop/FoodCartItems";
import PlaceOrderFood from "../screens/food-shop/PlaceOrderFood";
//import FoodProductDetails from "../screens/food-shop/FoodProductDetails";
import SharedElementExample from "../screens/sharedElementTransitions";
import FoodShopNavigation from "../screens/food-shop/FoodShopNavigation";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
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
                    ...TransitionPresets.SlideFromRightIOS,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ExploreGroceryShop"
                component={ExploreGroceryShop}
                options={{
                    ...TransitionPresets.SlideFromRightIOS,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="GroceryProductList"
                component={GroceryProductList}
                options={{
                    ...TransitionPresets.SlideFromRightIOS,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="GroceryCartItems"
                component={GroceryCartItems}
                options={{
                    ...TransitionPresets.SlideFromRightIOS,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="GroceryProductDetails"
                component={GroceryProductDetails}
                options={{
                    ...TransitionPresets.SlideFromRightIOS,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="PlaceOrderGrocery"
                component={PlaceOrderGrocery}
                options={{
                    ...TransitionPresets.SlideFromRightIOS,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="NearestMedicineShop"
                component={NearestMedicineShop}
                options={{
                    ...TransitionPresets.SlideFromRightIOS,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ExploreMedicineShop"
                component={ExploreMedicineShop}
                options={{
                    ...TransitionPresets.SlideFromRightIOS,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="MedicineProductList"
                component={MedicineProductList}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="MedicineProductDetails"
                component={MedicineProductDetails}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="MedicineCartItems"
                component={MedicineCartItems}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="PlaceOrderMedicine"
                component={PlaceOrderMedicine}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="OrderInfo"
                component={OrderInfo}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="OrderDetails"
                component={OrderDetails}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ExploreFoodModule"
                component={ExploreFoodModule}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="NearestFoodShop"
                component={NearestFoodShop}
                options={{
                    ...TransitionPresets.SlideFromRightIOS,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="FoodShopNavigation"
                component={FoodShopNavigation}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="FoodCartItems"
                component={FoodCartItems}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Ecommerce Shared Element Transision"
                component={SharedElementExample}
            />
            <Stack.Screen
                name="PlaceOrderFood"
                component={PlaceOrderFood}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ChangeDefaultLocation"
                component={ChangeDefaultLocation}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="OrderSuccessful"
                component={OrderSuccessful}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="FavouriteStore"
                component={FavouriteStore}
                options={{
                    ...TransitionPresets.SlideFromRightIOS,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="FavouriteItems"
                component={FavouriteItems}
                options={{
                    ...TransitionPresets.SlideFromRightIOS,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ChangeCurrentLocation"
                component={ChangeCurrentLocation}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

export { MainStackNavigator };