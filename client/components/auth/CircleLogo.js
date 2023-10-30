import React from "react";
import { View, Image } from "react-native";

const CircleLogo = () => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Image
      source={require("../../assets/logo1.png")}
      style={{ width: 150, height: 150, marginVertical: 20 }}
    />
  </View>
);

export default CircleLogo;