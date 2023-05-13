import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";

import RatingStar from "./RatingStars";
import { MAIN_COLOR } from "../utils/color";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";

import { loadingSliceActions } from "../store/loadingSlice";
import { useDispatch } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Blog = ({
  user,
  rating,
  blog,
  showUser = true,
  showActions = false,
  navigation,
  onDelteBlog,
  onEditBlog
}) => {

  const dispatch = useDispatch();

  const navigateToDetails = () => {
    navigation.navigate("DetailPlaceScreen", { blog: blog })
  }
  
  // RENDER
  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      `Are you sure you want to delete blog ${blog?.name} ?`,
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: async () => {
            // dispatch(loadingSliceActions.setIsLoading(true));
            await onDelteBlog(blog.id);
            Toast.show({
              type: "success",
              text1: `Delete blog ${blog?.name} successfully!`,
            });
            dispatch(loadingSliceActions.setIsLoading(false));
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.img} onPress={navigateToDetails}>
        <Image style={styles.img} resizeMode="cover" source={{ uri: blog?.image ? blog?.image[0] : "" }}></Image>
      </TouchableOpacity>
      <View style={styles.content}>
        <TouchableOpacity onPress={navigateToDetails}>
          <Text style={styles.title}>{blog.name}</Text>
        </TouchableOpacity>
        <View>
          <RatingStar
            initialRating={4}
            maxRating={5}
            onRatingChange={() => { }}
          ></RatingStar>

          {showUser && (
            <View style={styles.user}>
              <Text style={styles.userText}>{user?.fullName}</Text>
              <Image
                style={styles.imgUser}
                resizeMode="cover"
                source={{ uri: user?.image }}
              ></Image>
            </View>
          )}

          {showActions && (
            <View style={styles.actions}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
                onPress={onEditBlog}
              >
                <MaterialIcons
                  name="edit"
                  size={16}
                  color={"#0072C6"}
                ></MaterialIcons>
                <Text
                  style={{ color: "#0072C6", fontWeight: 600, fontSize: 14 }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
                onPress={() => showConfirmDialog()}
              >
                <Feather
                  name="trash-2"
                  size={16}
                  color={"#FF0000"}
                ></Feather>
                <Text
                  style={{ color: "#FF0000", fontWeight: 600, fontSize: 14 }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Blog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "#C6C6C6",
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 30,
    height: 310,
  },
  img: {
    width: "100%",
    height: 200,
    maxHeight: 200,
    borderRadius: 16,
  },
  // CONTENT
  content: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    fontStyle: "italic",
    color: MAIN_COLOR,
  },

  // USER
  user: {
    paddingTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userText: {
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: 700,
    color: "#5DADEC",
  },
  imgUser: {
    width: 36,
    height: 36,
    borderRadius: 50
  },

  // ACTIONS
  actions: {
    flexDirection: "row",
    gap: 16,
    paddingTop: 20
  }
});
