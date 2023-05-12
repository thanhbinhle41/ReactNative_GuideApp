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
import React, { useEffect, useState } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Blog from "../components/Blog";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../store/authSlice";

import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { loadingSliceActions } from "../store/loadingSlice";
import { blogSliceActions } from "../store/blogSlice";

const MyBlog = ({ navigation }) => {
  // STATE
  const [listBlogs, setListBlogs] = useState([]);

  const dispatch = useDispatch();

  // SELECTOR

  const user = useSelector(userSelector);

  useEffect(() => {
    const loadData = async () => {
      dispatch(loadingSliceActions.setIsLoading(true));
      const q = query(collection(db, "blog"), where("user_id", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const listBlogQuery = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        listBlogQuery.push({ ...doc.data(), id: doc.id });
      });
      setListBlogs(listBlogQuery);
      dispatch(loadingSliceActions.setIsLoading(false));
    };
    loadData();
  }, []);

  // EVENTS FUNCTIONS
  const onDelteBlog = async (blog_id) => {
    console.log(blog_id);
    await deleteDoc(doc(db, "blog", blog_id));
    dispatch(blogSliceActions.removeBlog({ id: blog_id }));

    const tmpListBlog = [...listBlogs];
    const index = tmpListBlog.findIndex((item) => item.id === blog_id);
    if (index !== -1) {
      tmpListBlog.splice(index, 1);
      setListBlogs(tmpListBlog);
    }
  };

  const onEditBlog = (blog) => {
    navigation.navigate("CreateEditScreen", { blog: blog, type: "edit" });
  };

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
            source={{ uri: user.image }}
          ></Image>
          <Text style={styles.userText}>{user.fullName}</Text>
        </View>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
          onPress={() =>
            navigation.navigate("CreateEditScreen", { type: "add" })
          }
        >
          <MaterialIcons name="add" size={25} color={"#0072C6"}></MaterialIcons>
          <Text style={{ color: "#0072C6", fontWeight: 600, fontSize: 16 }}>
            Create new blog
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        {listBlogs.length > 0 ? (
          <FlatList
            data={listBlogs}
            vertical={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index}
            renderItem={({ item }) => {
              return (
                <Blog
                  user={user}
                  blog={item}
                  rating={""}
                  showUser={false}
                  showActions={true}
                  navigation={navigation}
                  onDelteBlog={onDelteBlog}
                  onEditBlog={() => onEditBlog(item)}
                ></Blog>
              );
            }}
          />
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                color: "#ccc",
                fontSize: 24,
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              No blog? Create new now
            </Text>
          </View>
        )}
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
    borderRadius: 36 / 2,
  },
});
