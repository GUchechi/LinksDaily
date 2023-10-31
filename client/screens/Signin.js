import React, { useContext, useState } from "react";
import { Alert, StyleSheet, Text, ScrollView, View } from "react-native";
import axios from "axios";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../config";
import { AuthContext } from "../context/auth";

export default function Signin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      Alert.alert("Warning", "Please fill all fields");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(`${API}/signin`, {
        email,
        password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        // save in context
        setState(data);
        
        // save response in async storage
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        setLoading(false);
        Alert.alert("Success", "Sign in successful");

        // redirect
        navigation.navigate("Home");
      }
    } catch (error) {
      Alert.alert("Failed", "Sign in failed. Try again");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={{ marginVertical: 100 }}>
        <CircleLogo />

        <Text style={styles.text}>Sign In</Text>

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
          title="Sign In"
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <Text style={{ textAlign: "center", marginVertical: 20, fontSize: 20 }}>
          Not yet registered?{" "}
          <Text
            style={{ color: "#ff2222" }}
            onPress={() => navigation.navigate("SignUp")}
          >
            {" "}
            Sign Up
          </Text>
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontSize: 15,
            color: "#ff2222",
          }}
        >
          Forgot Password?
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
    marginBottom: 20,
  },
});
