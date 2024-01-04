import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HOME" component={MainStackNavigator} options={{ tabBarStyle: { display: 'none' }, headerShown: false }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;