import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import RatingStar from "./RatingStars";
import { MAIN_COLOR } from "../utils/color";

const Blog = ({ name, user, rating, sourceImg }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} resizeMode="cover" source={sourceImg}></Image>
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <View>
          <RatingStar
            initialRating={rating}
            maxRating={5}
            onRatingChange={() => {}}
          ></RatingStar>

          <View style={styles.user}>
            <Text style={styles.userText}>{user.name}</Text>
            <Image
              style={styles.imgUser}
              resizeMode="cover"
              source={user.image}
            ></Image>
          </View>
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
    fontStyle: 'italic', 
    fontWeight: 700,
    color: "#5DADEC"
  },
  imgUser: {
    width: 36,
    height: 36,
  },
});
