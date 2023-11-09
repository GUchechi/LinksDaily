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
import { Divider } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

dayjs.extend(relativeTime);

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

  // Get User Profile
  useEffect(() => {
    // console.log(route.params);
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(`/user-profile/${route.params._id}`);
        // console.log("user profile data => ", data);
        setUserProfile(data.profile);
        setUserLinks(data.links);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/blur.jpeg")}
      style={{ flex: 1, height: "100%" }}
      resizeMode="cover"
      blurRadius={5}
    >
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 25,
            color: "#ccc",
            fontWeight: "bold",
            paddingTop: 80,
          }}
        >
          Profile
        </Text>

        <SafeAreaView>
          <View
            style={{
              alignItems: "center",
              paddingBottom: 20,
              paddingTop: 20,
            }}
          >
            <Image
            source={{
              uri: userProfile?.image?.url
                ? userProfile.image.url
                : `https://via.placeholder.com/500x500.png?text=${userProfile?.name?.charAt(
                    0
                  )}`,
            }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
            }}
          />
            <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                color: "#ccc",
                fontWeight: "bold",
                paddingTop: 10,
              }}
            >
              {userProfile.name}
            </Text>

            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                color: "#ccc",
                fontWeight: "bold",
                paddingTop: 5,
              }}
            >
              {userProfile.role}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 13,
                color: "#ccc",
                fontWeight: "bold",
                paddingTop: 5,
              }}
            >
              Joined {dayjs(userProfile.createdAt).fromNow()}
            </Text>
          </View>

          <Divider />

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text>{JSON.stringify(userProfile, null, 4)}</Text>
            <Text>{JSON.stringify(userLinks, null, 4)}</Text>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
