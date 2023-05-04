import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { MAIN_COLOR } from "../utils/color";
import Blog from "../components/Blog";
import { useSelector } from "react-redux";
import { userSelector } from "../store/authSlice";

const MyBlog = () => {
  const listBlog = [
    {
      name: "Tam đảo - Vĩnh Phúc",
      rating: 4,
      user: {
        name: "Binh Beo Beu",
        image: require("../assets/images/misc/user.png"),
      },
      sourceImg: require("../assets/images/background/tamDao.jpg"),
    },
    {
      name: "Tam đảo - Vĩnh Phúc",
      rating: 4,
      user: {
        name: "Binh Beo Beu",
        image: require("../assets/images/misc/user.png"),
      },
      sourceImg: require("../assets/images/background/tamDao.jpg"),
    },
    {
      name: "Tam đảo - Vĩnh Phúc",
      rating: 4,
      user: {
        name: "Binh Beo Beu",
        image: require("../assets/images/misc/user.png"),
      },
      sourceImg: require("../assets/images/background/tamDao.jpg"),
    },
    {
      name: "Tam đảo - Vĩnh Phúc",
      rating: 4,
      user: {
        name: "Binh Beo Beu",
        image: require("../assets/images/misc/user.png"),
      },
      sourceImg: require("../assets/images/background/tamDao.jpg"),
    },
  ];

  const user = useSelector(userSelector);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER TEXT */}
      <Text style={styles.textHeader}>My Blog</Text>

      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search something..."
          style={styles.textInputSearch}
        ></TextInput>
        <TouchableOpacity>
          <Ionicons name="search" size={25} color={"#C6C6C6"}></Ionicons>
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <View style={styles.user}>
          <Image
            style={styles.imgUser}
            resizeMode="cover"
            source={{uri: user.image}}
          ></Image>
          <Text style={styles.userText}>{user.fullName}</Text>
        </View>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
        >
          <MaterialIcons name="add" size={25} color={"#0072C6"}></MaterialIcons>
          <Text style={{ color: "#0072C6", fontWeight: 600, fontSize: 16 }}>
            Create new blog
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <FlatList
          data={listBlog}
          vertical={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index}
          renderItem={({ item }) => {
            return (
              <Blog
                name={item.name}
                sourceImg={item.sourceImg}
                rating={item.rating}
                user={item.user}
                showUser={false}
                showActions={true}
              ></Blog>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyBlog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  header: {
    flex: 2,
    flexDirection: "column",
  },

  // textHeader
  textHeader: {
    fontSize: 28,
    fontWeight: 600,
  },

  // SEARCH BAR
  searchBar: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  textInputSearch: {
    flex: 1,
    fontSize: 16,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: "#C6C6C6",
    borderWidth: 1,
    borderRadius: 16,
  },

  colorSelectedText: {
    color: "#fff",
  },

  // MAIN CONTENT
  main: {
    flex: 4,
    marginTop: 12,
  },

  // INFO
  info: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userText: {
    fontSize: 16,
    fontWeight: 700,
    color: "#5DADEC",
  },
  imgUser: {
    width: 36,
    height: 36,
    borderRadius: 36/2
  },
});
