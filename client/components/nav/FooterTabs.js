import React, { useState } from "react";
import { View } from "react-native";
import { Tab } from "./Tab";
import { useNavigation } from "@react-navigation/native";

export default function FooterTabs({ handlePress }) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
      }}
    >
      <Tab
        text="Home"
        name="home"
        handlePress={() => navigation.navigate("Home")}
      />
      <Tab
        text="Post"
        name="plus-square"
        handlePress={() => navigation.navigate("Post")}
      />
      <Tab
        text="Links"
        name="list-ol"
        handlePress={() => navigation.navigate("Links")}
      />
      <Tab
        text="Account"
        name="user"
        handlePress={() => navigation.navigate("Account")}
      />
    </View>
  );
}
