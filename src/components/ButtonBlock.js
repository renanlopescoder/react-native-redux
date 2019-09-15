import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "native-base";

import Colors from "../constants/Colors";

export default props => (
  <Button style={styles.button} onPress={props.onPress} bordered block>
    <Text style={styles.title}>{props.title}</Text>
  </Button>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    margin: 5,
    borderColor: Colors.primary
  },
  title: {
    color: "#fff",
    fontWeight: "bold"
  }
});
