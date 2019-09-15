import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Alert,
  AsyncStorage
} from "react-native";
import axios from "axios";
import { apiUrl, apiKey, getApiImage, database } from "../services/Api";
import Colors from "../constants/Colors";
import {
  List,
  ListItem,
  Left,
  Right,
  Icon,
  Thumbnail,
  Body,
  Form,
  Item,
  Input,
  Label,
  Divider
} from "native-base";
import Loader from "../components/Loader";
import SearchForm from "../components/SearchForm";
import * as firebase from "firebase";
import "firebase/firestore";
import { connect } from "react-redux";

import { getCharacters } from "../redux/actions/characters";

const mapStateToProps = state => ({
  characters: state.characterReducer.characters,
  loading: state.characterReducer.loading
});

const mapDispatchToProps = dispatch => ({
  getCharacters: () => {
    dispatch(getCharacters());
  }
});
class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Characters"
  };

  componentDidMount() {
    this.props.getCharacters();
  }

  // async componentDidMount() {
  //   const database = firebase.firestore();
  //   const userId = await AsyncStorage.getItem("userId");
  //   const document = await database
  //     .collection("users")
  //     .doc(userId)
  //     .get();
  //   const userDetails = document.data();

  //   const result = await getCharacters(userDetails.apiKey);
  // }

  _renderItem = character => {
    const key = Math.random();
    return (
      <ListItem
        key={key}
        onPress={() => {
          this.props.navigation.navigate("Details", {
            character
          });
        }}
      >
        <Body>
          <Text>{character}</Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  };

  render() {
    return (
      <>
        <Loader loading={this.props.loading}>
          <ScrollView style={styles.container}>
            <List>
              {this.props.characters.map(character =>
                this._renderItem(character)
              )}
            </List>
          </ScrollView>
        </Loader>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  formContainer: {
    padding: 15
  }
});
