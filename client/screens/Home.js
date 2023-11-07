import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import FooterTabs from "../components/nav/FooterTabs";
import { LinkContext } from "../context/link";

export default function Home() {
  const [state, setState] = useContext(AuthContext);
  const [links, setLinks] = useContext(LinkContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "light" }}>
        Home
      </Text>
      <Text>{JSON.stringify(links, null, 4)}</Text>
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
});
