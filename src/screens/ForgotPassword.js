import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import InputField from "../components/InputField";
import LoginSVG from "../assets/images/misc/login.svg";
import CustomButton from "../components/CustomButton";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const onForgotPassword = () => {
    if (email.trim() === "") {
      Toast.show({
        type: "error",
        text1: `Please enter your email address !!`,
      });
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Signed in
        Toast.show({
          type: "success",
          text1: `Check your email now!`,
        });
        navigation.navigate("Login");

      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: `Something went wrong!`,
        });
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <LoginSVG
          height={300}
          width={300}
          style={{ transform: [{ rotate: "-5deg" }] }}
        ></LoginSVG>
      </View>
      <Text style={styles.textLogin}>Forgot Password</Text>
      <InputField
        label={"Email"}
        icon={
          <MaterialIcons
            name="alternate-email"
            size={20}
            color={"#666"}
          ></MaterialIcons>
        }
        keyboardType={"email-address"}
        value={email}
        onChange={(text) => setEmail(text)}
      ></InputField>
      <View style={{ marginTop: 20, width: "100%" }}>
        <CustomButton
          label={"Send password to email"}
          onPresss={onForgotPassword}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
  },
  textLogin: {
    // fontFamily: 'Roboto-Bold',
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
    marginBottom: 30,
  },
});
