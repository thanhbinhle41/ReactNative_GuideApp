import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView from "react-native-maps";
import { Marker, Callout, Circle } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { MAIN_COLOR } from "../utils/color";

const MapScreen = ({ navigation, route }) => {
  const ref = useRef();

  const [pin, setPin] = useState({
    latitude: 21.028511, // HN
    longitude: 105.804817, // HN
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    ref.current?.setAddressText(`${route.params?.place ? route.params?.place : ""}`);
  }, [route]);
  return (
    <View
      style={{
        marginTop: 50,
        flex: 1,
      }}
    >
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          setPin({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }}
        query={{
          key: "AIzaSyCTOrd2BQylNZL-ApV3cFk-POhOLxpYFoo",
          language: "vi",
          types: "establishment",
          components: "country:vn",
          radius: 30000,
          location: `${pin.latitude}, ${pin.longitude}`,
        }}
        styles={{
          container: {
            flex: 0,
            position: "absolute",
            width: "100%",
            zIndex: 1,
          },
          listView: { backgroundColor: "white" },
          textInputContainer: {
            backgroundColor: MAIN_COLOR,
          },
          textInput: {
            height: 38,
            color: "#5d5d5d",
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
        }}
      />
      <MapView
        style={styles.map}
        region={pin}
        initialRegion={{
          latitude: pin.latitude,
          longitude: pin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={pin}
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        >
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker>
        <Circle center={pin} radius={1000}></Circle>
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
