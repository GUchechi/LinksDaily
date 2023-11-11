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
import SubmitButton from "../components/auth/SubmitButton";

export default function Home({ navigation }) {
  const [state, setState] = useContext(AuthContext);
  const [links, setLinks] = useContext(LinkContext);
  const [page, setPage] = useState(1);
  const [linksCount, setLinksCount] = useState(0);

  useEffect(() => {
    fetchLinks();
  }, [page]);

  const fetchLinks = async () => {
    const { data } = await axios.get(`/links/${page}`);
    setLinks([...links, ...data]);
  };

  useEffect(() => {
    const linksCount = async () => {
      const { data } = await axios.get(`/links-count`);
      setLinksCount(data);
    };
    linksCount();
  }, []);

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
          fontSize: 25,
          color: "grey",
          fontWeight: "bold",
          paddingVertical: 10,
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

        {linksCount > links?.length && (
          <SubmitButton
            title="Load More"
            handleSubmit={() => setPage(page + 1)}
          />
        )}
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
