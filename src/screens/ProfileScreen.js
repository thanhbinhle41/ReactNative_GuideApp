import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MAIN_COLOR } from "../utils/color";

import { useSelector } from "react-redux";
import { userSelector } from "../store/authSlice";
import { auth } from "../../firebase";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { saveAccessToken } from "../utils/utils";
import { signOut } from "@firebase/auth";
import { listMyBlogSelector } from "../store/blogSlice";

const ProfileScreen = ({ navigation }) => {
  // SELECTOR
  const user = useSelector(userSelector);
  const listMyBlog = useSelector(listMyBlogSelector);

  const formatNickName = (fullName) => {
    let initials = "";
    const nameArray = fullName.split(" ");

    for (let i = 0; i < nameArray.length; i++) {
      initials += nameArray[i].charAt(0).toUpperCase();
    }
    return initials;
  };

  // EVENTS

  const onLogOut = () => {
    signOut(auth).then(async () => {
      // Sign-out successful.
      await saveAccessToken("");
      Toast.show({
        type: "success",
        text1: `Sign out successfully!`,
      });
      navigation.navigate("Login")

    }).catch((error) => {
      // An error happened.
      Toast.show({
        type: "error",
        text1: `Sign out unsuccessfully!`,
      });
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{ uri: user.image }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={styles.title}>{user.fullName}</Title>
            <Caption style={styles.caption}>{formatNickName(user.fullName)}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color={"#777777"} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {`${user.city}, ${user.country}`}
          </Text>
        </View>

        <View style={styles.row}>
          <Icon name="phone" color={"#777777"} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{user.phone}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="email" color={"#777777"} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {user.email}
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <View>
            <Title>{listMyBlog.length}</Title>
          </View>
          <Caption>Blogs</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>120</Title>
          <Caption>Rating</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        {/* <TouchableRipple onPress={() => { }}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color={MAIN_COLOR} size={25} />
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => { }}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color={MAIN_COLOR} size={25} />
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => { }}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color={MAIN_COLOR} size={25} />
            <Text style={styles.menuItemText}>Tell your friends</Text>
          </View>
        </TouchableRipple> */}

        <TouchableRipple onPress={() => { }}>
          <View style={styles.menuItem}>
            <Icon
              name="account-settings-outline"
              color={MAIN_COLOR}
              size={25}
            />
            <Text style={styles.menuItemText}>Change password</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => onLogOut()}>
          <View style={styles.menuItem}>
            <Ionicons
              name="log-out-outline"
              color={MAIN_COLOR}
              size={25}
            />
            <Text style={styles.menuItemText}>Sign out</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
