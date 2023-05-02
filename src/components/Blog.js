import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import RatingStar from "./RatingStars";
import { MAIN_COLOR } from "../utils/color";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";

const Blog = ({
  name,
  user,
  rating,
  sourceImg,
  showUser = true,
  showActions = false,
  navigation
}) => {

  const navigateToDetails = () => {
    navigation.navigate("DetailPlaceScreen", { name: "Fuk that shit" })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.img} onPress={navigateToDetails}>
        <Image style={styles.img} resizeMode="cover" source={sourceImg}></Image>
      </TouchableOpacity>
      <View style={styles.content}>
        <TouchableOpacity onPress={navigateToDetails}>
          <Text style={styles.title}>{name}</Text>
        </TouchableOpacity>
        <View>
          <RatingStar
            initialRating={rating}
            maxRating={5}
            onRatingChange={() => { }}
          ></RatingStar>

          {showUser && (
            <View style={styles.user}>
              <Text style={styles.userText}>{user.name}</Text>
              <Image
                style={styles.imgUser}
                resizeMode="cover"
                source={user.image}
              ></Image>
            </View>
          )}

          {showActions && (
            <View style={styles.actions}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
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
  },

  // ACTIONS
  actions: {
    flexDirection: "row",
    gap: 16,
    paddingTop: 20
  }
});
