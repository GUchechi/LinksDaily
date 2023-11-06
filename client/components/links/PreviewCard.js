import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function PreviewCard({
  ogTitle = "Untitled",
  ogDescription = "No description found...",
  ogImage = "https://via.placeholder.com/500x500.png?text=Image",
}) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: "92%",
        height: 280,
        borderRadius: 14,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 20,
      }}
    >
      <Image
        style={{
          height: "70%",
          width: "100%",
          borderTopRightRadius: 14,
          borderTopLeftRadius: 14,
        }}
        source={{ uri: ogImage.url }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
