import React from "React";
import { StyleSheet } from "react-native";
import { Icon, Form, Item, Input } from "native-base";

import Colors from "../constants/Colors";

export default props => (
  <Form style={styles.formContainer}>
    <Item rounded>
      <Icon
        name="search"
        size={26}
        style={{ marginBottom: -3, color: Colors.tintColor }}
      />
      <Input
        placeholder="Search"
        onChangeText={searchText =>
          props.search(`/search/movie?query=${searchText}&`, 2000)
        }
      />
    </Item>
  </Form>
);

const styles = StyleSheet.create({
  formContainer: {
    padding: 15
  }
});
