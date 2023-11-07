import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import SubmitButton from "../components/auth/SubmitButton";
import FooterTabs from "../components/nav/FooterTabs";
import urlRegex from "url-regex";
import ogs from "@uehreka/open-graph-scraper-react-native";
import PreviewCard from "../components/links/PreviewCard";
import { LinkContext } from "../context/link";

export default function PostLink({navigation}) {
  const [ links, setLinks ] = useContext(LinkContext);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [urlPreview, setUrlPreview] = useState({});

  const handleChange = async (text) => {
    try {
      setLoading(true);
      setLink(text);

      if (urlRegex({ strict: false }).test(text)) {
        ogs({ url: text }, (error, results, response) => {
          console.log(results);
          if (results.success) {
            setUrlPreview(results);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("/post-link", {
        link,
        title,
        urlPreview,
      });
      console.log("data=>", data);
      // update link context
      setLinks([data, ...links]);
      setTimeout(() => {
        alert("🎊 Link posted");
        navigation.navigate("Home");
      }, 500);
    } catch (error) {
      console.log(error);
      console.log("Response data:", error.response.data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text
          style={{
            paddingTop: 30,
            textAlign: "center",
            fontSize: 24,
            fontWeight: "light",
          }}
        >
          Paste Website URl
        </Text>

        <TextInput
          value={link}
          placeholder="Paste the url"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => handleChange(text)}
          style={styles.textInput}
        />

        <TextInput
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder="Give it a title"
          autoCapitalize="sentences"
          style={{
            borderWidth: 1,
            borderColor: "grey",
            height: 50,
            marginVertical: 10,
            marginHorizontal: 15,
            borderRadius: 30,
            padding: 15,
          }}
        />

        {urlPreview.success && (
          <View
            style={{
              marginTop: 30,
              alignItems: "center",
            }}
          >
            <PreviewCard {...urlPreview} />
          </View>
        )}

        <View style={{ paddingTop: 25 }}>
          <SubmitButton
            title="Submit"
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </View>

        {/* <Text>{JSON.stringify(urlPreview, null, 4)}</Text> */}
      </ScrollView>

      <View style={styles.view}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    // flex: 1,
    justifyContent: "flex-end",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "grey",
    height: 50,
    marginVertical: 30,
    marginHorizontal: 15,
    borderRadius: 30,
    padding: 15,
  },
});
