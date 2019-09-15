import React from "react";
import {
  Image,
  Platform,
  View,
  StyleSheet,
  ImageBackground
} from "react-native";
import axios from "axios";
import { connect } from "react-redux";
import {
  List,
  ListItem,
  Button,
  CardItem,
  Body,
  Left,
  Right,
  Icon,
  Text
} from "native-base";

import Loader from "../components/Loader";
import { getCharacterDetails } from "../redux/actions/characters";
import backgroundImage from "../assets/images/backgroundDetail.png";
import Colors from "../constants/Colors";

const mapStateToProps = state => ({
  characterDetails: state.characterReducer.characterDetails,
  loading: state.characterReducer.loading
});

const mapDispatchToProps = dispatch => ({
  getCharacterDetails: characterName => {
    dispatch(getCharacterDetails(characterName));
  }
});

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam("character")
  });

  componentDidMount() {
    const characterName = this.props.navigation.getParam("character");
    this.props.getCharacterDetails(characterName);
  }

  renderItem = (title, content) => (
    <ListItem>
      <Body>
        <Text style={styles.title}>{title}:</Text>
      </Body>
      <Right>
        <Text style={styles.content}>{content}</Text>
      </Right>
    </ListItem>
  );

  renderList = () => (
    <List style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
      {this.renderItem("Name", this.props.characterDetails.name)}
      {this.renderItem("Race", this.props.characterDetails.race)}
      {this.renderItem("Profession", this.props.characterDetails.profession)}
      {this.renderItem("Level", `Lvl. ${this.props.characterDetails.level}`)}
      {this.renderItem("Deaths", this.props.characterDetails.deaths)}
    </List>
  );

  render() {
    return (
      <Loader loading={this.props.loading}>
        <ImageBackground
          source={backgroundImage}
          style={{ width: "100%", height: "100%" }}
        >
          {this.renderList()}
        </ImageBackground>
      </Loader>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  titleContainer: {
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.primary
  },
  content: {
    fontSize: 15
  }
});
