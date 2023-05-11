import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { userSelector } from '../store/authSlice'

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { MAIN_COLOR } from '../utils/color';
import Feather from 'react-native-vector-icons/Feather';

import * as ImagePicker from "expo-image-picker";

const CreateEditScreen = ({ navigation }) => {

	// SELECTOR
	const user = useSelector(userSelector)

	// STATE
	const [blogData, setBlogData] = useState({
		about: "",
		name: "",
		transport: "",
		interesting: "",
		image: []
	})
	const [listImg, setListImg] = useState([]);

	// EVENTS 
	const onPostBlog = async () => {
		const resListImgUri = await uploadImgFireBase();
		const resBlogData = {...blogData, image: resListImgUri};
		
	}

	// FUNCTIONS
	const uploadImgFireBase = async () => {
		const listImageTmp = [];

		listImg.forEach(async (uri) => {
			const response = await fetch(uri);
			const blob = await response.blob();
			const fileName = uri.substring(uri.lastIndexOf("/") + 1);
			const storageRef = ref(storage, `/user/${fileName}`);
			const uploadTask = uploadBytesResumable(storageRef, blob);

			await uploadTask.on(
				"state_changed",
				(snapshot) => {
					const percent = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);

					// update progress
					console.log(percent);
				},
				(err) => console.log(err),
				async () => {
					// download url
					await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
						listImageTmp.push(url);
					});
				}
			);
		})

		return listImageTmp;
	};

	const uploadDataProfile = async (data) => {
    const blogRef = doc(db, "blog");
    await updateDoc(blogRef, data)
      .then(() => {
        Toast.show({
          type: "success",
          text1: `Post blog successfully!`,
        });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: `Something went wrong`,
        });
        console.log(error);
      });
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
			quality: 1
		});

		if (!result.canceled) {
			const resListImg = [];
			result.assets.forEach(image => {
				resListImg.push(image.uri);
			})
			setListImg(resListImg);
			// setBlogData({ ...blogData, image: resListImg })
		}
	};


	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.textHeader}>Create own new blog</Text>
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
							fontStyle: 'italic'
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
							fontStyle: 'italic'
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
							fontStyle: 'italic'
						}}
					>
						Share images to us
					</Text>
					<TouchableOpacity
						style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 8 }}
						onPress={choosePhotoFromLibrary}
					>
						<Text style={{ color: MAIN_COLOR, marginEnd: 8 }}>Upload image</Text>
						<Ionicons
							name="cloud-upload-outline"
							size={20}
							color={MAIN_COLOR}
						></Ionicons>
					</TouchableOpacity>
					<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 1, justifyContent: "center" }}>
						{listImg.map((item, index) => {
							return (
								<View
									key={index}
									style={{ flexBasis: '33%', marginTop: 4 }}>
									<ImageBackground style={styles.imageThumbnail} source={{ uri: item }} resizeMode='cover'>
										<TouchableOpacity
											style={{
												// flex: 1,
												justifyContent: "flex-start",
												alignItems: "flex-end",
											}}
											onPress={() => {
												const newData = [...listImg];
												newData.splice(index, 1);
												setListImg(newData)
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
							)
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
							fontStyle: 'italic'
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
							onChangeText={(text) => setBlogData({ ...blogData, transport: text })}
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
							fontStyle: 'italic'
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
							onChangeText={(text) => setBlogData({ ...blogData, interesting: text })}
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
							{"P O S T   B L O G   N O W"}
						</Text>
						<Ionicons
							name="newspaper-outline"
							color={"#fff"}
							size={25}
						/>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default CreateEditScreen

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
		borderRadius: 36 / 2
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
		fontSize: 16
	},

	// image
	imageThumbnail: {
		height: 125,
	},
})