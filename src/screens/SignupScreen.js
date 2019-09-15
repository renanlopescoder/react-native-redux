import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  ImageBackground
} from "react-native";
import { Icon, Input, Form, Item, Toast } from "native-base";
import { HeaderBackButton } from "react-navigation";
import { connect } from "react-redux";

import * as firebase from "firebase";
import "firebase/firestore";

import { setEmail } from "../redux/actions/login";
import Colors from "../constants/Colors";
import ButtonBlock from "../components/ButtonBlock";
import backgroundImage from "../assets/images/backgroundSignup.jpg";

const mapStateToProps = state => ({
  email: state.loginReducer.email
});

const mapDispatchToProps = dispatch => ({
  setEmail: text => {
    dispatch(setEmail(text));
  }
});
const toastConfig = {
  buttonText: "Okay",
  duration: 3000
};
class SignupScreen extends React.Component {
  state = {
    apiKey: "",
    password: "",
    passwordConfirm: ""
  };

  static navigationOptions = ({ navigation }) => ({
    title: "New Account",
    headerTitleStyle: {
      fontWeight: "bold",
      color: Colors.dark
    },
    headerLeft: (
      <HeaderBackButton
        title={null}
        onPress={() => navigation.goBack()}
        tintColor={Colors.dark}
      />
    )
  });

  onSignupPress = async () => {
    const { apiKey, password, passwordConfirm } = this.state;

    if (password !== passwordConfirm) {
      toastConfig.text = "Passwords do not match";
      toastConfig.type = "warning";
      Toast.show(toastConfig);
      return;
    }

    if (apiKey === "") {
      toastConfig.text = "API Key is required";
      toastConfig.type = "warning";
      Toast.show(toastConfig);
      return;
    }

    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.props.email, password);

      const db = firebase.firestore();
      await db
        .collection("users")
        .doc(response.user.uid)
        .set({ apiKey });

      toastConfig.text = "Account created";
      toastConfig.type = "success";
      Toast.show(toastConfig);
      this.props.navigation.navigate("Signin");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  render() {
    return (
      <ImageBackground
        source={backgroundImage}
        style={{ width: "100%", height: "100%" }}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <Form>
            <Item style={{ marginBottom: 10, backgroundColor: "#fff" }} rounded>
              <Icon name="ios-at" size={26} style={styles.icon} />
              <Input
                value={this.props.email}
                onChangeText={text => {
                  this.props.setEmail(text);
                }}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>
            <Item style={{ marginBottom: 10, backgroundColor: "#fff" }} rounded>
              <Icon name="key" size={26} style={styles.icon} />
              <Input
                value={this.state.apiKey}
                onChangeText={text => {
                  this.setState({ apiKey: text });
                }}
                placeholder="Api Key"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>
            <Item style={{ marginBottom: 10, backgroundColor: "#fff" }} rounded>
              <Icon name="lock" size={26} style={styles.icon} />
              <Input
                value={this.state.password}
                onChangeText={text => {
                  this.setState({ password: text });
                }}
                placeholder="Password"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>
            <Item style={{ marginBottom: 10, backgroundColor: "#fff" }} rounded>
              <Icon name="lock" size={26} style={styles.icon} />
              <Input
                value={this.state.passwordConfirm}
                onChangeText={text => {
                  this.setState({ passwordConfirm: text });
                }}
                placeholder="Password (confirm)"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>
          </Form>
          <ButtonBlock title="Signup" onPress={this.onSignupPress} />
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 15
  },
  icon: {
    marginBottom: -3,
    color: Colors.primary
  }
});
