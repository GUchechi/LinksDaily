import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function Search({ value, setValue }) {
  return (
    <View>
      <TextInput
        style={{
          height: 50,
          borderRadius: 50,
          borderWidth: 5,
          borderColor: "#d9d9d9",
          marginTop: 20,
          backgroundColor: "#e6e6e6",
          paddingHorizontal: 20,
          marginHorizontal: 15,
        }}
        placeholder="Search"
        value={value}
        onChangeText={(text) => setValue(text)}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
