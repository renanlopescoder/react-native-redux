import React from "react";
import { Spinner } from "native-base";
import Colors from "../constants/Colors";

export default props =>
  props.loading ? (
    <Spinner
      style={{ flex: 1, justifyContent: "center" }}
      color={Colors.primary}
    />
  ) : (
    props.children
  );
