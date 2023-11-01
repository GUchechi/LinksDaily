import React, { useContext } from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import FooterTabs from "../components/nav/FooterTabs";

export default function Home() {


  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "light" }}>
        Home
      </Text>
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
