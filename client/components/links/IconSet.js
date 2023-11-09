import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function IconSet({
  handleLikePress,
  handleUnLikePress,
  link,
  showIcons,
  auth,
}) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        // position: "absolute",
        alignItems: "center",
        justifyContent: "space-between",
        // bottom: 0,
        marginBottom: 40,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
      }}
    >
      {showIcons && (
        <>
          {link?.likes?.includes(auth?.user?._id) ? (
            <TouchableOpacity
              style={{ alignItems: "center" }}
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
              style={{ alignItems: "center" }}
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
          <View style={{ alignItems: "center" }}>
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

          <View style={{ alignItems: "center" }}>
            <FontAwesome5 name="clock" size={15} color="#ff9900" />
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                color: "#E8E8E8",
              }}
            >
              {dayjs(link.createdAt).format("DD/MM/YY")}
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <FontAwesome5
              onPress={() =>
                navigation.navigate("Profile", {
                  name: link.postedBy?.name,
                  _id: link.postedBy?._id,
                })
              }
              name="user"
              size={15}
              color="#ff9900"
            />
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                color: "#E8E8E8",
              }}
            >
              {link.postedBy?.name}
            </Text>
          </View>
        </>
      )}
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#E8E8E8",
  },
  ogDescription: {
    fontSize: 15,
    color: "#E8E8E8",
  },
});
