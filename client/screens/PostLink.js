import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  SafeAreaView,
} from "react-native";
import FooterTabs from "../components/nav/FooterTabs";

export default function PostLink() {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = async (text) => {
    try {
      setLoading(true);
      setLink(text);

      ogs({ url: text }, (error, results, response) => {
        console.log(error);
        console.log(results);
        console.log(response);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text
          style={{
            paddingTop: 10,
            textAlign: "center",
            fontSize: 24,
            fontWeight: "light",
          }}
        >
          Paste Website URl
        </Text>

        <TextInput
          value={link}
          onChangeText={(text) => handleChange(text)}
          style={styles.textInput}
        />
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
    flex: 1,
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
