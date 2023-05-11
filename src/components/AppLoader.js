import { StyleSheet, View } from "react-native";
import React from "react";

import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import { loadingSelector } from "../store/loadingSlice";

const AppLoader = () => {
  const isLoading = useSelector(loadingSelector);

  return (
    <>
      {isLoading ? (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
          <LottieView
            source={require("../../assets/images/loader2.json")}
            autoPlay
            loop
            style={{ width: 150, height: 150 }}
          />
        </View>
      ) : null}
    </>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1,
  },
});
