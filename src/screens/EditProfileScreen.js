import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { MAIN_COLOR } from "../utils/color";

import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import * as ImagePicker from 'expo-image-picker';

import { db, storage } from "../../firebase";
import { useSelector } from "react-redux";
import { userSelector } from "../store/authSlice";

import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { DEFAULT_IMAGE_URL } from "../utils/constant";

const EditProfileScreen = ({ navigation }) => {
  // SELECTOR
  const user = useSelector(userSelector);
  // USE STATE
  const [profileData, setProfileData] = useState({
    fullName: "",
    phone: "",
    country: "",
    city: "",
    dob: new Date().toLocaleDateString(),
    image: DEFAULT_IMAGE_URL
  });
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const docRef = doc(db, "user", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const profileData = {
          fullName: data?.fullName,
          dob: data?.dob,
          phone: data?.phone ? data?.phone : "",
          country: data?.country ? data?.country : "",
          city: data?.city ? data?.city : "",
          image: data?.image ? data?.image : DEFAULT_IMAGE_URL,
        };
        setProfileData(profileData);
      } else {
        console.log("No such user!");
      }
    };

    loadData();
  }, []);

  // FUNCTION
  const formatDate = (date) => {
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = String(date.getUTCFullYear());

    // Format the date in "dd/mm/yy" format
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const upLoadImgFireBase = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileName = uri.substring(uri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `/user/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    let urlRes = DEFAULT_IMAGE_URL;
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        console.log(percent);
      },
      (err) => console.log(err),
      // async () => {
      //   // download url
      //   await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
      //     urlRes = url;
      //     console.log(url, "from download url")
      //   });
      // }
    );
    const alo = await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
      return url
    });
    console.log(alo)
    return urlRes;
  }

  // EVENT
  const onSubmitBtn = async () => {
    const data = { ...profileData }
    if (!data.fullName) {
      Toast.show({
        type: "error",
        text1: `Full name is required`,
      });
      return;
    }
    if (data.image !== DEFAULT_IMAGE_URL) {
      const tmpImgUrl = await upLoadImgFireBase(data.image);
      data.image = tmpImgUrl;
      console.log(tmpImgUrl)
    }
    const userRef = doc(db, "user", user.uid);
    await updateDoc(userRef, data)
      .then(() => {
        Toast.show({
          type: "success",
          text1: `Update profile successfully!`,
        });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: `Something went wrong`,
        });
      });
  };

  const onChangeDatePicker = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    setProfileData({ ...profileData, dob: formatDate(currentDate) });
  };

  const takePhotoFromCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setProfileData({ ...profileData, image: result.assets[0].uri })
      bs.current.snapTo(1)
    }

  };

  const choosePhotoFromLibrary = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setProfileData({ ...profileData, image: result.assets[0].uri })
      bs.current.snapTo(1)
    }

  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const bs = React.useRef(null);
  const fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        // renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        borderRadius={10}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 16 }}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{ uri: profileData.image }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="camera"
                    size={35}
                    color={"#fff"}
                    style={{
                      opacity: 0.7,
                      alignItems: "center",
                      justifyContent: "center",
                      borderBottomWidth: 1,
                      borderColor: "#fff",
                      borderRadius: 10,
                    }}
                  ></Icon>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} style={{ marginBottom: 10 }} />
          <TextInput
            placeholder="Full name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            value={profileData.fullName}
            onChangeText={(text) =>
              setProfileData({ ...profileData, fullName: text })
            }
          />
        </View>

        <View style={styles.action}>
          <Feather name="phone" size={20} style={{ marginBottom: 10 }} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            autoCorrect={false}
            keyboardType="number-pad"
            style={styles.textInput}
            value={profileData.phone}
            onChangeText={(text) =>
              setProfileData({ ...profileData, phone: text })
            }
          />
        </View>

        <View style={[styles.viewDatePicker, styles.action]}>
          <Ionicons name="calendar-outline" size={20}></Ionicons>
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <Text style={{ color: "#666", marginLeft: 12 }}>
              {date ? formatDate(date) : "Date of Birth"}
            </Text>
          </TouchableOpacity>
        </View>

        {showPicker && (
          <DateTimePicker
            mode={"date"}
            value={date}
            display={"spinner"}
            is24Hour={true}
            onChange={onChangeDatePicker}
          ></DateTimePicker>
        )}

        <View style={styles.action}>
          <FontAwesome name="globe" size={20} style={{ marginBottom: 10 }} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            value={profileData.country}
            onChangeText={(text) =>
              setProfileData({ ...profileData, country: text })
            }
          />
        </View>

        <View style={styles.action}>
          <Icon
            name="map-marker-outline"
            size={20}
            style={{ marginBottom: 10 }}
          />
          <TextInput
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            value={profileData.city}
            onChangeText={(text) =>
              setProfileData({ ...profileData, city: text })
            }
          />
        </View>

        <TouchableOpacity
          style={styles.commandButton}
          onPress={() => onSubmitBtn()}
        >
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: MAIN_COLOR,
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: MAIN_COLOR,
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },

  // Date picker
  viewDatePicker: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 30,
  },
});
