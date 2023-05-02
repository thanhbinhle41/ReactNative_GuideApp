import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { MAIN_COLOR } from "../utils/color";

const Spinner = ({ animating = true, color = MAIN_COLOR }) => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator animating={animating} size={"large"} color={color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Spinner;
