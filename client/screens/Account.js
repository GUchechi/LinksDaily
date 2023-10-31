import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, 
} from "react-native";
import axios from "axios";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../config";
import { AuthContext } from "../context/auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";

export default function Account({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //
  const [uploadImage, setUploadImage] = useState("");
  const [image, setImage] = useState({
    url: "",
    public_id: "",
  });
  // context
  const [state, setState] = useContext(AuthContext);

  useEffect(() => {
    if (state) {
      const { name, email, role, image } = state.user;
      setName(name);
      setEmail(email);
      setRole(role);
    }
  }, [state]);

  // Handle Submit
  const handleSubmit = async () => {
    setLoading(true);
    // api request
    try {
      const { data } = await axios.post("/update-password", { password });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        alert("👍 Password updated");
        setPassword("");
        setLoading(false);
      }
    } catch (err) {
      alert("Password update failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  // Upload Image
  const handleUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Camera access is required");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (result.canceled === true) {
      return;
    }
    // save to state for preview
    let base64Image = `data:image/jpg;base64,${result.base64}`;
    setUploadImage(base64Image);
    // send to backend for uploading to cloudinary

    const { data } = await axios.post("/upload-image", {
      image: base64Image,
    });
    console.log("UPLOADED RESPONSE => ", data);
    // update async storage
    const as = JSON.parse(await AsyncStorage.getItem("@auth")); // {user: {}, token: ''}
    as.user = data;
    await AsyncStorage.setItem("@auth", JSON.stringify(as));
    // update context
    setState({ ...state, user: data });
    setImage(data.image);
    alert("👍 Profile image saved");
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={{ marginVertical: 100 }}>
        <CircleLogo>
          {image && image.url ? (
            <Image
              source={{ uri: image.url }}
              style={{
                height: 190,
                width: 190,
                borderRadius: 100,
                marginVertical: 20,
              }}
            />
          ) : uploadImage ? (
            <Image
              source={{ uri: uploadImage }}
              style={{
                height: 190,
                width: 190,
                borderRadius: 100,
                marginVertical: 20,
              }}
            />
          ) : (
            <TouchableOpacity onPress={() => handleUpload()}>
              <FontAwesome5 name="camera" size={25} color="orange" />
            </TouchableOpacity>
          )}
        </CircleLogo>

        {image && image.url ? (
          <TouchableOpacity onPress={() => handleUpload()}>
            <FontAwesome5
              name="camera"
              size={25}
              color="orange"
              style={{ marginTop: -5, marginBottom: 10, alignSelf: "center" }}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}

        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 34,
              color: "#333",
              fontWeight: "bold",
              paddingBottom: 10,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "#333",
              fontWeight: "200",
              paddingBottom: 10,
            }}
          >
            {email}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "#333",
              fontWeight: "100",
              paddingBottom: 50,
            }}
          >
            {role}
          </Text>
        </View>

        <UserInput
          name="PASSWORD"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
        />

        <SubmitButton
          title="Update Password"
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
});
