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
  const routeParamsId = route?.params?._id;

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
    const fetchUserProfile = async (userId) => {
      try {
        const { data } = await axios.get(`/user-profile/${userId}`);
        // console.log("user profile data => ", data);
        setUserProfile(data.profile);
        setUserLinks(data.links);
      } catch (err) {
        console.log(err);
      }
    };
    routeParamsId
      ? fetchUserProfile(routeParamsId)
      : fetchUserProfile(auth.user._id);
  }, []);

  // Delete
  const handleDelete = async (linkId) => {
    console.log("delete", linkId);
  };

  return (
    <ImageBackground
      source={require("../assets/blur.jpeg")}
      style={{ flex: 1, height: "100%" }}
      resizeMode="cover"
      blurRadius={5}
    >
      <View>
        {/* <Text
          style={{
            textAlign: "center",
            fontSize: 25,
            color: "#ccc",
            fontWeight: "bold",
            paddingTop: 80,
          }}
        >
          Profile
        </Text> */}

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

          <View style={{ paddingBottom: 20 }}></View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                color: "#b3b3b3",
                fontWeight: "bold",
              }}
            >
              {userLinks.length} Links
            </Text>

            {userLinks.map((link) => (
              <View
                key={link._id}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{ color: "#ccc", fontSize: 15 }}>
                  {link?.urlPreview?.ogTitle}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ color: "#ccc", fontSize: 20, fontWeight: "bold" }}
                  >
                    {link?.views} Views
                  </Text>
                  {auth?.user?._id === link?.postedBy._id && (
                    <TouchableOpacity onPress={() => handleDelete(link._id)}>
                      <FontAwesome5 name="trash" color="#ff9900" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
