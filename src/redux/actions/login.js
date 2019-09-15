import { AsyncStorage } from "react-native";
import { Toast } from "native-base";
import { NavigationActions } from "react-navigation";
import * as firebase from "firebase";

const toastConfig = {
  buttonText: "Okay",
  duration: 3000
};

const updateEmail = email => ({
  type: "SET_EMAIL",
  payload: email
});

const startLoginPlayer = () => ({
  type: "LOGIN_PLAYER"
});

const loginPlayer = player => ({
  type: "LOGIN_PLAYER_FULLFILED",
  payload: player
});

export const setEmail = email => dispatch => {
  dispatch(updateEmail(email));
};

export const login = (email, password) => async dispatch => {
  dispatch(startLoginPlayer());
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    await AsyncStorage.setItem("userId", response.user.uid);
    dispatch(loginPlayer(response.user));
  } catch (error) {
    toastConfig.text = error.message;
    toastConfig.type = "warning";
    Toast.show(toastConfig);
  }
};
