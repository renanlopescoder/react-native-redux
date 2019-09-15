import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground
} from "react-native";
import { Form, Item, Input, Icon, Toast } from "native-base";
import { HeaderBackButton } from "react-navigation";
import * as firebase from "firebase";
import { connect } from "react-redux";

import ButtonBlock from "../components/ButtonBlock";
import Colors from "../constants/Colors";
import backgroundImage from "../assets/images/backgroundForgotPassword.jpg";
import { setEmail } from "../redux/actions/login";

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

class ForgotPasswordScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Forgot Password",
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

  onResetPasswordPress = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(this.props.email);
      toastConfig.text = "Reset password sended to your email";
      toastConfig.type = "success";
      Toast.show(toastConfig);
      this.props.navigation.navigate("Signin");
    } catch (error) {
      toastConfig.text = error.message;
      toastConfig.type = "danger";
      Toast.show(toastConfig);
    }
  };

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.background}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <Form>
            <Item style={{ backgroundColor: "#fff" }} rounded>
              <Icon name="lock" size={20} style={styles.icon} />
              <Input
                style={styles.input}
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
          </Form>

          <ButtonBlock
            title="Reset Password"
            onPress={this.onResetPasswordPress}
          />
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  form: {
    marginBottom: 15
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff"
  },
  icon: {
    marginBottom: -3,
    color: Colors.primary
  },
  background: {
    width: "100%",
    height: "100%"
  }
});
