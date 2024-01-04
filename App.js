import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, View, StatusBar, Platform, Dimensions } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/store';
import RootNavigator from './src/navigation';
import { logoColor_1, logoColor_2 } from './src/helpers/Constants';
import { enableLatestRenderer } from 'react-native-maps';

enableLatestRenderer();
const screenWidth = Dimensions.get('window').width;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ height: STATUS_BAR_HEIGHT }}>
            <StatusBar translucent backgroundColor="white" barStyle='dark-content' />
          </View>
          <RootNavigator />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

export default App;