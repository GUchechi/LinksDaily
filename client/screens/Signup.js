import React, { useContext, useState } from "react";
import { Alert, StyleSheet, Text, ScrollView, View, Image } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/auth";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../config";

export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password) {
      Alert.alert("Warning", "Please fill all fields");
      setLoading(false);
      return;
    }
    try {
      setTimeout(async () => {
        const { data } = await axios.post(`${API}/signup`, {
          name,
          email,
          password,
        });

        if (data.error) {
          alert(data.error);
          setLoading(false);
        } else {
          // Save to context
          setState(data);

          // save response in async storage
          await AsyncStorage.setItem("@auth", JSON.stringify(data));
          setLoading(false);
          Alert.alert("Success!", "Sign up successful");
          navigation.navigate("Home");
        }
      }, 2000);
    } catch (error) {
      Alert.alert("Failed", "Sign up failed. Try again");
      console.log(error);
      setLoading(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <View style={styles.loading}>
        {/* <ActivityIndicator
          size="large"
          color="#00ff00"
          style={{
            paddingTop: 100,
          }}
        /> */}

        <Image
          source={require("../assets/load.gif")}
          style={{ height: 150, width: 150 }}
        />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={{ marginVertical: 100 }}>
        <CircleLogo />

        <Text style={styles.text}>Sign Up</Text>

        <UserInput
          name="NAME"
          value={name}
          setValue={setName}
          autoCapitalize="words"
          autoCorrect={false}
        />
        <UserInput
          name="EMAIL"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <UserInput
          name="PASSWORD"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
        />

        <SubmitButton
          title="Sign Up"
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <Text style={styles.alreadyJoined}>
          Already Joined?
          <Text
            onPress={() => navigation.navigate("SignIn")}
            style={{ color: "#ff2222" }}
          >
            Sign In
          </Text>
        </Text>
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
  },
  alreadyJoined: { textAlign: "center", fontSize: 20 },
  loading: {
    alignItems: "center",
    backgroundColor: "#fff",
    height: "100%",
    justifyContent: "center",
  },
});
