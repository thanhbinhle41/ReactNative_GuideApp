import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../store/authSlice";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { MAIN_COLOR } from "../utils/color";
import Feather from "react-native-vector-icons/Feather";

import * as ImagePicker from "expo-image-picker";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, collection, updateDoc, doc } from "@firebase/firestore";
import { db, storage } from "../../firebase";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { loadingSliceActions } from "../store/loadingSlice";
import { blogSliceActions } from "../store/blogSlice";

let countImages = 0;
let listUrlImgs = [];
let listNameImgs = []

const CreateEditScreen = ({ navigation, route }) => {
  // SELECTOR
  const user = useSelector(userSelector);

  const dispatch = useDispatch();

  // STATE
  const [blogData, setBlogData] = useState({
    about: "",
    name: "",
    transport: "",
    interesting: "",
    image: [],
    user_id: user?.uid ? user?.uid : "",
  });
  const [listImg, setListImg] = useState([]);

  // USE EFFECT
  useEffect(() => {
    const type = route.params?.type ? route.params?.type : "";
    if (type === "edit") {
      const blog = route.params?.blog ? route.params?.blog : {};
      setBlogData(blog);
      setListImg(blog?.image ? blog?.image : []);
    }
  }, [route])

  // EVENTS
  const onPostBlog = async () => {
    if (listImg.length === 0) {
      Toast.show({
        type: "error",
        text1: `Please upload images`,
      });
      return;
    }
    dispatch(loadingSliceActions.setIsLoading(true));
    await uploadImgFireBase();

    // const promise = listImg.map(async (uri) => {
    //   const response = await fetch(uri);
    //   const blob = await response.blob();
    //   const fileName = uri.substring(uri.lastIndexOf("/") + 1);
    //   return await uploadImageAsPromise(blob, fileName);
    // });
    // Promise.all(promise).then((values) => {
    //   console.log("done");
    // });
    // console.log("done")
  };

  const uploadImageAsPromise = (file, fileName) => {
    return new Promise(function (resolve, reject) {
      const storageRef = ref(storage, `/blog/${fileName}`);

      //Upload file
      const uploadTask = uploadBytesResumable(storageRef, file);

      //Update progress bar
      uploadTask.on(
        "state_changed",
        function progress(snapshot) {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percentage);
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
          });
        }
      );
    });
  };

  // FUNCTIONS
  const uploadImgFireBase = async () => {
    listImg.forEach(async (uri, index) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      let fileName = uri.substring(uri.lastIndexOf("/") + 1);
      if (route.params?.type === "edit") {
        fileName = `${blogData?.id}_${index}.` + `jpeg`
      } 
      const storageRef = ref(storage, `/blog/${fileName}`);
      uploadBytes(storageRef, blob).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          addUrlImage(downloadURL, fileName);
        });
      });
    });
  };

  const addUrlImage = (url, fileName) => {
    countImages = countImages + 1;
    listUrlImgs.push(url);
    listNameImgs.push(fileName);
    if (countImages === listImg.length) {
      const tmpListImgs = [...listUrlImgs, url];
      const resBlogData = { ...blogData, image: tmpListImgs, imageName: [...listNameImgs, fileName] };
      if (route.params?.type === "add") {
        uploadDataBlog(resBlogData);
      }
      else if (route.params?.type === "edit") {
        updateBlog(resBlogData)
      }
    }
  };

  const uploadDataBlog = (data) => {
    const blogRef = collection(db, "blog");
    addDoc(blogRef, data)
      .then(() => {
        dispatch(blogSliceActions.addBlog(data));
        dispatch(loadingSliceActions.setIsLoading(false));
        Toast.show({
          type: "success",
          text1: `Post blog successfully!`,
        });
        navigation.goBack();
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: `Something went wrong`,
        });
        console.log(error);
      });
    countImages = 0;
    listUrlImgs = [];
  };

  const updateBlog = (data) => {
    const docRef = doc(db, "blog", data.id);
    updateDoc (docRef, data)
      .then(() => {
        dispatch(blogSliceActions.updateBlog({id: data.id, updatedItem: data}));
        dispatch(loadingSliceActions.setIsLoading(false));
        Toast.show({
          type: "success",
          text1: `Update blog successfully!`,
        });
        navigation.goBack();
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: `Something went wrong`,
        });
        console.log(error);
      });
    countImages = 0;
    listUrlImgs = [];
  };

  const choosePhotoFromLibrary = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const resListImg = [];
      result.assets.forEach((image) => {
        resListImg.push(image.uri);
      });
      setListImg(resListImg);
      // setBlogData({ ...blogData, image: resListImg })
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textHeader}>{route.params?.type === "add" ? `Create own new blog` : "Edit the blog"}</Text>
      <View style={styles.info}>
        <View style={styles.user}>
          <Image
            style={styles.imgUser}
            resizeMode="cover"
            source={{ uri: user.image }}
          ></Image>
          <Text style={styles.userText}>{user.fullName}</Text>
        </View>
      </View>

      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 12 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#000000",
              marginBottom: 10,
              fontStyle: "italic",
            }}
          >
            What's the name of the place where you go?
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Enter text"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInput}
              value={blogData.name}
              multiline={true}
              onChangeText={(text) => setBlogData({ ...blogData, name: text })}
            />
          </View>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#000000",
              marginBottom: 10,
              fontStyle: "italic",
            }}
          >
            Tell us about the place
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Enter text"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInput}
              value={blogData.about}
              multiline={true}
              onChangeText={(text) => setBlogData({ ...blogData, about: text })}
            />
          </View>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#000000",
              marginBottom: 10,
              fontStyle: "italic",
            }}
          >
            Share images to us
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 8,
            }}
            onPress={choosePhotoFromLibrary}
          >
            <Text style={{ color: MAIN_COLOR, marginEnd: 8 }}>
              Upload image
            </Text>
            <Ionicons
              name="cloud-upload-outline"
              size={20}
              color={MAIN_COLOR}
            ></Ionicons>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: "center",
            }}
          >
            {listImg.map((item, index) => {
              return (
                <View key={index} style={{ flexBasis: "33%", marginTop: 4 }}>
                  <ImageBackground
                    style={styles.imageThumbnail}
                    source={{ uri: item }}
                    resizeMode="cover"
                  >
                    <TouchableOpacity
                      style={{
                        // flex: 1,
                        justifyContent: "flex-start",
                        alignItems: "flex-end",
                      }}
                      onPress={() => {
                        const newData = [...listImg];
                        newData.splice(index, 1);
                        setListImg(newData);
                      }}
                    >
                      <Feather
                        name="x"
                        size={28}
                        color={"#fff"}
                        style={{
                          opacity: 0.7,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 10,
                        }}
                      />
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#000000",
              marginBottom: 10,
              fontStyle: "italic",
            }}
          >
            What means of transport do you use?
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Enter text"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInput}
              value={blogData.transport}
              multiline={true}
              onChangeText={(text) =>
                setBlogData({ ...blogData, transport: text })
              }
            />
          </View>
        </View>
        <View style={{ marginTop: 12 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#000000",
              marginBottom: 10,
              fontStyle: "italic",
            }}
          >
            What's interesting
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Enter text"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInput}
              value={blogData.interesting}
              multiline={true}
              onChangeText={(text) =>
                setBlogData({ ...blogData, interesting: text })
              }
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            marginBottom: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => onPostBlog()}
            style={{
              height: 50,
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
              alignItems: "center",
              backgroundColor: MAIN_COLOR,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              {route.params?.type === "add" ? "P O S T   B L O G   N O W" : "U P D A T E   B L O G   N O W"}
            </Text>
            <Ionicons name="newspaper-outline" color={"#fff"} size={25} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  // textHeader
  textHeader: {
    marginTop: 32,
    marginBottom: 20,
    fontSize: 28,
    fontWeight: 600,
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
    fontWeight: 600,
    color: "#5DADEC",
  },
  imgUser: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
  },

  // MAIN
  main: {
    flex: 4,
    marginTop: 12,
  },

  // action
  action: {
    marginTop: 10,
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 12,
  },
  textInput: {
    flex: 1,
    color: "#05375a",
    fontSize: 16,
  },

  // image
  imageThumbnail: {
    height: 125,
  },
});
