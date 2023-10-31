import React, { useContext } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { AuthContext } from "../context/auth";
import FooterTabs from "../components/nav/FooterTabs";


export default function Home() {
  const [state, setState] = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text>{JSON.stringify(state, null, 4)}</Text>
      <FooterTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
