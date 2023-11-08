import React, { useContext } from "react";
import axios from "axios";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { LinkContext } from "../../context/link";
import { AuthContext } from "../../context/auth";

export default function PreviewCard({
  ogTitle = "Untitled",
  ogDescription = "No description found...",
  ogImage = "https://via.placeholder.com/500x500.png?text=Image",
  handlePress = (f) => f,
  link = {},
  showIcons = false,
}) {
  // context
  const [links, setLinks] = useContext(LinkContext);
  const [auth, setAuth] = useContext(AuthContext);

  const handleLikePress = async (link) => {
    // console.log("link clicked", link._id);
    const { data } = await axios.put("/like", { linkId: link._id });
    setLinks((links) => {
      const index = links.findIndex((l) => l._id === link._id);
      links[index] = data;
      return [...links];
    });
  };

  const handleUnLikePress = async (link) => {
    // console.log("link clicked", link._id);
    const { data } = await axios.put("/unlike", { linkId: link._id });
    setLinks((links) => {
      const index = links.findIndex((l) => l._id === link._id);
      links[index] = data;
      return [...links];
    });
  };

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

      {showIcons && (
        <>
          <View style={{ position: "absolute", right: 20, bottom: 0 }}>
            <FontAwesome5 name="eye" size={15} color="#ff9900" />
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
              }}
            >
              {link.views}
            </Text>
          </View>

          <TouchableOpacity
            style={{ position: "absolute", right: 60, bottom: 0 }}
            // onPress={() => handleLikePress(link)}
          >
            <FontAwesome5 name="heart" size={15} color="#ff9900" />
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
              }}
              color="#ff9900"
            >
              {link.likes.length}
            </Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity onPress={() => handlePress(link)}>
        <View style={styles.ogHeading}>
          <Text style={styles.ogTitle}>{ogTitle}</Text>
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
    color: "grey",
  },
  ogDescription: {
    fontSize: 15,
  },
});
