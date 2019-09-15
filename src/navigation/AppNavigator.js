import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";
import ForgotPasswordScreen from "../screens/ForgotPassword";

const PublicStack = createStackNavigator({
  Signin: SigninScreen,
  Signup: SignupScreen,
  ForgotPassword: ForgotPasswordScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Main: MainTabNavigator,
      PublicStack: PublicStack
    },
    {
      initialRouteName: "PublicStack"
    }
  )
);
