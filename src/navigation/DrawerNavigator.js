import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from "./TabNavigator";
import DrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
