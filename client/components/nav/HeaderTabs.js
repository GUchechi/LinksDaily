import React, { useContext } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { AuthContext } from "../../context/auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const HeaderTabs = () => {
  const [state, setState] = useContext(AuthContext);

  // Navigation
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate("Trending Links")}>
        <FontAwesome5 name="bell" size={25} color="#ff9900" solid />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HeaderTabs;
