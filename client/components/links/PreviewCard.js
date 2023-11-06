import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

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
          height: "50%",
          width: "100%",
          borderTopRightRadius: 14,
          borderTopLeftRadius: 14,
        }}
        source={{ uri: ogImage.url }}
      />

      <TouchableOpacity>
        <View style={styles.ogHeading}>
          <Text  style={styles.ogTitle}>{ogTitle}</Text>
          <Text style={styles.ogDescription}>{ogDescription}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  ogHeading: {
    padding: 5,
  },
  ogTitle: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "grey"
  },
  ogDescription: {
    fontSize: 15,
  },
});
