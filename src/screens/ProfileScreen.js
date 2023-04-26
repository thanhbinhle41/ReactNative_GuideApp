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
import { MAIN_COLOR } from "../utils/color";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={require('../assets/images/misc/pika.png')}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={styles.title}>Binh Beo Beu</Title>
            <Caption style={styles.caption}>BBB</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color={"#777777"} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            Ha Noi, Viet Nam
          </Text>
        </View>

        <View style={styles.row}>
          <Icon name="phone" color={"#777777"} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>0976466331</Text>
        </View>

        <View style={styles.row}>
          <Icon name="email" color={"#777777"} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            thanhbinhle41@gmail.com
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox, {
          borderRightColor: "#dddddd",
          borderRightWidth: 1
        }]}>
          <Title>$140</Title>
          <Caption>Wallet</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>12</Title>
          <Caption>Orders</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => { }}>
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
        </TouchableRipple>

        <TouchableRipple onPress={() => { }}>
          <View style={styles.menuItem}>
            <Icon name="account-settings-outline" color={MAIN_COLOR} size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
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
