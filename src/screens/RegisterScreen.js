import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import RegistrationSVG from "../assets/images/misc/registration.svg";
import GoogleSVG from "../assets/images/misc/google.svg";
import FbSVG from "../assets/images/misc/facebook.svg";
import TwitterSVG from "../assets/images/misc/twitter.svg";

import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";

import DateTimePicker from "@react-native-community/datetimepicker";
import { MAIN_COLOR } from "../utils/color";

import { auth, db } from "../../firebase";
import { setDoc, doc } from "@firebase/firestore";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useDispatch } from "react-redux";
import { loadingSliceActions } from "../store/loadingSlice";

export default function RegisterScreen({ navigation }) {
  // STATE
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [regiterData, setRegiterData] = useState({
    email: "",
    fullName: "",
    dob: new Date().toLocaleDateString(),
    password: "",
    cfPassword: "",
  });

  // dispatch
  const dispatch = useDispatch();


  // EVENT
  const onChangeDatePicker = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    setRegiterData({ ...regiterData, dob: formatDate(currentDate) });
  };

  // FUNCTION
  const formatDate = (date) => {
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = String(date.getUTCFullYear());

    // Format the date in "dd/mm/yy" format
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const saveUserToFireStore = (id) => {
    dispatch(loadingSliceActions.setIsLoading(true));
    const docRef = doc(db, "user", id);
    const data = {
      fullName: regiterData.fullName,
      dob: regiterData.dob,
      email: regiterData.email,
    };
    setDoc(docRef, data).then(() => {
      dispatch(loadingSliceActions.setIsLoading(false));
      Toast.show({
        type: "success",
        text1: "Register successfully",
      });
      navigation.goBack();
    });
  };

  const handleSignUp = () => {
    if (regiterData.password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Password has at least 6 characters",
      });
      return;
    }
    if (regiterData.password !== regiterData.cfPassword) {
      Toast.show({
        type: "error",
        text1: "Confirm Password does not match your password",
      });
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      regiterData.email,
      regiterData.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        saveUserToFireStore(user.uid);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Toast.show({
            type: "error",
            text1: "That email address is already in use!",
          });
        }

        if (error.code === "auth/invalid-email") {
          Toast.show({
            type: "error",
            text1: "That email address is invalid!",
          });
        }
      });
  };

  const activeBtnRegister =
    !regiterData.fullName ||
    !regiterData.email ||
    !regiterData.password ||
    !regiterData.cfPassword;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <View style={{ alignItems: "center" }}>
          <RegistrationSVG
            height={300}
            width={300}
            style={{ transform: [{ rotate: "-5deg" }] }}
          ></RegistrationSVG>
        </View>
        <Text style={styles.textLogin}>Register</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity onPress={() => {}} style={styles.otherLoginIcon}>
            <GoogleSVG height={24} width={24}></GoogleSVG>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={styles.otherLoginIcon}>
            <FbSVG height={24} width={24}></FbSVG>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={styles.otherLoginIcon}>
            <TwitterSVG height={24} width={24}></TwitterSVG>
          </TouchableOpacity>
        </View>

        <Text style={styles.loginWithText}>Or, register with email...</Text>

        <InputField
          label={"Full name"}
          icon={
            <Ionicons name="person-outline" size={20} color={"#666"}></Ionicons>
          }
          value={regiterData.fullName}
          onChange={(text) =>
            setRegiterData({ ...regiterData, fullName: text })
          }
        ></InputField>

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
          value={regiterData.email}
          onChange={(text) => setRegiterData({ ...regiterData, email: text })}
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
          value={regiterData.password}
          onChange={(text) =>
            setRegiterData({ ...regiterData, password: text })
          }
        ></InputField>

        <InputField
          label={"Confirm password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color={"#666"}
            ></Ionicons>
          }
          inputType={"password"}
          value={regiterData.cfPassword}
          onChange={(text) =>
            setRegiterData({ ...regiterData, cfPassword: text })
          }
        ></InputField>

        <View style={styles.viewDatePicker}>
          <Ionicons name="calendar-outline" size={20} color={"#666"}></Ionicons>
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <Text style={{ color: "#666", marginLeft: 5 }}>
              {date ? formatDate(date) : "Date of Birth"}
            </Text>
          </TouchableOpacity>
        </View>

        {showPicker && (
          <DateTimePicker
            mode={"date"}
            value={date}
            display={"spinner"}
            is24Hour={true}
            onChange={onChangeDatePicker}
          ></DateTimePicker>
        )}

        <CustomButton
          label={"Register"}
          onPresss={() => handleSignUp()}
          disabled={activeBtnRegister}
        ></CustomButton>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Already registered? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.registerText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

  // Date picker
  viewDatePicker: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 30,
  },
});
