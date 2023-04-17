import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { MAIN_COLOR } from "../utils/color";

const RatingStar = ({ initialRating, maxRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleRatingChange(i)}
          style={styles.starContainer}
        >
          <Icon
            name={i <= rating ? "star" : "star-outline"}
            size={16}
            color="#FFD700"
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return <View style={styles.container}>
    {renderStars()}

    <Text>
        <Text style={styles.ratingText}> 4 </Text>
        <Text style={styles.numberOfRating}>(180)</Text>
    </Text>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  starContainer: {
    paddingHorizontal: 2,
  },
  ratingText: {
    color: MAIN_COLOR,
    fontWeight: 600
  },
  numberOfRating: {
    color: MAIN_COLOR,
    fontStyle: "italic",
  }

});

export default RatingStar;
