import React, { useContext, useEffect } from "react";
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

export default function Home({ navigation }) {
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
      <Text
        style={{
          textAlign: "center",
          fontSize: 30,
          color: "grey",
          fontWeight: "bold",
          paddingVertical: 20,
        }}
      >
        Recent Links
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {links &&
          links.map((link) => (
            <View
              key={link._id}
              style={{
                alignItems: "center",
              }}
            >
              <PreviewCard
                {...link.urlPreview}
                handlePress={handlePress}
                link={link}
                showIcons="true"
              />
            </View>
          ))}
      </ScrollView>

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
