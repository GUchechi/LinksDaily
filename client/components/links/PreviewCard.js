import React, { useContext } from "react";
import axios from "axios";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { LinkContext } from "../../context/link";
import { AuthContext } from "../../context/auth";
import IconSet from "./IconSet";

export default function PreviewCard({
  ogTitle = "Untitled",
  ogDescription = "No description found...",
  ogImage = { url: "https://via.placeholder.com/500x500.png?text=Image" },
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
      data.postedBy = auth.user;
      links[index] = data;
      return [...links];
    });
  };

  const handleUnLikePress = async (link) => {
    // console.log("link clicked", link._id);
    const { data } = await axios.put("/unlike", { linkId: link._id });
    setLinks((links) => {
      const index = links.findIndex((l) => l._id === link._id);
      data.postedBy = auth.user;
      links[index] = data;
      return [...links];
    });
  };

  const ogImageUrl = (ogImage) => {
    if (ogImage?.url) {
      return ogImage.url;
    } else if (ogImage?.length > 0) {
      return ogImage[0].url;
    } else {
      return "https://via.placeholder.com/500x500.png?text=Image";
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#303030",
        width: "92%",
        height: 450,
        borderRadius: 14,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 20,
        marginTop: 20,
      }}
    >
      <Image
        style={{
          height: "50%",
          width: "100%",
          borderTopRightRadius: 14,
          borderTopLeftRadius: 14,
        }}
        source={{ uri: ogImageUrl(ogImage) }}
      />

      <View style={{ marginBottom: -40 }}>
        <IconSet
          handleLikePress={handleLikePress}
          handleUnLikePress={handleUnLikePress}
          link={link}
          showIcons={showIcons}
          auth={auth}
        />
      </View>

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
    paddingTop: 20,
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#E8E8E8",
  },
  ogDescription: {
    fontSize: 15,
    color: "#E8E8E8",
  },
  shadow: {
    backgroundColor: "#303030",
    width: "92%",
    height: 450,
    borderRadius: 14,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 20,
    marginTop: 20,

    // Shadow
    shadowColor: "#333",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    // android
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
});
