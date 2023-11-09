import React, { useState } from "react";
import { View } from "react-native";
import { Tab } from "./Tab";
import { Divider } from "@rneui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function FooterTabs({ handlePress }) {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <>
      <Divider width={1} />
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
          screenName="Home"
          routeName={route.name}
        />
        <Tab
          text="Post"
          name="plus-square"
          handlePress={() => navigation.navigate("PostLink")}
          screenName="PostLink"
          routeName={route.name}
        />
        <Tab
          text="Links"
          name="list-ol"
          handlePress={() => navigation.navigate("Profile")}
          screenName="Links"
          routeName={route.name}
        />
        <Tab
          text="Account"
          name="user"
          handlePress={() => navigation.navigate("Account")}
          screenName="Account"
          routeName={route.name}
        />
      </View>
    </>
  );
}
