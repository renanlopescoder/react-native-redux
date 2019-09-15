import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { Root } from "native-base";
import { Provider } from "react-redux";

import AppNavigator from "./src/navigation/AppNavigator";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import { firebaseConfig } from "./src/constants/Config";
import { store } from "./src/redux/store";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false
    };

    // Initialize firebase...
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = user => {
    this.setState({ isAuthenticationReady: true });
  };

  render() {
    if (
      (!this.state.isLoadingComplete || !this.state.isAuthenticationReady) &&
      !this.props.skipLoadingScreen
    ) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            {Platform.OS === "android" && (
              <View style={styles.statusBarUnderlay} />
            )}
            <Root>
              <AppNavigator />
            </Root>
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./src/assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: "rgba(0,0,0,0.2)"
  }
});
