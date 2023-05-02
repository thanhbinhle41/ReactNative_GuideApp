import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MAIN_COLOR } from "../utils/color";

const CustomButton = ({ label, onPresss, disabled = false }) => {
  return (
    <TouchableOpacity style={[styles.btn, (disabled ? styles.disabledBtn : "")]} onPress={onPresss} disabled={disabled}>
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
  },
  disabledBtn: {
    opacity: 0.8
  }
});
