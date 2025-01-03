import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import FavouriteServiceProvider from "../screens/user/FavouriteServiceProvider";
import ChangeCurrentLocation from "../screens/user/ChangeCurrentLocation";
import ExploreFoodShop from "../screens/food-shop/ExploreFoodShop";
import FoodProductList from "../screens/food-shop/FoodProductList";
import FoodProductDetails from "../screens/food-shop/FoodProductDetails";
import FoodCartItems from "../screens/food-shop/FoodCartItems";
import PlaceOrderFood from "../screens/food-shop/PlaceOrderFood";
import SharedElementExample from "../screens/sharedElementTransitions";
//import FoodShopNavigation from "../screens/food-shop/FoodShopNavigation";
import ExploreFindDoctors from "../screens/doctor-portal/ExploreFindDoctors";
import DoctorsInformation from "../screens/doctor-portal/DoctorsInformation";
import NearestCenterInfo from "../screens/doctor-portal/NearestCenterInfo";
import CenterInformation from "../screens/doctor-portal/CenterInformation";
import ExploreConsultationCenter from "../screens/doctor-portal/ExploreConsultationCenter";
import ProfileOfDoctor from "../screens/doctor-portal/ProfileOfDoctor";
import OnlineBooking from "../screens/doctor-portal/OnlineBooking";
import PatientProfile from "../screens/patient-portal/PatientProfile";
import PatientInfo from "../screens/patient-portal/PatientInfo";
import BookAppointment from "../screens/patient-portal/BookAppointment";
import BookedAppointmentInfo from "../screens/patient-portal/BookedAppointmentInfo";
import ExploreMedicalService from "../screens/medical-service/ExploreMedicalService";
import MedicalServiceProvider from "../screens/medical-service/MedicalServiceProvider";
import FindAmbulance from "../screens/ambulance-service/FindAmbulance";
import ResetLocation from "../screens/user/ResetLocation";
import BankingOutlet from "../screens/service-provider/BankingOutlet";
import BankingOutletDetails from "../screens/service-provider/BankingOutletDetails";
import ExploreAllService from "../screens/service-provider/ExploreAllService";
import ExploreServideProvider from "../screens/service-provider/ExploreServideProvider";
import ServiceProviderDetails from "../screens/service-provider/ServiceProviderDetails";

import RequestForRegistration from "../screens/request-for-registration";
import AllCareServiceReg from "../screens/request-for-registration/AllCareServiceReg";
import MedicineShopReg from "../screens/request-for-registration/MedicineShopReg";
import GroceryShopReg from "../screens/request-for-registration/GroceryShopReg";
import FoodShopReg from "../screens/request-for-registration/FoodShopReg";
import ConsultationCenterReg from "../screens/request-for-registration/ConsultationCenterReg";
import AmbulanceServiceProviderReg from "../screens/request-for-registration/AmbulanceServiceProviderReg";
import MedicalServicesProviderReg from "../screens/request-for-registration/MedicalServicesProviderReg";
import BankingOutletReg from "../screens/request-for-registration/BankingOutletReg";

const Stack = createStackNavigator();
//const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ResetLocation"
                component={ResetLocation}
                options={{
                    ...TransitionPresets.SlideFromRightIOS,
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
                name="ExploreFoodShop"
                component={ExploreFoodShop}
                options={{
                    ...TransitionPresets.SlideFromRightIOS,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="FoodProductList"
                component={FoodProductList}
                options={{
                    ...TransitionPresets.SlideFromRightIOS,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="FoodProductDetails"
                component={FoodProductDetails}
                options={{
                    ...TransitionPresets.SlideFromRightIOS,
                    headerShown: false
                }}
            />
            {/* <Stack.Screen
                name="FoodShopNavigation"
                component={FoodShopNavigation}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            /> */}
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
                name="FavouriteServiceProvider"
                component={FavouriteServiceProvider}
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
            <Stack.Screen
                name="ExploreFindDoctors"
                component={ExploreFindDoctors}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="DoctorsInformation"
                component={DoctorsInformation}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="CenterInformation"
                component={CenterInformation}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="NearestCenterInfo"
                component={NearestCenterInfo}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ExploreConsultationCenter"
                component={ExploreConsultationCenter}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ProfileOfDoctor"
                component={ProfileOfDoctor}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="OnlineBooking"
                component={OnlineBooking}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="PatientProfile"
                component={PatientProfile}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="PatientInfo"
                component={PatientInfo}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="BookAppointment"
                component={BookAppointment}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="BookedAppointmentInfo"
                component={BookedAppointmentInfo}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ExploreMedicalService"
                component={ExploreMedicalService}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="MedicalServiceProvider"
                component={MedicalServiceProvider}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="FindAmbulance"
                component={FindAmbulance}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="BankingOutlet"
                component={BankingOutlet}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="BankingOutletDetails"
                component={BankingOutletDetails}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ExploreAllService"
                component={ExploreAllService}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ExploreServideProvider"
                component={ExploreServideProvider}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ServiceProviderDetails"
                component={ServiceProviderDetails}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="RequestForRegistration"
                component={RequestForRegistration}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="AllCareServiceReg"
                component={AllCareServiceReg}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="MedicineShopReg"
                component={MedicineShopReg}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="GroceryShopReg"
                component={GroceryShopReg}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="FoodShopReg"
                component={FoodShopReg}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ConsultationCenterReg"
                component={ConsultationCenterReg}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="AmbulanceServiceProviderReg"
                component={AmbulanceServiceProviderReg}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="MedicalServicesProviderReg"
                component={MedicalServicesProviderReg}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="BankingOutletReg"
                component={BankingOutletReg}
                options={{
                    ...TransitionPresets.RevealFromBottomAndroid,
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

export { MainStackNavigator };