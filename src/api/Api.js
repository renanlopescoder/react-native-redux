import axios from "axios";
import { AsyncStorage } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";

const gwApi = axios.create({
  baseURL: "https://api.guildwars2.com/v2"
});

const getApiKey = async () => {
  const database = firebase.firestore();
  const userId = await AsyncStorage.getItem("userId");
  const document = await database
    .collection("users")
    .doc(userId)
    .get();
  const userDetails = document.data();
  return userDetails.apiKey;
};

export { gwApi, getApiKey };
