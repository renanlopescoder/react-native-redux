import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DetailsScreen from "../screens/DetailsScreen";
import Colors from "../constants/Colors";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Characters",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="ios-contacts" />
  ),
  tabBarOptions: {
    activeTintColor: Colors.primary
  }
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.primary
  }
};

export default createBottomTabNavigator({
  HomeStack,
  SettingsStack
});
