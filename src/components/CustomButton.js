import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MAIN_COLOR } from "../utils/color";

const CustomButton = ({ label, onPresss }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPresss}>
      <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: MAIN_COLOR,
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  btnText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
  }
});
