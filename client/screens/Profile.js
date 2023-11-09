import React, { useState, useEffect, useContext } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../context/auth";
import { LinkContext } from "../context/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// import { Divider } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function Profile({ navigation }) {
  const route = useRoute();

  useEffect(() => {
    console.log(route.params);
  }, []);

  // context
  const [auth, setAuth] = useContext(AuthContext);
  const [links, setLinks] = useContext(LinkContext);
  // state
  const [userProfile, setUserProfile] = useState({});
  const [userLinks, setUserLinks] = useState([]);

  useEffect(() =>{
    
  },[])

  return (
    <ImageBackground
      source={require("../assets/blur.jpeg")}
      style={{ flex: 1, height: "100%" }}
      resizeMode="cover"
      blurRadius={1}
    >
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 25,
            color: "#fff",
            fontWeight: "bold",
            paddingVertical: 20,
          }}
        >
          Profile
        </Text>

        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
