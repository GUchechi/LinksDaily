import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../context/auth";
import FooterTabs from "../components/nav/FooterTabs";

export default function Home() {
  const [state, setState] = useContext(AuthContext);

  return (
    <View>
      <Text>{JSON.stringify(state, null, 4)}</Text>
      <FooterTabs />
    </View>
  );
}

const styles = StyleSheet.create({});
