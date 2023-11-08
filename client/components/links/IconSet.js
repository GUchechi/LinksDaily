import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function IconSet({
  handleLikePress,
  handleUnLikePress,
  link,
  showIcons,
  auth,
}) {
  return (
    <>
      {showIcons && (
        <>
          <View
            style={{
              position: "absolute",
              right: 20,
              bottom: 0,
              marginBottom: 10,
            }}
          >
            <FontAwesome5 name="eye" size={15} color="#ff9900" />
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                color: "#E8E8E8",
              }}
            >
              {link.views}
            </Text>
          </View>

          {link?.likes?.includes(auth?.user?._id) ? (
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 60,
                bottom: 0,
                marginBottom: 10,
              }}
              onPress={() => handleUnLikePress(link)}
            >
              <FontAwesome5 name="heartbeat" size={15} color="#ff9900" />
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  color: "#E8E8E8",
                }}
              >
                {link.likes.length}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 60,
                bottom: 0,
                marginBottom: 10,
              }}
              onPress={() => handleLikePress(link)}
            >
              <FontAwesome5 name="heart" size={15} color="#ff9900" />
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  color: "#E8E8E8",
                }}
                color="#ff9900"
              >
                {link.likes.length}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  ogHeading: {
    padding: 5,
  },
  ogTitle: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#E8E8E8",
  },
  ogDescription: {
    fontSize: 15,
    color: "#E8E8E8",
  },
});
