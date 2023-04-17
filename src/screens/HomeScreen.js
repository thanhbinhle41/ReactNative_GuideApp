import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
// import { ListItem } from 'react-native-elements'

import Ionicons from "react-native-vector-icons/Ionicons";
import { MAIN_COLOR } from "../utils/color";

const HomeScreen = ({ navigation }) => {

  const listTabFilter = [
    { name: "All", value: "all" },
    { name: "Hà Nội", value: "ha_noi" },
    { name: "HCM", value: "hcm" },
    { name: "Đà Nẵng", value: "da_nang" },
    { name: "Thanh Hóa", value: "thanh_hoa" },
  ]

  // STATE
  const [selectedTab, setSelectedTab] = useState(0);


  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER TEXT */}
      <View style={styles.header}>
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
          >
          </TextInput>
          <TouchableOpacity>
            <Ionicons
              name="search"
              size={25}
              color={"#C6C6C6"}
            ></Ionicons>
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
                style={[styles.itemTabFilter, index === selectedTab ? styles.selectedTab : ""]}
              >
                <Text style={[index === selectedTab ? styles.colorSelectedText : ""]}>{item.name}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>



      {/* <Text>Alo</Text> */}
    </SafeAreaView >
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20
  },

  header: {
    flex: 1,
  },

  // textHeader
  textHeader: {
    fontSize: 28
  },

  // SEARCH BAR
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15

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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderColor: "#C6C6C6",
    borderWidth: 1,
    borderRadius: 16,
    color: "#000"
  },

  selectedTab: {
    backgroundColor: MAIN_COLOR
  },

  colorSelectedText: {
    color: "#fff"
  },


  // MAIN CONTENT
  main: {
    flex: 5
  }

});
