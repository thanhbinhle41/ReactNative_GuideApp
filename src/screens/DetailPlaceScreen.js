import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import HeaderBar from "../components/HeaderBar";
import RatingStar from "../components/RatingStars";

import { MAIN_COLOR } from "../utils/color";

import Carousel from "react-native-snap-carousel";
import BannerSlider from "../components/BannerSlider";
import { windowWidth } from "../utils/Dimensions";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DetailPlaceScreen = ({ route, navigation }) => {
  const blog = route.params.blog;

  const sliderData = blog?.image.map((image) => {
    return { image: { uri: image } };
  });

  const renderBanner = ({ item }) => {
    return <BannerSlider data={item} />;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          style={{
            flex: 1,
            width: "100%",
            height: 250,
            maxHeight: 250,
          }}
          source={{ uri: blog?.image[0] }}
        >
          <HeaderBar
            title={""}
            leftOnPresed={() => navigation.goBack()}
            right={false}
            containerStyle={{
              marginTop: 30,
            }}
          ></HeaderBar>
        </ImageBackground>

        {/* MAIN */}
        <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: MAIN_COLOR,
              marginBottom: 10,
            }}
          >
            {"Tam dao - Vinh Phuc"}
          </Text>

          <RatingStar
            initialRating={4}
            maxRating={5}
            onRatingChange={() => {}}
          ></RatingStar>
        </View>
        <View style={{ marginTop: 20 }}>
          <Carousel
            data={sliderData}
            renderItem={renderBanner}
            sliderWidth={windowWidth}
            itemWidth={300}
            loop={true}
            autoplay={true}
            autoplayInterval={5000}
          />
        </View>

        {/* TEXT */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          {/* ABOUT TEXT */}
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#000000",
                marginBottom: 10,
              }}
            >
              About
            </Text>
            <Text
              style={{
                textAlign: "justify",
              }}
            >
              {`\t\t\t${blog?.about}`}
            </Text>
          </View>

          {/* TRANSPORT TEXT */}
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#000000",
                marginBottom: 10,
              }}
            >
              Transport
            </Text>
            <Text
              style={{
                textAlign: "justify",
              }}
            >
              {`\t\t\t${blog?.transport}`}
            </Text>
          </View>

          {/* WHAT'S INTERESTING TEXT */}
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#000000",
                marginBottom: 10,
              }}
            >
              What's interesting
            </Text>
            <Text
              style={{
                textAlign: "justify",
              }}
            >
              {`\t\t\t${blog?.interesting}`}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginBottom: 10,
              fontSize: 20,
              fontStyle: "italic",
              fontWeight: 500,
              color: MAIN_COLOR,
            }}
          >
            Rating blog
          </Text>
          <RatingStar
            initialRating={5}
            maxRating={5}
            onRatingChange={() => {}}
            size={30}
            showRatingText={false}
          ></RatingStar>
        </View>

        <View
          style={{
            paddingHorizontal: 50,
            marginTop: 20,
            marginBottom: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
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
              {"C H E C K   M A P   NOW"}
            </Text>
            <MaterialCommunityIcons
              name="google-maps"
              color={"#fff"}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailPlaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
