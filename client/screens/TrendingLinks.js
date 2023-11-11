import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FooterTabs from "../components/nav/FooterTabs";
import { LinkContext } from "../context/link";
import axios from "axios";
import PreviewCard from "../components/links/PreviewCard";
import RenderLinks from "../components/links/RenderLinks";

export default function TrendingLinks({ navigation }) {
  const [state, setState] = useContext(AuthContext);
  const [links, setLinks] = useContext(LinkContext);


  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    const { data } = await axios.get("/links");
    setLinks(data);
  };

  const handlePress = async (link) => {
    await axios.put(`/view-count/${link._id}`);
    navigation.navigate("LinkView", { link });
    // update link in the context
    setLinks(() => {
      const index = links.findIndex((l) => l._id === link._id);
      links[index] = { ...link, views: link.views + 1 };
      return [...links];
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text
        style={{
          textAlign: "center",
          fontSize: 25,
          color: "grey",
          fontWeight: "bold",
          paddingVertical: 10,
        }}
      >
        Trending Links
      </Text>

      <RenderLinks
        links={
          links &&
          links.sort((a, b) => (a.views < b.views ? 1 : -1)).slice(0, 3)
        }
        handlePress={handlePress}
      /> */}

      {/* Latest Links */}

      <Text
        style={{
          textAlign: "center",
          fontSize: 25,
          color: "grey",
          fontWeight: "bold",
          paddingVertical: 10,
        }}
      >
        Latest Links
      </Text>

      <RenderLinks
        links={
          links &&
          links.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 3)
        }
        handlePress={handlePress}
      />

      <FooterTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
