import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Root } from "native-base";

import AppNavigator from './navigation/AppNavigator';
import Reducer from "./Reducer";
// import * as firebase from "firebase";
// import { firebaseConfig } from "./config/firebase";

// firebase.initializeApp(firebaseConfig)

const createStoreWithMiddleWare = applyMiddleware(ReduxThunk)(createStore)

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    console.ignoredYellowBox = [
        'Setting a timer'
    ];
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
    return (
      <Provider store={createStoreWithMiddleWare(Reducer)}>
        <Root>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar backgroundColor="#000" barStyle="default" />}
            <AppNavigator />
          </View>
        </Root>
      </Provider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      // This is the font that we are using for our tab bar
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
      'Lato': require('./assets/fonts/Lato-Regular.ttf'),
      'latoBold': require('./assets/fonts/Lato-Bold.ttf'),
      'latoItalic': require('./assets/fonts/Lato-Italic.ttf'),
       'MontserratBold': require('./assets/fonts/Montserrat-Bold.ttf'),
       'MontserratExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
       'MontserratMedium': require('./assets/fonts/Montserrat-Medium.ttf')
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry ys no
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
