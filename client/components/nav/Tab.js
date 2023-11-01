import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export const Tab = ({ name, text, handlePress }) => (
  <TouchableOpacity>
    <>
      <FontAwesome5
        name={name}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
        onPress={handlePress}
      />
      <Text>{text}</Text>
    </>
  </TouchableOpacity>
);
