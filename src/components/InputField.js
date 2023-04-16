import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import React from "react";

const InputField = ({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
}) => {
  return (
    <View style={styles.viewInput}>
      {icon}
      {inputType === "password" ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={styles.input}
          secureTextEntry={true}
        ></TextInput>
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={styles.input}
          secureTextEntry={true}
        ></TextInput>
      )}

      <TouchableOpacity onPress={{fieldButtonFunction}}>
        <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  // LOGIN VIEW
  viewInput: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },
  input: {
    flex: 1,
    marginLeft: 5,
    paddingVertical: 0,
  },
});
