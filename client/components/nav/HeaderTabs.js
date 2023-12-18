import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, SafeAreaView } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../../context/auth";

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
