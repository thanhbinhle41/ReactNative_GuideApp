import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Ionicons from "react-native-vector-icons/Ionicons";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MyBlog from "../screens/MyBlog";
import NotificationsScreen from "../screens/NotificationsScreen";
import { MAIN_COLOR } from "../utils/color";
import { useTheme } from "react-native-paper";
import EditProfileScreen from "../screens/EditProfileScreen";

const Tab = createBottomTabNavigator();

const ProfileStack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: MAIN_COLOR },
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "#FFFF00",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size}></Ionicons>
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="MyBlog"
        component={MyBlog}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="newspaper-outline"
              color={color}
              size={size}
            ></Ionicons>
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarBadge: 3,
          tabBarBadgeStyle: {backgroundColor: 'red'},
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="notifications-outline"
              color={color}
              size={size}
            ></Ionicons>
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarColor: "#694fad",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              color={color}
              size={size}
            ></Ionicons>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;

const ProfileStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}
    >
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "",
          headerRight: () => (
            <View>
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={25}
                backgroundColor={"#fff"}
                color={'#333333'}
                onPress={() => navigation.navigate("EditProfile")}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: "Edit Profile",
        }}
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};
