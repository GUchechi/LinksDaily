import React, { useState } from "react";
import { View } from "react-native";
import { Tab } from "./Tab";

export default function FooterTabs() {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
      }}
    >
      <Tab text="Home" name="home" />
      <Tab text="Post" name="plus-square" />
      <Tab text="Links" name="list-ol" />
      <Tab text="Account" name="user" />
    </View>
  );
}
