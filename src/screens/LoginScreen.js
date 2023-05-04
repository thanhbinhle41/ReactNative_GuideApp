import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import LoginSVG from "../assets/images/misc/login.svg";
import GoogleSVG from "../assets/images/misc/google.svg";
import FbSVG from "../assets/images/misc/facebook.svg";
import TwitterSVG from "../assets/images/misc/twitter.svg";

import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { MAIN_COLOR } from "../utils/color";

import Toast from "react-native-toast-message";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { useDispatch } from "react-redux";
import { authSliceActions } from "../store/authSlice";

import { doc, getDoc } from "@firebase/firestore";
import { auth, db } from "../../firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const loadData = async (uid, email) => {
    const docRef = doc(db, "user", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const userData = {
        uid: uid,
        email: email,
        fullName: data?.fullName,
        dob: data?.dob,
        phone: data?.phone ? data?.phone : "",
        country: data?.country ? data?.country : "",
        city: data?.city ? data?.city : "",
        image: data?.image ? data?.image : DEFAULT_IMAGE_URL,
      };
      dispatch(authSliceActions.setUser(userData));
    } else {
      console.log("No such user!");
    }
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        await loadData(user.uid, user.email);

        navigation.navigate("TabNavigator", { screen: "Home" });
      })
      .catch((error) => {
        const errorCode = error.code;
        let textError = errorCode.split("/")[1].split("-").join(" ");
        Toast.show({
          type: "error",
          text1: `Login failed: ` + textError,
        });
      });
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    

    console.log(provider, auth);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <LoginSVG
            height={300}
            width={300}
            style={{ transform: [{ rotate: "-5deg" }] }}
          ></LoginSVG>
        </View>
        <Text style={styles.textLogin}>Login</Text>

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

        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color={"#666"}
            ></Ionicons>
          }
          inputType={"password"}
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => {}}
          value={password}
          onChange={(text) => setPassword(text)}
        ></InputField>

        <CustomButton
          label={"Login"}
          onPresss={() => {
            handleLogin();
          }}
        ></CustomButton>

        <Text style={styles.loginWithText}>Or, login with...</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={signInWithGoogle}
            style={styles.otherLoginIcon}
          >
            <GoogleSVG height={24} width={24}></GoogleSVG>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={styles.otherLoginIcon}>
            <FbSVG height={24} width={24}></FbSVG>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={styles.otherLoginIcon}>
            <TwitterSVG height={24} width={24}></TwitterSVG>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 30,
        }}
      >
        <Text>New to the app? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  textLogin: {
    // fontFamily: 'Roboto-Bold',
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
    marginBottom: 30,
  },

  loginWithText: {
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },

  // otherLoginIcon
  otherLoginIcon: {
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  // REGISTER
  registerText: {
    color: MAIN_COLOR,
    fontWeight: "700",
  },
});
