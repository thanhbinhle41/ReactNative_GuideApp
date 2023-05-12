import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, TextInput } from "react-native-gesture-handler";

import Ionicons from "react-native-vector-icons/Ionicons";
import { MAIN_COLOR } from "../utils/color";
import Blog from "../components/Blog";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions, listUsersBlogSelector, userSelector } from "../store/authSlice";

import { collection, query, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { DEFAULT_IMAGE_URL } from "../utils/constant";
import { loadingSliceActions } from "../store/loadingSlice";
import { blogSliceActions, listBlogSelector } from "../store/blogSlice";


const HomeScreen = ({ navigation }) => {
  const listTabFilter = [
    { name: "All", value: "all" },
    { name: "Hà Nội", value: "ha_noi" },
    { name: "HCM", value: "hcm" },
    { name: "Đà Nẵng", value: "da_nang" },
    { name: "Thanh Hóa", value: "thanh_hoa" },
    { name: "Huế", value: "hue" },
  ];

  // STATE
  const [selectedTab, setSelectedTab] = useState(0);
  const [listBlogsSearchRes, setListBlogsSearchRes] = useState([]);

  // selector
  const user = useSelector(userSelector);
  const listUsersBlog = useSelector(listUsersBlogSelector);
  const listBlogs = useSelector(listBlogSelector);

  //dispatch
  const dispatch = useDispatch();

  // Fetch data
  const loadData = async () => {
    dispatch(loadingSliceActions.setIsLoading(true));
    const q = query(collection(db, "blog"));
    const querySnapshot = await getDocs(q);
    const listBlogQuery = [];
    querySnapshot.forEach(async (docData) => {
      // doc.data() is never undefined for query doc snapshots
      const blog = docData.data()
      listBlogQuery.unshift({...blog, id: docData.id});
      if (!listUsersBlog.hasOwnProperty(blog.user_id)) {
        const docRef = doc(db, "user", blog.user_id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const userData = {
            uid: blog.user_id,
            email: data?.email,
            fullName: data?.fullName,
            dob: data?.dob,
            phone: data?.phone ? data?.phone : "",
            country: data?.country ? data?.country : "",
            city: data?.city ? data?.city : "",
            image: data?.image ? data?.image : DEFAULT_IMAGE_URL,
          };
          dispatch(authSliceActions.addUsersBlog({ id: blog.user_id, data: userData }));
        }
      }
    });
    dispatch(blogSliceActions.setBlog(listBlogQuery));
    dispatch(loadingSliceActions.setIsLoading(false));
    setListBlogsSearchRes(listBlogQuery)
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    setListBlogsSearchRes(listBlogs);
  }, [dispatch, listBlogs])

  

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER TEXT */}

      <View>
        <Text style={styles.textHeader}>
          <Text>One </Text>
          <Text style={{ fontWeight: "bold" }}>View </Text>
          <Text>Worth</Text>
        </Text>
        <Text style={styles.textHeader}>
          <Text>a </Text>
          <Text style={{ fontWeight: "bold" }}>Thousand Words</Text>
        </Text>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search something..."
          style={styles.textInputSearch}
        ></TextInput>
        <TouchableOpacity>
          <Ionicons name="search" size={25} color={"#C6C6C6"}></Ionicons>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.listTabFilter}
        data={listTabFilter}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setSelectedTab(index)}
              style={[
                styles.itemTabFilter,
                index === selectedTab ? styles.selectedTab : "",
              ]}
            >
              <Text
                style={[
                  index === selectedTab ? styles.colorSelectedText : "",
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />


      <View style={styles.main}>
        {listBlogsSearchRes.length > 0
          ?
          <FlatList
            data={listBlogsSearchRes}
            vertical={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index}
            renderItem={({ item }) => {
              return (
                <Blog
                  user={listUsersBlog[item.user_id]}
                  blog={item}
                  rating={""}
                  navigation={navigation}
                ></Blog>
              );
            }}
          />
          :
          <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
            <Text style={{ color: "#ccc", fontSize: 24, fontStyle: 'italic', fontWeight: 500 }}>No blog? Create new now</Text>
          </View>
        }
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  header: {
    flex: 2,
  },

  // textHeader
  textHeader: {
    fontSize: 28,
  },

  // SEARCH BAR
  searchBar: {
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

  // ITEM FILTER

  listTabFilter: {
    // flex: 1,
    flexGrow: 0,
    height: 32,
  },

  itemTabFilter: {
    flexGrow: 0,
    height: 32,
    minWidth: 60,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderColor: "#C6C6C6",
    borderWidth: 1,
    borderRadius: 16,
    color: "#000",
  },

  selectedTab: {
    backgroundColor: MAIN_COLOR,
  },

  colorSelectedText: {
    color: "#fff",
  },

  // MAIN CONTENT
  main: {
    flex: 4,
    marginTop: 20
  },
});
