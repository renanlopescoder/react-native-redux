import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage,
  ImageBackground
} from "react-native";
import { Button, Form, Item, Input, Icon, Text, View } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import * as firebase from "firebase";
import { connect } from "react-redux";

import ButtonBlock from "../components/ButtonBlock";
import Colors from "../constants/Colors";
import backgroundImage from "../assets/images/backgroundLogin.png";
import { setEmail, login } from "../redux/actions/login";

const mapStateToProps = state => ({
  email: state.loginReducer.email,
  player: state.loginReducer.player,
  loading: state.loginReducer.loading
});

const mapDispatchToProps = dispatch => ({
  setEmail: text => {
    dispatch(setEmail(text));
  },
  login: (email, password) => {
    dispatch(login(email, password));
  }
});

class SigninScreen extends React.Component {
  state = {
    password: "123qwe"
  };

  static navigationOptions = {
    title: "Arenanet",
    headerTitleStyle: {
      fontWeight: "bold",
      color: Colors.dark
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.player) {
      this.props.navigation.navigate("Home");
    }
  }

  render() {
    const { navigation, email, setEmail, login } = this.props;
    return (
      <View style={styles.spinnerContainer}>
        <Spinner
          visible={this.props.loading}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
          overlayColor="rgba(0,0,0,.8)"
        />
        <ImageBackground source={backgroundImage} style={styles.background}>
          <KeyboardAvoidingView style={styles.container}>
            <Form style={styles.form}>
              <Item
                style={{ marginBottom: 10, backgroundColor: "#fff" }}
                rounded
              >
                <Icon name="ios-at" size={26} style={styles.icon} />
                <Input
                  value={email}
                  onChangeText={text => {
                    setEmail(text);
                  }}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </Item>
              <Item style={{ backgroundColor: "#fff" }} rounded>
                <Icon name="lock" size={20} style={styles.icon} />
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
            </Form>

            <ButtonBlock
              title="Signin"
              onPress={() => login(email, this.state.password)}
            />
            <ButtonBlock
              title="Create account..."
              onPress={() => navigation.navigate("Signup")}
            />
            <Button
              style={{ margin: 5 }}
              block
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.buttonText}>Forgot Password...</Text>
            </Button>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SigninScreen);

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
  },
  spinnerTextStyle: {
    color: "#fff"
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
