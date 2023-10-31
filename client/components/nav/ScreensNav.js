import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signin from "../../screens/Signin";
import Signup from "../../screens/Signup";
import Home from "../../screens/Home";

const Stack = createNativeStackNavigator();

export default function ScreensNav() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignIn" component={Signin} />
      <Stack.Screen name="SignUp" component={Signup} />
    </Stack.Navigator>
  );
}
