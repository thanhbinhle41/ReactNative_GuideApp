import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { MAIN_COLOR } from "../utils/color";

import Ionicons from "react-native-vector-icons/Ionicons";

const InputField = ({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChange,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(true);

  return (
    <View style={styles.viewInput}>
      {icon}
      {inputType === "password" ? (
        <>
          <TextInput
            placeholder={label}
            keyboardType={keyboardType}
            style={styles.input}
            secureTextEntry={isShowPassword}
            value={value}
            onChangeText={(text) => onChange(text)}
          ></TextInput>
          <TouchableOpacity style={{marginEnd: 10}} onPress={() => setIsShowPassword(!isShowPassword)}>
            {!isShowPassword ? (
              <Ionicons name="eye" size={20} color={"#ccc"}></Ionicons>
            ) : (
              <Ionicons name="eye-off" size={20} color={"#ccc"}></Ionicons>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={styles.input}
          value={value}
          onChangeText={(text) => onChange(text)}
        ></TextInput>
      )}

      <TouchableOpacity onPress={{ fieldButtonFunction }}>
        <Text style={{ color: MAIN_COLOR, fontWeight: "700" }}>
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
